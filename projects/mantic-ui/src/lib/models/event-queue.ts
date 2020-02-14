export class EventQueue {
    private readonly queue: { event: string, action: () => void, isAsync: boolean, isRunning: boolean }[] = [];

    public add(event: string, action: () => void, isAsync = false): EventQueue {
        this.queue.push({ event, action, isAsync, isRunning: false });
        this.start();
        return this;
    }

    public start(): void {
        if (this.queue.length === 0 || this.queue[0].isRunning) {
            return;
        }
        if (this.queue[0].isAsync) {
            this.queue[0].isRunning = true;
            this.queue[0].action();
        }
        else {
            this.queue[0].action();
            this.finish(this.queue[0].event);
        }
    }

    public finish(event: string): void {
        if (this.queue.length === 0) {
            return;
        }
        if (!this.queue[0].isRunning) {
            console.warn(`Someone tried to finish event '${event}', but this event is not running yet. Looks like there are some events out of order`);
        }
        if (this.queue[0].event !== event) {
            console.warn(`Someone tried to finish event '${event}', but this event is not at first position. Looks like there are some events out of order`);
        }
        this.queue.splice(0, 1);
        this.start();
    }
}
