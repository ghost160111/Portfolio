// @ts-ignore
import sass from "!!css-loader!sass-loader!../styles/NavMapSelector.scss";
import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
// @ts-ignore
import LocationPinLogo from "@/assets/images/LocationPinIcon.svg";

@DefineComponent({
  tag: "nav-map-selector",
  template: /*html*/`
    <div class="nav__map-switch-wrapper">
      <div class="nav__map-switch">
        <img class="nav__map-switch__location-pin-icon" src="${LocationPinLogo}" alt="location pin logo" />
        <button
          class="nav__map-switch__city-selected"
          type="button"
          ref="select-btn"
          ref-data="selectedCityName"
        ></button>
        <ul class="nav__map-switch__city-list" ref="city-list"></ul>
      </div>
    </div>
  `
})
export default class NavMapSelector extends ReactiveElement {
  constructor() {
    super({
      styles: {
        sass,
        links: ["margins"]
      },
      animations: {
        setOpacityAnimation: true
      },
      shadowDOM: true
    });
  }

  public data: {} = {
    toggleElement: {
      isActive: false
    },
    selectedCity: localStorage.getItem("selected-city-prefix") ?? "city-0",
    selectedCityName: localStorage.getItem("selected-city") ?? "Ташкент",
    citiesAreSet: false,
    contents: {
      ru: {
        cityList: {
          "city-0": { name: "Ташкент" },
          "city-1": { name: "Самарканд" },
          "city-2": { name: "Хива" }
        }
      },
      oz: {
        cityList: {
          "city-0": { name: "Toshkent" },
          "city-1": { name: "Samarqand" },
          "city-2": { name: "Xiva" }
        }
      },
      uz: {
        cityList: {
          "city-0": { name: "Тошкент" },
          "city-1": { name: "Самарканд" },
          "city-2": { name: "Хива" }
        }
      }
    },
    selectedContent: {}
  }

  public watch: Watcher = {
    "toggleElement.isActive": (newValue: boolean) => {
      this.styles.toggleClassList(this.refs["select-btn"], "active", newValue);
      this.styles.toggleClassList(this.refs["city-list"], "active", newValue);
    },
    "selectedContent": (newValue: {}) => {
      this.refProxy["selectedCityName"] = newValue["cityList"][this.refProxy["selectedCity"]].name;
    },
    "selectedCity": (newValue: any) => {
      localStorage.setItem("selected-city-prefix", newValue);
      localStorage.setItem("selected-city", this.refProxy["selectedCityName"]);
      this.refProxy["selectedCityName"] = this.refProxy["selectedContent"]["cityList"][newValue].name;
    }
  }

  public onConnected(): void {
    if (!this.refProxy["citiesAreSet"]) {
      this.setCities();
    }

    try {
      if (!localStorage.getItem("selected-city")) {
        this.refProxy["selectedCityName"] = this.refProxy["cityList"][this.refProxy["selectedContent"]["selectedCity"]];
      } else {
        this.refProxy["selectedCityName"] = localStorage.getItem("selected-city");
      }
    } catch (err) {
      if (this.devMode) {
        console.error(err);
      }
    }

    setTimeout(() => {
      this.refs["city"].forEach((btn: HTMLButtonElement) => {
        if (btn.id === localStorage.getItem("selected-city-prefix")) {
          btn.classList.add("active");
        }
      });
    }, 1000);
  }

  public events(): void {
    // this.eventHandler.subscribe("select-btn", "select-btn-click-event", "click", this.toggleDropdown);
    // this.eventHandler.subscribe(window, "window-click-outside", "click", this.windowOutsideClick);

    // setTimeout(() => {
    //   this.eventHandler.subscribe("city", "city-listener-event", "click", this.selectCityListener);
    // });
  }

  public toggleDropdown(): void {
    this.refProxy["toggleElement"]["isActive"] = !this.refProxy["toggleElement"]["isActive"];
  }

  public focusOutHandler(): void {
    this.refProxy["toggleElement"]["isActive"] = false;
  }

  public setCities(): void {
    this.shadowDOM.refs["city-list"].innerHTML = "";

    setTimeout(() => {
      for (const [key, value] of Object.entries(this.refProxy["selectedContent"]["cityList"])) {
        let li = document.createElement("li");
        li.innerHTML = /*html*/`
          <button
            class="nav__map-switch__city-list-item mb-16"
            id="${key}"
            type="button"
            ref="city"
            ref-data="selectedContent.cityList.${key}.name"
          ></button>
        `;
        this.shadowDOM.refs["city-list"].appendChild(li);
      }

      this.shadowDOM.observeRefs();
      this.refProxy["citiesAreSet"] = true;
    });
  }

  public selectCityListener(event: any): void {
    this.refProxy["selectedCity"] = event.target.getAttribute("id");

    this.refs["city"].forEach((node: HTMLElement) => {
      node.classList.remove("active");
    });

    event.target.classList.add("active");
  }

  public windowOutsideClick(event: any): void {
    if (event.target !== this) {
      this.refProxy["toggleElement"]["isActive"] = false;
    }
  }

  public updateMap(): void {
    // this is where you update map properties, by switching from one place to another!
    // update map using leaflet properties and methods
    // bind popups, update locations, do other things
    // export functionalities of leaflet
    // it is better to keep properties of leaflet in a single module at least or class
    // since there will be only one instance of leaflet map, it is better to design it as a module
    // using variables and methods that are exported to other modules to keep track of changes
    // and perform dynamic manipulations in a map using other modules and components!
  }
}
