import { ReactiveElement } from "../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { Watcher } from "../../../../plugins/ReactiveElement/Classes/ReactiveElement";
import ImgSlider from "../../ImgSlider/ImgSlider";
import ModalWindow from "../../Modal/ModalWindow";
// @ts-ignore
import sass from "!css-loader!sass-loader!./TreeProps.scss";

@DefineComponent({
  tag: "tree-props-accordition",
  template: /*html*/`
    <article class="data-wrapper">
      <h2 class="data-title ml-16 mt-16 mb-16" ref-data="values.titleName"></h2>
      <div class="img-slider ml-16" ref="img-slider"></div>
      <p>
        <span><span ref-data="selectedContent.height"></span>:</span>
        <span ref-data="values.height"></span>
      </p>
      <p>
        <span><span ref-data="selectedContent.thickness"></span>:</span>
        <span ref-data="values.thickness"></span>
      </p>
      <p>
        <span><span ref-data="selectedContent.diameter"></span>:</span>
        <span ref-data="values.diameter"></span>
      </p>
      <p>
        <span><span ref-data="selectedContent.address"></span>:</span>
        <span ref-data="values.address"></span>
      </p>
      <p>
        <span><span ref-data="selectedContent.coordinates"></span>:</span>
        <span class="data-coordinates">
          <span ref-data="values.coordinates"></span>
          <button
            class="data-coord-copy-btn data-coord-copy-btn--hide-before"
            type="button"
            ref="copy-coord-btn"
            ref-data="selectedContent.copy"
            ref-title="selectedContent.copy"
          >
          </button>
        </span>
      <p>
        <span><span ref-data="selectedContent.volunteer"></span>:</span>
        <span ref-data="values.volunteer"></span>
      </p>
      <p>
        <span><span ref-data="selectedContent.balanceHolder"></span>:</span>
        <span ref-data="values.balanceHolder"></span>
      </p>
      <p>
        <span><span ref-data="selectedContent.lastDateUpdated"></span>:</span>
        <span ref-data="values.lastDateUpdated"></span>
      </p>
      <!-- <div class="data-block-wrapper">
        <button
          class="complain-btn complain-btn--red"
          type="button"
          ref="complain-btn"
          ref-data="selectedContent.complainBtnTitle"
          ref-title="selectedContent.complainBtnTitle"
        ></button>
      </div> -->
    </article>
  `
})
export default class TreePropsAccordition extends ReactiveElement {
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
    "img-slider-is-rendered": false,
    "values": {
      treeId: "",
      titleName: "",
      height: 0,
      thickness: 0,
      diameter: 0,
      address: "",
      coordinates: [],
      volunteer: "",
      balanceHolder: "",
      lastDateUpdated: "",
      imgList: []
    },
    "contents": {
      ru: {
        height: "Высота",
        thickness: "Толщина ствола",
        diameter: "Диаметр",
        address: "Адрес",
        coordinates: "Координаты",
        volunteer: "Волонтеры",
        balanceHolder: "Балансодержатель",
        lastDateUpdated: "Дата последнего обновления",
        complainBtnTitle: "Пожаловаться",
        copy: "Копировать"
      },
      oz: {
        height: "Balandligi",
        thickness: "Qalinligi",
        diameter: "Diameter",
        address: "Adresi",
        coordinates: "Coordinatalar",
        volunteer: "Ixtiyoriy ishchi",
        balanceHolder: "Balans egasi",
        lastDateUpdated: "Oxirgi sana yangilandi",
        complainBtnTitle: "Shikoyat qilish",
        copy: "Nusxalash"
      },
      uz: {
        height: "Баландлиги",
        thickness: "Қалинлиги",
        diameter: "Диаметр",
        address: "Адреси",
        coordinates: "Координаталар",
        volunteer: "Ихтиёрий ишчи",
        balanceHolder: "Баланс эгаси",
        lastDateUpdated: "Охирги сана янгиланди",
        complainBtnTitle: "Шикоят қилиш",
        copy: "Нусхалаш"
      }
    },
    "selectedContent": {
    }
  }

  public components: Record<string, ReactiveElement> = {
    "img-slider": new ImgSlider()
  }

  public watch: Watcher = {
    "values.coordinates": () => {
      this.components["img-slider"].refProxy["treeId"] = this.refProxy["values"]["treeId"];
    },
    "values.imgList": (newValue: string[]) => {
      let imagesList: string[] = newValue;

      this.components["img-slider"].refProxy["img-list"] = [];
      this.components["img-slider"].refProxy["img-list"].push(...imagesList);

      this.components["img-slider"]["stopInterval"]();
      this.components["img-slider"]["setImages"]();

      this.components["img-slider"].refProxy["img-selected-url"] = imagesList[0];
      this.components["img-slider"].refProxy["current-page"] = `1/${imagesList.length}`;
    }
  }

  public onConnected(): void {
    if (!this.refProxy["img-slider-is-rendered"]) {
      this.components["img-slider"]
      this.refs["img-slider"].appendChild(this.components["img-slider"]);
      this.refProxy["img-slider-is-rendered"] = true;
    }
  }

  public events(): void {
    this.eventHandler.subscribe("complain-btn", "complain-modal-event", "click", this.openComplainModal);
    this.eventHandler.subscribe("copy-coord-btn", "copy-location-coord-event", "click", this.copyLocation);
  }

  public openComplainModal(): void {
    this.sharedState.getComponent("modal-window")
      .then((modalWindow: ModalWindow) => {
        modalWindow.openModal("modal-complain");
      })
      .catch((err) => console.error(err));
  }

  public copyLocation(): void {
    let coord: string = this.refProxy["values"]["coordinates"];
    this.copyTextToClipboard(coord);

    this.refs["copy-coord-btn"].classList.remove("data-coord-copy-btn--hide-before");
    this.refs["copy-coord-btn"].classList.add("data-coord-copy-btn--animated-copied-state");

    setTimeout(() => {
      this.refs["copy-coord-btn"].classList.add("data-coord-copy-btn--hide-before");
      this.refs["copy-coord-btn"].classList.remove("data-coord-copy-btn--animated-copied-state");
    }, 1000);
  }

  public copyTextToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => console.log("Text copied to clipboard"))
        .catch((err) => console.error(err));
    } else {
      console.log("No clipboard on http site!");
    }
  }
}
