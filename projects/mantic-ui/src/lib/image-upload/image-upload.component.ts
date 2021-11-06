import { Component, ElementRef, Input, Output } from '@angular/core';
import { ButtonBaseComponent } from '../base/button-base.component';
import { Subject } from 'rxjs';

@Component({
    selector: 'm-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent extends ButtonBaseComponent {
    private readonly previewImageChangeSubject = new Subject<string>();
    private readonly uploadSubject = new Subject<FileList>();
    public isPreviewVisible = true;
    private isPreviewImageChangeForced: boolean;

    @Input()
    public previewImage: string;

    @Input()
    public radius: number;

    @Input()
    public previewWidth: number;

    @Input()
    public previewHeight: number;

    @Input()
    public width: number;

    @Input()
    public height: number;

    @Input()
    public set hidePreview(value: boolean | string) {
        this.isPreviewVisible = !this.toBoolean(value);
    }

    @Input()
    public set forcePreviewImageChange(value: boolean | string) {
        this.isPreviewImageChangeForced = this.toBoolean(value);
    }

    @Output()
    public readonly previewImageChange = this.previewImageChangeSubject.asObservable();

    @Output()
    public readonly upload = this.uploadSubject.asObservable();

    public constructor(
        elementRef: ElementRef<HTMLElement>
    ) {
        super(elementRef);
    }

    public onUpload(fileList: FileList): void {
        if (fileList.length === 0) {
            return;
        }
        this.uploadSubject.next(fileList);
        const files: File[] = Array.from(fileList);
        if (this.isPreviewVisible || this.isPreviewImageChangeForced) {
            this.showPreview(files[0]);
        }
    }

    private showPreview(file: File): void {
        const reader = new FileReader();
        const image = new Image();
        reader.onload = () => {
            image.src = reader.result.toString();
        };
        image.onload = () => {
            let width = this.width || image.width;
            let height = this.height || image.height;
            const widthRatio = image.width / width;
            const heightRatio = image.height / height;
            const ratio = Math.max(widthRatio, heightRatio);
            if (!this.width) {
                width = image.width / ratio;
            }
            if (!this.height) {
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
            context.drawImage(image, left, top, imageWidth, imageHeight);
            this.previewImage = canvas.toDataURL('image/png', 1);
            this.previewImageChangeSubject.next(this.previewImage);
        };
        reader.readAsDataURL(file);
    }
}
