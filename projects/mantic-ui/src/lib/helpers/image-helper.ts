export const defaultImageMaxSize = 1920;
export const defaultImageQuality = 0.85;
/** Screenshots are mostly flat colors and text: lossless WebP (quality 1 in Chromium) is sharper and smaller than lossy there */
export const defaultScreenshotQuality = 1;
const extensions: Partial<Record<string, string>> = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };

export interface ScaledImage {
    file: File;
    width: number;
    height: number;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
    return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Encoding the image failed')), type, quality));
}

/** Whether the browser can capture the screen; desktop browsers only, not Android or iOS */
export function canCaptureScreenshot(): boolean {
    return typeof navigator !== 'undefined' && 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices;
}

/**
 * Captures one frame of the screen as PNG. The browser asks the user which screen, window or tab to share;
 * `shouldPreferCurrentTab` offers the current tab first (Chromium). Resolves `undefined` if the user cancels.
 */
export async function captureScreenshot(shouldPreferCurrentTab = true): Promise<File | undefined> {
    let stream: MediaStream;
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: shouldPreferCurrentTab } as MediaStreamConstraints);
    }
    catch (error) {
        if (error instanceof Error && error.name === 'NotAllowedError') {
            return undefined;
        }
        throw error;
    }
    try {
        const video = document.createElement('video');
        video.srcObject = stream;
        await new Promise<void>(resolve => video.addEventListener('loadedmetadata', () => resolve(), { once: true }));
        await video.play();
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const blob = await canvasToBlob(canvas, 'image/png');
        return new File([blob], `screenshot-${Date.now().toString()}.png`, { type: blob.type });
    }
    finally {
        for (const track of stream.getTracks()) {
            track.stop();
        }
    }
}

/**
 * Shrinks an image so its longest side is at most `maxSize` pixels (keeping its aspect ratio, never enlarging) and re-encodes it as WebP with `quality` (0-1).
 * Browsers that can't encode WebP (Safari, so every browser on iOS) hand back a PNG instead; then PNGs stay PNG (lossless, `quality` unused)
 * and everything else becomes JPEG with `quality`, its transparent areas white, since JPEG has no alpha channel.
 * Resolves the new file together with its size in pixels.
 */
export async function scaleImage(file: Blob, maxSize = defaultImageMaxSize, quality = defaultImageQuality, name?: string): Promise<ScaledImage> {
    const bitmap = await createImageBitmap(file);
    try {
        const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(bitmap.width * scale);
        canvas.height = Math.round(bitmap.height * scale);
        const context = canvas.getContext('2d');
        context?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        let blob = await canvasToBlob(canvas, 'image/webp', quality);
        // toBlob silently falls back to PNG for a type it can't encode
        if (blob.type !== 'image/webp' && file.type !== 'image/png') {
            if (context) {
                context.globalCompositeOperation = 'destination-over';
                context.fillStyle = 'white';
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            blob = await canvasToBlob(canvas, 'image/jpeg', quality);
        }
        const baseName = (name ?? (file instanceof File ? file.name : 'image')).replace(/\.[^.]*$/, '');
        return {
            file: new File([blob], `${baseName}.${extensions[blob.type] ?? 'png'}`, { type: blob.type }),
            width: canvas.width,
            height: canvas.height
        };
    }
    finally {
        bitmap.close();
    }
}

export function imageToDataUrl(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result as string));
        reader.addEventListener('error', () => reject(reader.error ?? new Error('Reading the image failed')));
        reader.readAsDataURL(file);
    });
}
