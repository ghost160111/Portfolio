import { ReactiveElement } from "../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!./styles/ToggleElement.scss";
import { Watcher } from "../../plugins/ReactiveElement/Classes/ReactiveElement";

@DefineComponent({
  tag: "toggle-element",
  template: /*html*/`
    <button class="toggle-btn" type="button" ref="toggle-btn">
      Toggle element
      <div class="toggle-btn__circle" ref="toggle-btn__circle"></div>
    </button>
  `
})
export default class ToggleElement extends ReactiveElement {
  constructor(callback: Function) {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: {
        sass
      }
    });

    this.callback = callback;
  }

  public callback: Function;

  public data: {} = {
    isActive: false
  }

  public watch: Watcher = {
    "isActive": (newValue: boolean) => {
      this.callback();
      return (newValue) ? this.setActive() : this.setInactive();
    }
  }

  public events(): void {
    this.eventHandler.subscribe("toggle-btn", "toggle-event", "click", this.toggleElement);
  }

  public toggleElement(): void {
    this.refProxy["isActive"] = !this.refProxy["isActive"];
  }

  public setActive(): void {
    this.refs["toggle-btn"].classList.add("active");
    this.setAttribute("is-active", "");
  }

  public setInactive(): void {
    this.refs["toggle-btn"].classList.remove("active");
    this.removeAttribute("is-active");
  }
}
