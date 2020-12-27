export interface ChatMessage {
    sender: string;
    text: string;
    grouped?: boolean;
    direction?: 'in' | 'out';
    timestamp?: number;
    // options?: ChatOption[];
}
