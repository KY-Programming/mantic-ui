export interface Notification {
  type: 'positive' | 'success' | 'warning' | 'error';
  text: string;
  timeout?: number;
}
