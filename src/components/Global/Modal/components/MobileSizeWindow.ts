import ModalBase, { ModalBaseProps } from "./ModalBase";

export default class MobileSizeWindow extends ModalBase {
  constructor(props: ModalBaseProps) {
    super(props);
  }

  public override onConnected(): void {
    this.onConnectedSetSize(500, "98%");
    this.updateLanguage<MobileSizeWindow>(this);
  }

  public onDisconnected(): void {
    this.onDisconnectedSetSize();
  }

  public events(): void {
    this.eventHandler.subscribe(window, "window-size-change-event", "resize", this.onResizeHandler);
  }

  public onConnectedSetSize(desktopSize: string | number, mobileSize: string | number): void {
    this.getModalWindow(() => {
      if (window.innerWidth <= 639) {
        this.modalWindow.refProxy["width"] = mobileSize;
      } else {
        this.modalWindow.refProxy["width"] = desktopSize;
      }
    });
  }

  public onDisconnectedSetSize(): void {
    this.getModalWindow(() => {
      this.modalWindow.refProxy["width"] = "80%";
    });
  }

  public onResizeHandler(): void {
    this.getModalWindow(() => {
      this.onConnectedSetSize(500, "98%");
    });
  }
}
