import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
// @ts-ignore
import sass from "!css-loader!sass-loader!./Checkbox.scss";

export interface CheckboxProps {
  label?: string;
  callback?: Function;
  bgColor?: string;
  attributes?: Map<string, string>;
}

@DefineComponent({
  tag: "checkbox-element",
  template: /*html*/`
    <button class="checkbox-btn" type="button" ref="checkbox" ref-title="title"></button>
    <label class="checkbox-label" ref="label"></label>
  `
})
export default class Checkbox extends ReactiveElement {
  constructor(props?: CheckboxProps) {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: {
        sass
      }
    });

    this.props = props;
  }

  public propertiesAreSet: boolean;
  public callback: Function;
  public label: string;

  public data: {} = {
    isActive: false,
    label: "",
    title: "Toggle"
  }

  public watch: Watcher = {
    "isActive": (newValue: boolean) => {
      if (this.callback) {
        this.callback(newValue);
      }

      if (newValue) {
        this.refs["checkbox"].classList.add("active");
      } else {
        this.refs["checkbox"].classList.remove("active");
      }
    }
  }

  public onConnected(): void {
    if (!this.propertiesAreSet) {
      this.callback = this.props["callback"] ?? null;
      this.label = this.props["label"] ?? "";

      this.propertiesAreSet = true;
    }

    if (this.props["bgColor"]) {
      this.refs["checkbox"].style.backgroundColor = this.props["bgColor"];
    }

    const attrMap: Map<string, string> = this.props["attributes"] as Map<string, string>;

    if (attrMap) {
      attrMap.forEach((value: string, key: string) => {
        this[key] = value;
        this.setAttribute(key, value);
      });
    }
  }

  public events(): void {
    this.eventHandler.subscribe("checkbox", "check-event", "click", this.toggleCheckbox);
  }

  public toggleCheckbox(): void {
    this.refProxy["isActive"] = !this.refProxy["isActive"];
  }
}
