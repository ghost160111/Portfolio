import { ReactiveElement } from "../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../plugins/ReactiveElement/Decorators/DefineComponent";

@DefineComponent({
  tag: "app-header",
  template: /*html*/`
    <nav class="nav">
      <div class="nav__left">
        <img src="" alt="">
      </div>
      <div class="nav__right"></div>
    </nav>
  `
})
export default class AppHeader extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: {
      }
    });
  }

  public data: {} = {
  }
}
