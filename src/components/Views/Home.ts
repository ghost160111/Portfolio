import { ReactiveElement } from "../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!./styles/Home.scss";

@DefineComponent({
  tag: "home-view",
  template: /*html*/`
  `
})
export default class HomeView extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: {
        sass
      }
    });
  }

  public footer: HTMLElement;

  public onConnected(): void {
    this.footer = document.querySelector(".footer");

    if (this.footer.style.visibility === "hidden") {
      this.footer.style.opacity = "1";
      this.footer.style.visibility = "visible";
    }
  }
}
