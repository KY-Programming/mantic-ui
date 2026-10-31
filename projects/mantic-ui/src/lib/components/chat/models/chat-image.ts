export interface ChatImage {
    /** Where the image is shown from; a `data:` URL for images attached in the chat */
    url: string;
    name?: string;
    /** The original file of an image attached in the chat, e.g. to upload it */
    file?: File;
    /** Size in pixels; set for images attached in the chat. Store it with the message: the bubble then keeps the image's space free before it has loaded */
    width?: number;
    height?: number;
}
