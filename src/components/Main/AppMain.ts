// @ts-ignore
import sass from "!!css-loader!sass-loader!./styles/AppMain.scss";
import { ReactiveElement } from "../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../plugins/ReactiveElement/Decorators/DefineComponent";

@DefineComponent({
  tag: "app-main",
  template: /*html*/`
    <div class="main-wrapper" ref="main-wrapper"></div>
  `
})
export default class AppMain extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      styles: {
        sass
      },
      animations: {
        setOpacityAnimation: true
      }
    });
  }

  public footer: HTMLElement;
  public main: HTMLElement;

  public onConnected(): void {
    this.footer = document.querySelector(".footer");
    this.main = document.querySelector(".main");
  }

  public events(): void {
    this.eventHandler.subscribe(this, "scroll-event", "scroll", this.onScrollChange);
  }

  onScrollChange(): void {
    if (window.location.origin !== "/") {
      if (this.scrollHeight - this.scrollTop >= this.clientHeight + 300) {
        this.footer.style.visibility = "hidden";
        this.footer.style.opacity = "0";
        this.main.style.paddingBottom = "0";
      } else {
        this.main.style.paddingBottom = "4.75rem";
        this.footer.style.visibility = "visible";
        this.footer.style.opacity = "1";
      }
    }
  }
}
