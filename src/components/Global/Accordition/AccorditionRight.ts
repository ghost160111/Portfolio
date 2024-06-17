import AccorditionBase from "./AccorditionBase";
import ReactiveElement, { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
import SortAccordition from "./components/SortAccordition";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!./AccorditionRight.scss";
import TreePropsAccordition from "./components/TreeProps";
import { PlayFadeInAnimation } from "../../../plugins/ReactiveElement/Functions/PlayFadeInAnimation";

@DefineComponent({
  tag: "accordition-right",
  template: /*html*/`
    <div class="container">
      <button class="container__toggle-btn container__toggle-btn--right" type="button" ref="toggle-btn">
        <svg class="settings-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.12132 4.87868C9.29289 6.05025 9.29289 7.94975 8.12132 9.12132C6.94975 10.2929 5.05025 10.2929 3.87868 9.12132C2.70711 7.94975 2.70711 6.05025 3.87868 4.87868C5.05025 3.70711 6.94975 3.70711 8.12132 4.87868" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 7H9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20.1213 14.8787C21.2929 16.0502 21.2929 17.9497 20.1213 19.1213C18.9497 20.2929 17.0502 20.2929 15.8787 19.1213C14.7071 17.9497 14.7071 16.0502 15.8787 14.8787C17.0502 13.7071 18.9497 13.7071 20.1213 14.8787" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 17H15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="arrow-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Group">
            <path id="Path" d="M8 10L12 14L16 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg>
      </button>
      <button class="container__cancel-btn" ref="close-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="fi:x">
            <path id="Vector" d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Vector_2" d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg>
      </button>
      <section class="container__content" ref="container-content"></section>
    </div>
  `
})
export default class AccorditionRight extends AccorditionBase {
  constructor() {
    super({
      styles: {
        sass,
        links: ["margins"]
      },
      placedOnTheLeft: false
    });
  }

  public componentsAreRendered: boolean;

  public components: Record<string, ReactiveElement> = {
    "sort-accordition": new SortAccordition(),
    "tree-props-accordition": new TreePropsAccordition()
  }

  public data: {} = {
    "is-active": false,
    "sort-is-active": true
  }

  public watch: Watcher = {
    "is-active": (newValue: boolean) => {
      if (!newValue) {
        this.style.transform = "translate(0, 0)";
        this.refs["toggle-btn"].classList.remove("active");
      } else {
        this.style.transform = "translate(-100%, 0)";
        this.refs["toggle-btn"].classList.add("active");
      }
    },
    "sort-is-active": (newValue: boolean) => {
      this.showHideComponents(newValue);
    }
  }

  public onConnected(): void {
    if (!this.componentsAreRendered) {
      this.refs["container-content"].append(
        this.components["sort-accordition"],
        this.components["tree-props-accordition"]
      );
      this.componentsAreRendered = true;
    }

    this.showHideComponents(this.refProxy["sort-is-active"]);
  }

  public showHideComponents(value: boolean): void {
    if (!value) {
      this.components["tree-props-accordition"].style.visibility = "visible";
      this.components["tree-props-accordition"].style.opacity = "1";
      this.components["sort-accordition"].style.visibility = "hidden";
      this.components["sort-accordition"].style.opacity = "0";

      this.refs["close-btn"].classList.add("active");

      PlayFadeInAnimation(this.components["tree-props-accordition"], 1000);
    } else {
      this.components["tree-props-accordition"].style.visibility = "hidden";
      this.components["tree-props-accordition"].style.opacity = "0";
      this.components["sort-accordition"].style.visibility = "visible";
      this.components["sort-accordition"].style.opacity = "1";

      this.refs["close-btn"].classList.remove("active");

      PlayFadeInAnimation(this.components["sort-accordition"], 1000);
    }
  }

  public override events(): void {
    this.eventHandler.subscribe("toggle-btn", "toggle-event", "click", this.toggleComponent);
    this.eventHandler.subscribe("close-btn", "close-tree-props-event", "click", this.setSortActive);
  }

  public toggleSortComponent(): void {
    this.refProxy["sort-is-active"] = !this.refProxy["sort-is-active"];
  }

  public setSortActive(): void {
    this.refProxy["sort-is-active"] = true;
  }

  public setSortInactive(): void {
    this.refProxy["sort-is-active"] = false;
  }
}
