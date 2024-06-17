import { ReactiveElement } from "../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!./styles/NavSettingsLayers.scss";
import Checkbox from "../../../Global/Checkbox/Checkbox";
import RangeSlider from "../../../Global/RangeSlider/RangeSlider";
import { WmsLayer } from "../../../../map/LeafletMap";
import { Watcher } from "../../../../plugins/ReactiveElement/Classes/ReactiveElement";

@DefineComponent({
  tag: "nav-settings-layers",
  template: /*html*/`
    <div class="sort-by-tree__tree-params">
      <label class="sort-label" for="tree-params" ref-data="selectedContent.sortByTree.mapParams.label"></label>
      <div class="sort-method" ref="sort-tree-params">
        <div class="sort-by-tree__item-check" ref="item-check">
          <label class="sort-by-tree__item-check__label ml-12" ref="maxallas" ref-data="selectedContent.sortByTree.mapParams.maxallas" for="maxalla"></label>
        </div>
        <div class="sort-by-tree__item-check" ref="item-check">
          <label class="sort-by-tree__item-check__label ml-12" ref="areas" ref-data="selectedContent.sortByTree.mapParams.areas" for="chegara"></label>
        </div>
        <div class="sort-by-tree__item-check" ref="item-check">
          <label class="sort-by-tree__item-check__label ml-12" ref="parks" ref-data="selectedContent.sortByTree.mapParams.parks" for="parks"></label>
        </div>
        <div class="sort-by-tree__item-check" ref="item-check">
          <label class="sort-by-tree__item-check__label ml-12" ref="ndvi" ref-data="selectedContent.sortByTree.mapParams.ndvi" for="ndvi"></label>
        </div>
        <div class="sort-by-tree__item-check" ref="item-check">
          <label class="sort-by-tree__item-check__label ml-12" ref="plantedYears" ref-data="selectedContent.sortByTree.mapParams.plantedYears" for="green-zones"></label>
        </div>
      </div>
    </div>
  `
})
export default class NavSettingsLayers extends ReactiveElement {
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
    componentsAreRendered: false,
    "ndvi-opacity-level": 0,
    contents: {
      ru: {
        title: "Сортировка",
        sortVolunteersText: "Волонтеры",
        sortByTree: {
          search: {
            label: "Поиск",
            inputPlaceholder: "Введите первые три символа"
          },
          treeParams: {
            label: "Параметры дерева",
            thickness: "По толщине ствола",
            height: "По высоте",
            thickness2: "По ширине кроны",
            thicknessMaxValue: "25 см",
            heightMaxValue: "2 м",
            thickness2MaxValue: "2 м"
          },
          mapParams: {
            label: "Параметры карты",
            maxallas: "Махалли",
            areas: "Районы",
            parks: "Парки",
            ndvi: "NDVI",
            plantedYears: "Участки с многолетними насаждениями"
          }
        },
        sortByVolunteers: {
          search: {
            label: "Поиск",
            inputPlaceholder: "Введите первые три символа"
          }
        }
      },
      oz: {
        title: "Saralash",
        sortVolunteersText: "Ekuvchilar",
        sortByTree: {
          search: {
            label: "Qidiruv",
            inputPlaceholder: "Birinchi uchta belgini kiriting"
          },
          treeParams: {
            label: "Daraxt parametrlari",
            thickness: "Tanasi qalinligiga qarab",
            height: "Balandligiga qarab",
            thickness2: "Shoxlari kengligiga qarab",
            thicknessMaxValue: "25 sm",
            heightMaxValue: "2 m",
            thickness2MaxValue: "2 m"
          },
          mapParams: {
            label: "Karta parametrlari",
            maxallas: "Mahallalar",
            areas: "Tumanlar",
            parks: "Bog'lar",
            ndvi: "NDVI",
            plantedYears: "Ko'p yillik ekinlar bilan uchastkalar"
          }
        },
        sortByVolunteers: {
          search: {
            label: "Qidiruv",
            inputPlaceholder: "Birinchi uchta belgini kiriting"
          }
        }
      },
      uz: {
        title: "Саралаш",
        sortVolunteersText: "Экувчилар",
        sortByTree: {
          search: {
            label: "Қидирув",
            inputPlaceholder: "Биринчи учта белгини киритинг"
          },
          treeParams: {
            label: "Дарахт параметрлар",
            thickness: "Танаси қалинлигига қараб",
            height: "Баландлигига қараб",
            thickness2: "Шохлари кенглигига қараб",
            thicknessMaxValue: "25 см",
            heightMaxValue: "2 м",
            thickness2MaxValue: "2 м"
          },
          mapParams: {
            label: "Карта параметрлар",
            maxallas: "Маҳаллалар",
            areas: "Туманлар",
            parks: "Боғлар",
            ndvi: "NDVI",
            plantedYears: "Кўп йиллик экинлар билан участкалар"
          }
        },
        sortByVolunteers: {
          search: {
            label: "Қидирув",
            inputPlaceholder: "Биринчи учта белгини киритинг"
          }
        }
      }
    },
    selectedContent: {}
  }

  public components: Record<string, ReactiveElement> = {
    "checkbox-maxalla": new Checkbox({
      bgColor: "#505050",
      callback: (value: boolean) => {
        this.updateTileLayer("checkbox-maxalla", value);
      },
      attributes: new Map<string, string>([
        ["tile-layer-url", "green_geoserver_db:Toshkent_sh_mahallalar_585_ru"],
        ["id", "maxalla"]
      ])
    }),
    "checkbox-area": new Checkbox({
      bgColor: "#505050",
      callback: (value: boolean) => {
        this.updateTileLayer("checkbox-area", value);
      },
      attributes: new Map<string, string>([
        ["tile-layer-url", "green_geoserver_db:Toshkent_chegara_ru"],
        ["id", "chegara"]
      ])
    }),
    "checkbox-parks": new Checkbox({
      bgColor: "#505050",
      callback: (value: boolean) => {
        this.updateTileLayer("checkbox-parks", value);
      },
      attributes: new Map<string, string>([
        ["tile-layer-url", "green_geoserver_db:Parklar_umumiy_maydon"],
        ["id", "parks"]
      ])
    }),
    "checkbox-ndvi": new Checkbox({
      bgColor: "#505050",
      callback: (value: boolean) => {
        this.updateTileLayer("checkbox-ndvi", value);

        if (this.refProxy["ndvi-opacity-level"] === 0) {
          this.updateNdviOpacity(1);
          this.components["ndvi-opacity-range"].refProxy["value"] = 1;
        }
      },
      attributes: new Map<string, string>([
        ["tile-layer-url", "green_geoserver_db:lulc2016_2023"],
        ["id", "ndvi"]
      ])
    }),
    "checkbox-plantedYears": new Checkbox({
      bgColor: "#505050",
      callback: (value: boolean) => {
        this.updateTileLayer("checkbox-plantedYears", value);
      },
      attributes: new Map<string, string>([
        ["tile-layer-url", "green_geoserver_db:green_zones_trees"],
        ["id", "green-zones"]
      ])
    }),
    "ndvi-opacity-range": new RangeSlider({
      min: 0,
      max: 1,
      step: 0.1,
      callback: () => {
        this.refProxy["ndvi-opacity-level"] = this.components["ndvi-opacity-range"].refProxy["value"];
      }
    })
  }

  public watch: Watcher = {
    "ndvi-opacity-level": (newValue: number) => {
      this.updateNdviOpacity(newValue);
      if (!this.components["checkbox-ndvi"].refProxy["isActive"]) {
        this.components["checkbox-ndvi"].refProxy["isActive"] = true;
      }
    }
  }

  public updateNdviOpacity(value: number): void {
    import("../../../../map/LeafletMap")
      .then((module) => {
        const map = module.map;

        for (let i = 0; i < map.wmsLayers.length; ++i) {
          const wmsLayer: WmsLayer = map.wmsLayers[i];

          if (wmsLayer.name === "NDVI") {
            wmsLayer.wmsLayer.setOpacity(value);
          }
        }
      })
      .catch((err) => console.error(err));
  }

  public langAttrObserver: MutationObserver = new MutationObserver(() => {
    let currentLangForMap: string;

    switch (this.lang) {
      case "oz":
        currentLangForMap = "uz_lt";
        break;
      case "uz":
        currentLangForMap = "uz_kr";
        break;
      case "ru":
        currentLangForMap = "ru";
        break;
    }

    this.components["checkbox-maxalla"].setAttribute("tile-layer-url", `green_geoserver_db:Toshkent_sh_mahallalar_585_${currentLangForMap}`);
    this.components["checkbox-area"].setAttribute("tile-layer-url", `green_geoserver_db:Toshkent_chegara_${currentLangForMap}`);
  });

  public onConnected(): void {
    if (!this.refProxy["componentsAreRendered"]) {
      this.refs["maxallas"].insertAdjacentElement("beforebegin", this.components["checkbox-maxalla"]);
      this.refs["areas"].insertAdjacentElement("beforebegin", this.components["checkbox-area"]);
      this.refs["parks"].insertAdjacentElement("beforebegin", this.components["checkbox-parks"]);
      this.refs["ndvi"].insertAdjacentElement("beforebegin", this.components["checkbox-ndvi"]);
      this.refs["plantedYears"].insertAdjacentElement("beforebegin", this.components["checkbox-plantedYears"]);

      this.refs["item-check"].forEach((itemCheck: HTMLElement) => {
        itemCheck.childNodes.forEach((childNode: ChildNode) => {
          if (childNode === this.components["checkbox-ndvi"]) {
            this.refs["ndvi"].insertAdjacentElement("afterend", this.components["ndvi-opacity-range"]);
          }
        });
      });

      this.refProxy["componentsAreRendered"] = true;
    }

    this.langAttrObserver.observe(this, {
      attributeFilter: ["lang"],
      attributes: true
    });
  }

  public events(): void {
    const labelNodeList: NodeListOf<HTMLLabelElement> = this.$root.querySelectorAll(".sort-by-tree__item-check__label");

    for (let i = 0; i < labelNodeList.length; ++i) {
      const labelNode: HTMLLabelElement = labelNodeList[i];
      labelNode.addEventListener("click", (event: MouseEvent) => {
        const label: HTMLLabelElement = event.target as HTMLLabelElement;

        for (const [key, component] of Object.entries(this.components)) {
          if (component instanceof Checkbox && component.id === label.getAttribute("for")) {
            (!component.refProxy["isActive"])
              ? component.refProxy["isActive"] = true
              : component.refProxy["isActive"] = false;
          }
        }
      });
    }
  }

  public onDisconnected(): void {
    this.langAttrObserver.disconnect();
  }

  public handleToggle(layerName: string, isActive?: boolean): void {
    import("../../../../map/LeafletMap")
      .then((module) => module.map.setWMSLayerCheck(layerName, isActive))
      .catch((err) => console.error(err));
  }

  public updateTileLayer(componentKey: string, value: boolean): void {
    let tileLayerURL: string = this.components[componentKey].getAttribute("tile-layer-url");
    this.handleToggle(tileLayerURL, value);
  }

  public mutationObserverCallback(): void {
    let currentLangForMap: string;

    switch (this.lang) {
      case "oz":
        currentLangForMap = "uz_lt";
        break;
      case "uz":
        currentLangForMap = "uz_kr";
        break;
      case "ru":
        currentLangForMap = "ru";
        break;
    }

    this.components["checkbox-maxalla"].setAttribute("tile-layer-url", `green_geoserver_db:Toshkent_sh_mahallalar_585_${currentLangForMap}`);
    this.components["checkbox-area"].setAttribute("tile-layer-url", `green_geoserver_db:Toshkent_chegara_${currentLangForMap}`);
  }
}
