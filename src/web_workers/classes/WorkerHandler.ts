export default class WorkerHandler {
  public workerModule: Worker;

  constructor(workerModule: any, callback: (event: MessageEvent) => void) {
    this.workerModule = new workerModule();
    this.workerModule.onmessage = callback;
  }

  public postMessage(message: any): void {
    this.workerModule.postMessage(message);
  }

  public terminate(): void {
    this.workerModule.terminate();
  }
}
