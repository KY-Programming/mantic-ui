import { Component, effect, input, model, output } from '@angular/core';
import { ButtonBaseComponent } from '../../base/button-base.component';
import { toBoolean } from '../../helpers/to-boolean';
import { BooleanLike } from '../../models/boolean-like';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'm-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    providers: [...ButtonBaseComponent.providers]
})
export class ImageUploadComponent extends ButtonBaseComponent {
    public readonly previewImage = model<string>();
    public readonly radius = input<number>();
    public readonly previewWidth = input<number>();
    public readonly previewHeight = input<number>();
    public readonly width = input<number>();
    public readonly height = input<number>();
    public readonly hidePreview = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly forcePreviewImageChange = input<boolean, BooleanLike>(false, { transform: toBoolean });
    public readonly upload = output<FileList>();

    public constructor() {
        super();
        effect(() => this.refreshInverted(ButtonComponent.defaults.inverted()));
    }

    protected onUpload(fileList: FileList | null): void {
        if (!fileList?.length) {
            return;
        }
        this.upload.emit(fileList);
        const files = [...fileList];
        if (!this.hidePreview() || this.forcePreviewImageChange()) {
            this.showPreview(files[0]);
        }
    }

    private showPreview(file: File): void {
        const reader = new FileReader();
        const image = new Image();
        reader.onload = () => {
            image.src = reader.result?.toString() ?? '';
        };
        image.onload = () => {
            let width = this.width() || image.width;
            let height = this.height() || image.height;
            const widthRatio = image.width / width;
            const heightRatio = image.height / height;
            const ratio = Math.max(widthRatio, heightRatio);
            if (!this.width()) {
                width = image.width / ratio;
            }
            if (!this.height()) {
                height = image.height / ratio;
            }
            const imageWidth = image.width / ratio;
            const imageHeight = image.height / ratio;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const left = (width - imageWidth) / 2;
            const top = (height - imageHeight) / 2;
            const context = canvas.getContext('2d');
            context?.drawImage(image, left, top, imageWidth, imageHeight);
            const dataUrl = canvas.toDataURL('image/png', 1);
            this.previewImage.set(dataUrl);
        };
        reader.readAsDataURL(file);
    }
}
