// @ts-ignore
import sass from "!css-loader!sass-loader!./RangeSlider.scss";
import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";

export interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value?: number;
  callback?: Function
}

@DefineComponent({
  tag: "range-slider",
  template: /*html*/`
    <div class="range-wrapper">
      <div class="range-popup" ref="range-popup">
        <div class="range-popup__arrow"></div>
        <span ref-data="value"></span>
      </div>
      <input
        class="range-slider"
        type="range"
        ref="range"
        ref-step="step"
        ref-value="value"
        ref-min="min"
        ref-max="max"
      />
    </div>
  `
})
export default class RangeSlider extends ReactiveElement {
  constructor(props?: RangeSliderProps) {
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

  public propsAreSet: boolean;
  public callback: Function;

  public data: {} = {
    min: 0,
    max: 0,
    step: 0,
    value: 0
  }

  public onConnected(): void {
    if (!this.propsAreSet) {
      this.refProxy["min"] = this.props["min"];
      this.refProxy["max"] = this.props["max"];
      this.refProxy["step"] = this.props["step"];
      this.refProxy["value"] = this.props["value"] ?? this.props["min"];
      this.callback = this.props["callback"];
    }
  }

  public watch: Watcher = {
    "value": () => {
      this.updateProgress();
      this.updateValueNode();
      this.callback();
    }
  }

  public events(): void {
    this.eventHandler.subscribe("range", "range-input", "input", this.updateRangeSlider);
    this.eventHandler.subscribe("range", "range-focusin", "mouseenter", this.rangePopupActive);
    this.eventHandler.subscribe("range", "range-focusout", "mouseleave", this.rangePopupInactive);
  }

  public updateRangeSlider(event: InputEvent): void {
    let inputRange: HTMLInputElement = event.target as HTMLInputElement;
    this.refProxy["value"] = inputRange.value;
  }

  public updateProgress(): void {
    const min: any = this.refs["range"].getAttribute("min");
    const max: any = this.refs["range"].getAttribute("max");
    const currentValue: any = this.refs["range"]["value"];

    this.refs["range"].style.backgroundSize = ((currentValue - min) / (max - min)) * 100 + "% 100%";
  }

  public updateValueNode(): void {
    const range: HTMLElement = this.refs["range"];
    const thumbSize: number = this.refs["range-popup"].offsetWidth;
    const thumbPosition: number = (range["value"] - range["min"]) / (range["max"] - range["min"]) * (range.offsetWidth - thumbSize);
    this.refs["range-popup"].style.transform = `translate(${thumbPosition}px, 0)`;
  }

  public rangePopupActive(): void {
    this.refs["range-popup"].classList.add("active");
  }

  public rangePopupInactive(): void {
    this.refs["range-popup"].classList.remove("active");
  }
}
