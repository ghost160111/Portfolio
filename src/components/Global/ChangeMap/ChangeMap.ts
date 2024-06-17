// @ts-ignore
import sass from "!css-loader!sass-loader!./ChangeMap.scss";
import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import map1 from "@/assets/images/map1.png";
// @ts-ignore
import map2 from "@/assets/images/map2.png";
// @ts-ignore
import map3 from "@/assets/images/map3.png";
import { MapLayerType } from "../../../map/LeafletMap";

@DefineComponent({
  tag: "change-map",
  template: /*html*/`
    <ul class="layers-list">
      <li>
        <button class="layers-button" type="button" ref="layers-btn" layer-name="sputnik">
          <span class="layers-button__img">
            <img ref-src="srcMap1" alt="Layer 1" />
          </span>
          <span class="layers-button__text" ref-data="selectedContent.layerText1"></span>
        </button>
      </li>
      <li>
        <button class="layers-button" type="button" ref="layers-btn" layer-name="light">
          <span class="layers-button__img">
            <img ref-src="srcMap2" alt="Layer 2" />
          </span>
          <span class="layers-button__text" ref-data="selectedContent.layerText2"></span>
        </button>
      </li>
      <li>
        <button class="layers-button" type="button" ref="layers-btn" layer-name="dark">
          <span class="layers-button__img">
            <img ref-src="srcMap3" alt="Layer 3" />
          </span>
          <span class="layers-button__text" ref-data="selectedContent.layerText3"></span>
        </button>
      </li>
    </ul>
  `
})
export default class ChangeMap extends ReactiveElement {
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
    srcMap1: map1,
    srcMap2: map2,
    srcMap3: map3,
    contents: {
      ru: {
        layerText1: "Спутник",
        layerText2: "Светлая",
        layerText3: "Темная"
      },
      oz: {
        layerText1: "Спутник",
        layerText2: "Ёруғ режим",
        layerText3: "Тунги режим"
      },
      uz: {
        layerText1: "Sputnik",
        layerText2: "Yorug‘ rejim",
        layerText3: "Tungi rejim"
      }
    },
    selectedContent: {}
  }

  public onConnected(): void {
    this.renderSelectedMapLayer("dark");
  }

  public events(): void {
    this.eventHandler.subscribe("layers-btn", "change-layers-event", "click", this.handleLayerBtnClick);
  }

  public handleLayerBtnClick(event: MouseEvent): void {
    let btn: HTMLButtonElement = event.target as HTMLButtonElement;
    let layerName: string = btn.getAttribute("layer-name");
    this.renderSelectedMapLayer(layerName);
    btn.classList.add("active");
  }

  public renderSelectedMapLayer(layerName: string): void {
    this.refs["layers-btn"].forEach((btn: HTMLButtonElement) => {
      btn.classList.remove("active");

      if (btn.getAttribute("layer-name") == layerName) {
        btn.classList.add("active");
      }
    });

    import("../../../map/LeafletMap")
      .then((module) => module.map.setTileLayerToMap(layerName))
      .catch((err) => console.error(err));
  }
}
