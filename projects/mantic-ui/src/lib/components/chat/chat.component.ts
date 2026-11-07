import { NgIfContext, NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, computed, contentChildren, DoCheck, effect, ElementRef, inject, Injector, input, IterableDiffer, IterableDiffers, output, signal, TemplateRef, viewChild } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { canCaptureScreenshot, captureScreenshot, defaultImageMaxSize, defaultImageQuality, defaultScreenshotQuality, imageToDataUrl, scaleImage } from '../../helpers/image-helper';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ButtonComponent } from '../button/button.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { ContextMenuGroupComponent } from '../context-menu/group/context-menu-group.component';
import { ContextMenuItemComponent } from '../context-menu/item/context-menu-item.component';
import { IconComponent } from '../icon/icon.component';
import { IconSize } from '../icon/models/icon-size';
import { IconType } from '../icon/models/icon-type';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { InputComponent } from '../input/text/input.component';
import { ChatImage } from './models/chat-image';
import { ChatMessage } from './models/chat-message';

@Component({
    selector: 'm-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [
        ChatMessageComponent,
        ContextMenuComponent,
        ContextMenuItemComponent,
        InputComponent,
        ButtonComponent,
        IconComponent,
        ImageViewerComponent,
        NgTemplateOutlet
    ],
    host: {
        '[class.drag-over]': 'isDragOver()',
        '(dragover)': 'onDragOver($event)',
        '(dragleave)': 'onDragLeave($event)',
        '(drop)': 'onDrop($event)'
    }
})
export class ChatComponent implements DoCheck {
    public static readonly defaults = {
        sendIcon: signal<IconType>('caret right'),
        sendIconSize: signal<IconSize>('big'),
        attachIcon: signal<IconType>('plus'),
        attachImageIcon: signal<IconType>('image'),
        screenshotIcon: signal<IconType>('desktop'),
        photoIcon: signal<IconType>('camera'),
        removeImageIcon: signal<IconType>('close')
    };
    // How far (px) the chat may be scrolled up and still count as at the bottom; absorbs rounding of fractional scroll positions
    private static readonly bottomTolerance = 16;
    // Taking a photo only makes sense where the file input's capture opens a camera, i.e. on phones and tablets
    private readonly isTouchDevice = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches;
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly injector = inject(Injector);
    private readonly sendSubject = new Subject<ChatMessage>();
    private readonly messagesDiffer: IterableDiffer<unknown>;
    private isAtBottom = true;
    private readonly menuItems = contentChildren(ContextMenuItemComponent);
    private readonly menuGroups = contentChildren(ContextMenuGroupComponent);
    protected readonly defaults = ChatComponent.defaults;
    protected readonly isDragOver = signal(false);
    /** The pending image shown large over the page, after a click on its preview */
    protected readonly openedImage = signal<ChatImage | undefined>(undefined);
    protected readonly showScreenshot = computed(() => this.canTakeScreenshots() && canCaptureScreenshot());
    protected readonly showPhoto = computed(() => this.canTakePhotos() && this.isTouchDevice);
    protected readonly showAttachButton = computed(() => this.canAttachImages() || this.showScreenshot() || this.showPhoto() || this.menuItems().length > 0 || this.menuGroups().length > 0);
    public readonly messages = input<ChatMessage[]>([]);
    public message: string | undefined;
    public readonly attachments = signal<ChatImage[]>([]);
    public readonly canSend = input<boolean, BooleanLike>(true, { transform: toBoolean });
    public readonly canAttachImages = input<boolean, BooleanLike>(false, { transform: toBoolean });
    /** Offers "Screenshot of this tab" and "Screenshot of a screen or window" in the + menu; shown only where the browser can capture the screen (desktop) */
    public readonly canTakeScreenshots = input<boolean, BooleanLike>(false, { transform: toBoolean });
    /** Offers "Take photo" in the + menu; shown only on touch devices, where it opens the camera */
    public readonly canTakePhotos = input<boolean, BooleanLike>(false, { transform: toBoolean });
    /** Every attached image is shrunk so its longest side is this size at most, and re-encoded (see `scaleImage`) */
    public readonly imageMaxSize = input(defaultImageMaxSize);
    /** Quality (0-1) of every attached image, for lossy formats */
    public readonly imageQuality = input(defaultImageQuality);
    public readonly screenshotMaxSize = input<number>();
    /** Not taken from `imageQuality`: screenshots default to lossless */
    public readonly screenshotQuality = input(defaultScreenshotQuality);
    public readonly photoMaxSize = input<number>();
    public readonly photoQuality = input<number>();
    public readonly sender = input<string>();
    // eslint-disable-next-line unicorn/no-null
    public readonly sendIconTemplate = input<TemplateRef<NgIfContext<boolean>> | null>(null);
    public readonly sendIcon = input<IconType>();
    public readonly sendIconSize = input<IconSize>();
    public readonly showSendIcon = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly attachIcon = input<IconType>();
    public readonly attachImageIcon = input<IconType>();
    public readonly screenshotIcon = input<IconType>();
    public readonly photoIcon = input<IconType>();
    public readonly removeImageIcon = input<IconType>();
    public readonly placeholder = input('Type a message and send with ENTER');
    public readonly attachText = input('Attach');
    public readonly attachImageText = input('Attach image');
    public readonly removeImageText = input('Remove image');
    public readonly takeTabScreenshotText = input('Screenshot of this tab');
    public readonly takeScreenScreenshotText = input('Screenshot of a screen or window');
    public readonly takePhotoText = input('Take photo');
    public readonly send = outputFromObservable(this.sendSubject);
    /** true while a screenshot is taken, false afterwards; hide the chat's panel meanwhile, so it is not on the picture */
    public readonly capturing = output<boolean>();
    protected readonly chat = viewChild<ElementRef<HTMLElement>>('chat');
    protected readonly input = viewChild(InputComponent);
    protected readonly attachMenu = viewChild(ContextMenuComponent);
    protected readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
    protected readonly photoInput = viewChild<ElementRef<HTMLInputElement>>('photoInput');

    public constructor() {
        this.messagesDiffer = inject(IterableDiffers).find([]).create(undefined);
        // An image without a stored size grows its message when it has loaded (lazily, so possibly long after the
        // scroll down); keep the chat at the bottom then, unless the user has scrolled up. load doesn't bubble, so it is captured.
        effect(onCleanup => {
            const element = this.chat()?.nativeElement;
            if (!element) {
                return;
            }
            const onLoad = (event: Event): void => {
                if (event.target instanceof HTMLImageElement && this.isAtBottom) {
                    element.scrollTo(0, element.scrollHeight);
                }
            };
            element.addEventListener('load', onLoad, { capture: true });
            onCleanup(() => element.removeEventListener('load', onLoad, { capture: true }));
        });
    }

    public ngDoCheck(): void {
        if (this.messagesDiffer.diff(this.messages())) {
            this.scrollDown();
        }
    }

    /**
     * Attaches the image files among `files` to the message being written; other files and images the browser can't decode are ignored.
     * Each image is shrunk to `maxSize` (longest side) and re-encoded with `quality` (default: `imageMaxSize`/`imageQuality`).
     */
    public async attach(files: Iterable<File>, maxSize = this.imageMaxSize(), quality = this.imageQuality()): Promise<void> {
        const images = [...files].filter(file => file.type.startsWith('image/'));
        if (images.length === 0) {
            return;
        }
        const attached = await Promise.all(images.map(file => this.toChatImage(file, maxSize, quality)));
        this.attachments.update(list => [...list, ...attached.filter(image => image !== undefined)]);
        this.input()?.setFocus();
    }

    /** Opens the browser's file picker for images */
    public openImagePicker(): void {
        this.fileInput()?.nativeElement.click();
    }

    /** Opens the camera (on touch devices; elsewhere the browser shows its file picker) */
    public openCamera(): void {
        this.photoInput()?.nativeElement.click();
    }

    /**
     * Attaches one frame of a screen, window or tab the user picks; `capturing` is raised around it.
     * `shouldPreferCurrentTab` offers only the current tab (Chromium), otherwise the browser lists screens and windows.
     */
    public async takeScreenshot(shouldPreferCurrentTab = true): Promise<void> {
        this.capturing.emit(true);
        try {
            const screenshot = await captureScreenshot(shouldPreferCurrentTab);
            if (screenshot) {
                await this.attach([screenshot], this.screenshotMaxSize() ?? this.imageMaxSize(), this.screenshotQuality());
            }
        }
        finally {
            this.capturing.emit(false);
        }
    }

    protected removeAttachment(image: ChatImage): void {
        this.attachments.update(list => list.filter(entry => entry !== image));
        this.input()?.setFocus();
    }

    protected sendMessage(): void {
        const images = this.attachments();
        if (this.message || images.length > 0) {
            this.sendSubject.next({
                direction: 'out',
                text: this.message ?? '',
                sender: this.sender() ?? 'Unknown',
                timestamp: Date.now(),
                images: images.length > 0 ? images : undefined
            });
        }
        this.message = undefined;
        this.attachments.set([]);
        this.input()?.setFocus();
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !event.isComposing) {
            this.sendMessage();
        }
    }

    protected openAttachMenu(event: MouseEvent): void {
        const menu = this.attachMenu();
        if (!menu) {
            return;
        }
        // A click from the keyboard has no pointer position, the menu opens at the button then
        if (event.detail > 0) {
            menu.open(event);
        }
        else {
            menu.open(event.currentTarget as HTMLElement);
        }
    }

    protected onFilesPicked(input: HTMLInputElement): void {
        if (input.files) {
            void this.attach(input.files);
        }
        // Reset, so picking the same file again still raises change
        input.value = '';
    }

    protected onPhotoTaken(input: HTMLInputElement): void {
        if (input.files) {
            void this.attach(input.files, this.photoMaxSize() ?? this.imageMaxSize(), this.photoQuality() ?? this.imageQuality());
        }
        input.value = '';
    }

    protected onPaste(event: ClipboardEvent): void {
        const files = event.clipboardData?.files;
        if (!this.canAttachImages() || !files || [...files].every(file => !file.type.startsWith('image/'))) {
            return;
        }
        // Keep the browser from pasting the image's name (or nothing) into the text field
        event.preventDefault();
        void this.attach(files);
    }

    protected onDragOver(event: DragEvent): void {
        if (!this.acceptsDrop(event) || !event.dataTransfer) {
            return;
        }
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.isDragOver.set(true);
    }

    protected onDragLeave(event: DragEvent): void {
        // dragleave also fires when the pointer moves onto a child element
        if (!this.elementRef.nativeElement.contains(event.relatedTarget as Node | null)) {
            this.isDragOver.set(false);
        }
    }

    protected onDrop(event: DragEvent): void {
        this.isDragOver.set(false);
        if (!this.acceptsDrop(event) || !event.dataTransfer) {
            return;
        }
        event.preventDefault();
        void this.attach(event.dataTransfer.files);
    }

    // The file types can't be read before the drop, so every file drag is accepted and filtered on drop
    private acceptsDrop(event: DragEvent): boolean {
        return this.canSend() && this.canAttachImages() && !!event.dataTransfer?.types.includes('Files');
    }

    private async toChatImage(file: File, maxSize: number, quality: number): Promise<ChatImage | undefined> {
        try {
            const scaled = await scaleImage(file, maxSize, quality);
            return { url: await imageToDataUrl(scaled.file), name: scaled.file.name, file: scaled.file, width: scaled.width, height: scaled.height };
        }
        catch (error) {
            // e.g. a HEIC photo in a browser that can't decode it
            console.warn(`${file.name} could not be read as an image.`, error);
            return undefined;
        }
    }

    protected onScroll(element: HTMLElement): void {
        this.isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= ChatComponent.bottomTolerance;
    }

    // Right after the new messages are rendered, before the browser paints: lazy images are only judged visible
    // after that, so images at the top of a long history are not loaded just because the chat started at the top
    private scrollDown(): void {
        afterNextRender(() => {
            const element = this.chat()?.nativeElement;
            element?.scrollTo(0, element.scrollHeight);
        }, { injector: this.injector });
    }
}
