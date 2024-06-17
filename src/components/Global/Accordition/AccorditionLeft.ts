import AccorditionBase from "./AccorditionBase";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!./AccorditionLeft.scss";
import ReactiveElement, { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
import NewsAccordition from "./components/NewsAccordition";

@DefineComponent({
  tag: "accordition-left",
  template: /*html*/`
    <div class="container">
      <button class="container__toggle-btn container__toggle-btn--left" type="button" ref="toggle-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Group">
            <path id="Path" d="M8 10L12 14L16 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg>
      </button>
      <section class="container__content" ref="container-content"></section>
    </div>
  `
})
export default class AccorditionLeft extends AccorditionBase {
  constructor() {
    super({
      styles: {
        sass,
        links: ["margins"]
      },
      placedOnTheLeft: true
    });

    this.timeoutForRenderingMS = 1500;
  }

  public componentsAreRendered: boolean;
  public timeoutForRenderingMS: number;
  public mapControlsContainer: HTMLElement;

  public components: Record<string, ReactiveElement> = {
    "news-accordition": new NewsAccordition()
  }

  public watch: Watcher = {
    "is-active": (newValue: boolean) => {
      if (newValue) {
        this.style.transform = "translate(0, 0)";
        this.refs["toggle-btn"].classList.add("active");
      } else {
        this.style.transform = "translate(-100%, 0)";
        this.refs["toggle-btn"].classList.remove("active");
      }

      if (this.mapControlsContainer) {
        this.toggleMapControls(newValue);
      } else {
        this.debounce(() => {
          this.toggleMapControls(newValue);
        }, this.timeoutForRenderingMS)();
      }
    }
  }

  public onConnected(): void {
    this.debounce(() => {
      this.mapControlsContainer = document.querySelector(".leaflet-control-zoom");
    }, this.timeoutForRenderingMS)();

    if (!this.componentsAreRendered) {
      this.refs["container-content"].appendChild(this.components["news-accordition"]);
      this.componentsAreRendered = true;
    }
  }

  public toggleMapControls(newValue: boolean): void {
    if (newValue) {
      this.mapControlsContainer.classList.add("active");
    } else {
      this.mapControlsContainer.classList.remove("active");
    }
  }
}
