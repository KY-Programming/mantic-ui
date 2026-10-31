import { ChatImage } from './chat-image';
import { ChatOption } from './chat-option';

export interface ChatMessage {
    sender: string;
    text: string;
    grouped?: boolean;
    direction?: 'in' | 'out';
    timestamp?: number;
    options?: ChatOption[];
    /** The sender's picture (URL), shown round next to the message; a grouped message keeps its space free */
    image?: string;
    /** Images sent with the message, shown below its text */
    images?: ChatImage[];
}
