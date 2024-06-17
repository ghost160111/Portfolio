import { ReactiveElement } from "../../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { Watcher } from "../../../../../plugins/ReactiveElement/Classes/ReactiveElement";
// @ts-ignore
import sass from "!css-loader!sass-loader!../styles/SettingSlider.scss";

@DefineComponent({
  tag: "setting-slider",
  template: /*html*/`
    <div class="range-value" ref="range-value"></div>
    <div class="range-wrapper">
      <input class="range-slider" type="range" ref="range-slider" ref-step="step" ref-value="value" ref-min="min" ref-max="max" />
    </div>
  `
})
export default class SettingSlider extends ReactiveElement {
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

  public data: {} = {
    "min": 1,
    "max": 1.35,
    "step": 0.01,
    "value": 1
  }

  public watch: Watcher = {
    "value": () => {
      this.updateProgress();
      this.updateSiteZoom();
    }
  }

  public events(): void {
    this.eventHandler.subscribe("range-slider", "range-slider-event", "input", this.updateRangeSlider);
  }

  public updateRangeSlider(event: any): void {
    this.refProxy["value"] = event.target.value;
  }

  public updateProgress(): void {
    const min: any = this.refs["range-slider"].getAttribute("min");
    const max: any = this.refs["range-slider"].getAttribute("max");
    const currentValue: any = this.refs["range-slider"]["value"];

    this.refs["range-slider"].style.backgroundSize = ((currentValue - min) / (max - min)) * 100 + "% 100%";
  }

  public updateSiteZoom(): void {
    this.html.style.zoom = this.refProxy["value"];
  }
}
