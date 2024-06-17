import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
// @ts-ignore
import sass from "!css-loader!sass-loader!./ImgSlider.scss";

@DefineComponent({
  tag: "img-slider",
  template: /*html*/`
    <div class="img-wrapper" ref="img-wrapper">
      <ul class="img-list" ref="img-list"></ul>
      <div class="img-overlay">
        <span class="img-overlay__tree-id" ref="tree-id" ref-data="treeId"></span>
        <button class="img-overlay__left-btn" ref="left-btn" type="button" ref-title="selectedContent.previous"><</button>
        <button class="img-overlay__right-btn" ref="right-btn" type="button" ref-title="selectedContent.next">></button>
        <div class="img-overlay__current-image-count" ref-data="current-page"></div>
        <div class="img-display">
          <span class="img-display__no-picture">No photo</span>
          <picture class="img-display__picture">
            <img class="img-display__img-selected"  ref-src="img-selected-url" />
          </picture>
        </div>
      </div>
    </div>
  `
})
export default class ImgSlider extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: {
        sass,
        links: ["margins"]
      }
    });
  }

  public data: {} = {
    "img-selected-url": "",
    "speed": 3,
    "stopped": true,
    "current-page": "",
    "count": 0,
    "treeId": "",
    "img-list": [],
    "interval-ref": null,
    "contents": {
      ru: {
        previous: "назад",
        pause: "пауза",
        next: "следующее"
      },
      uz: {
        previous: "orqaga",
        pause: "pauza",
        next: "keyingisi"
      },
      kiril: {
        previous: "оркага",
        pause: "пауза",
        next: "кейингиси"
      }
    },
    "selectedContent": {}
  }

  public watch: Watcher = {
    "img-list": () => {
      this.refProxy["img-selected-url"] = this.refProxy["img-list"][0];
    },
    "count": (newValue: number) => {
      this.refProxy["current-page"] = `${newValue + 1}/${this.refProxy["img-list"].length}`;
      this.refProxy["img-selected-url"] = this.refProxy["img-list"][this.refProxy["count"]];
    },
    "stopped": (newValue: boolean) => {
      return (newValue) ? this.stopInterval() : this.startInterval();
    }
  }

  public onDisconnected(): void {
    this.stopInterval();
  }

  public events(): void {
    this.eventHandler.subscribe("left-btn", "prev-event", "click", this.prev);
    this.eventHandler.subscribe("right-btn", "right-event", "click", this.next);
  }

  public setImages(): void {
    let imgListElement: HTMLElement = this.refs["img-list"];
    if (imgListElement) {
      imgListElement.innerHTML = "";
    }

    for (const imgURL of this.refProxy["img-list"]) {
      let li: HTMLLIElement = document.createElement("li");
      li.innerHTML = /*html*/`<img class="img-item" src="${imgURL}" alt="Tree Image" />`;
      imgListElement.appendChild(li);
    }
  }

  public next(): void {
    if (this.refProxy["count"] !== this.refProxy["img-list"].length - 1) {
      this.refProxy["count"] += 1;
    } else {
      this.refProxy["count"] = 0;
    }
  }

  public prev(): void {
    if (this.refProxy["count"] !== 0) {
      this.refProxy["count"] -= 1;
    } else {
      this.refProxy["count"] = this.refProxy["img-list"].length - 1;
    }
  }

  public startInterval(): void {
    this.refProxy["interval-ref"] = setInterval(() => {
      this.next();
    }, this.refProxy["speed"] * 1000);
  }

  public stopInterval(): void {
    clearInterval(this.refProxy["interval-ref"]);
  }

  public toggleInterval(): void {
    this.refProxy["stopped"] = !this.refProxy["stopped"];
  }
}
