// @ts-ignore
import LoupeSvg from "@/assets/images/search-loupe.svg";
// @ts-ignore
import sass from "!css-loader!sass-loader!../styles/NavSearch.scss";
import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
import { GeoJsonFeature, LeafletMap } from "../../../map/LeafletMap";
import { useMapStore } from "../../../state/MapStore";
import { TreeObjectPoint } from "../../../state/Interfaces";

@DefineComponent({
  tag: "nav-search",
  template: /*html*/`
    <div class="nav__search">
      <button class="nav__search__open-btn focus-visible" type="button" ref="search-open-btn" ref-data="selectedContent.openButtonText" ref-title="selectedContent.openButtonText"></button>
      <div class="nav__search__overlay" ref="search-overlay">
        <button class="nav__search__close-btn focus-visible" type="button" ref="search-close-btn" ref-data="selectedContent.closeButtonText" ref-title="selectedContent.closeButtonText"></button>
        <div class="nav__search__search-type">
          <button class="nav__search__open-dropdown focus-visible" ref="search-open-dropdown-btn" type="button" ref-data="selectedContent.selectSearchType" ref-title="selectedContent.selectSearchType"></button>
          <ul class="nav__search__dropdown-list" ref="search-dropdown-list">
            <li><button class="nav__search__dropdown-item" ref="filter-btn" id="address" ref-data="selectedContent.address" ref-title="selectedContent.address">Адрес</button></li>
            <li><button class="nav__search__dropdown-item" ref="filter-btn" id="coordinates" ref-data="selectedContent.coordinates" ref-title="selectedContent.coordinates">Координаты</button></li>
          </ul>
        </div>
        <div class="nav__search__input">
          <input class="nav__search__input-search" ref="input-search-field" type="search" role="search" ref-title="selectedContent.searchInputPlaceholder" ref-placeholder="selectedContent.searchInputPlaceholder" />
          <button class="nav__search__search-location" ref="search-location" type="button" ref-title="selectedContent.searchText" ref-data="selectedContent.searchText">Найти<img src="${LoupeSvg}" alt="Search Loupe" /></button>
          <div class="nav__search__input-search-result" ref="search-input-result">
            <ul class="nav__search__input-search-result__list" ref="nav-search-result-list"></ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export default class NavSearch extends ReactiveElement {
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
    searchOverlayIsActive: false,
    searchOpenDropdownBtnIsActive: false,
    searchDropdownListIsActive: false,
    searchInputResultIsActive: false,
    searchBtnIsActive: false,
    searchInputValue: "",
    searchLocationBtnIsActive: false,
    filterBy: "address",
    elementsAreSet: false,
    contents: {
      ru: {
        openButtonText: "Открыть",
        closeButtonText: "Закрыть",
        selectSearchType: "Выберите тип поиска",
        address: "Адрес",
        coordinates: "Координаты",
        searchInputPlaceholder: "Введите адрес",
        searchText: "Найти"
      },
      oz: {
        openButtonText: "Ochish",
        closeButtonText: "Yopish",
        selectSearchType: "Qidirish turini tanlang",
        address: "Manzil",
        coordinates: "Koordinatalar",
        searchInputPlaceholder: "Manzilni kiriting",
        searchText: "Qidirish"
      },
      uz: {
        openButtonText: "Очиш",
        closeButtonText: "Ёпиш",
        selectSearchType: "Қидириш турини танланг",
        address: "Манзил",
        coordinates: "Координатлар",
        searchInputPlaceholder: "Mанзилни киритинг",
        searchText: "Қидириш"
      }
    },
    selectedContent: {}
  }

  public watch: Watcher = {
    "searchOverlayIsActive": (newValue: boolean) => {
      this.styles.toggleClassList(this.refs["search-overlay"], "active", newValue);

      if (!newValue) {
        this.refProxy["searchOpenDropdownBtnIsActive"] = newValue;
        this.refProxy["searchDropdownListIsActive"] = newValue;
        this.refProxy["searchInputResultIsActive"] = newValue;
        this.refProxy["searchLocationBtnIsActive"] = newValue;
      } else {
        if (this.refProxy["filterBy"] === "coordinates") {
          this.refProxy["searchLocationBtnIsActive"] = true;
        } else {
          this.refProxy["searchLocationBtnIsActive"] = false;
        }
      }
    },
    "searchOpenDropdownBtnIsActive": (newValue: boolean) => {
      this.styles.toggleClassList(this.refs["search-open-dropdown-btn"], "active", newValue);
      this.refProxy["searchDropdownListIsActive"] = newValue;
    },
    "searchDropdownListIsActive": (newValue: boolean) => {
      this.styles.toggleClassList(this.refs["search-dropdown-list"], "active", newValue);
    },
    "searchInputResultIsActive": (newValue: boolean) => {
      this.styles.toggleClassList(this.refs["search-input-result"], "active", newValue);
    },
    "filterBy": (newValue: keyof { address: string, location: string }) => {
      this.eventHandler.unsubscribe("input-search-field-event");

      if (newValue === "address") {
        this.eventHandler.subscribe("input-search-field", "input-search-field-event", "input", this.onInputSearchAddress);
      } else if (newValue === "location") {
        this.eventHandler.unsubscribe("input-search-field-event");
      }

      this.refs["input-search-field"]["value"] = "";
      this.refs["nav-search-result-list"].innerHTML = "";
    },
    "searchInputValue": (newValue: string) => {
    },
    "searchLocationBtnIsActive": (newValue: boolean) => {
      return (newValue)
        ? this.refs["search-location"].classList.add("active")
        : this.refs["search-location"].classList.remove("active");
    }
  }

  public onConnected(): void {
    this.filterBy(this.refProxy["filterBy"]);
  }

  public events(): void {
    this.eventHandler.subscribe("search-open-btn", "open-search-overlay-event", "click", this.openSearchOverlay);
    this.eventHandler.subscribe("search-close-btn", "close-search-overlay-event", "click", this.closeSearchOverlay);
    this.eventHandler.subscribe("search-open-dropdown-btn", "toggle-dropdown-event", "click", this.toggleDropdown);
    this.eventHandler.subscribe("filter-btn", "filter-btn-event", "click", this.filterSearch);
    this.eventHandler.subscribe("input-search-field", "input-search-field-event", "input", this.onInputSearchAddress);
    this.eventHandler.subscribe("search-location", "search-location-event", "click", this.searchByCoordinates);
    this.eventHandler.subscribe(window, "window-escape-event", "keydown", this.escapeHandler);
  }

  public escapeHandler(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.closeSearchOverlay();
    }
  }

  public filterBy(value: keyof { address: string, location: string }): void {
    for (let i = 0; i < this.refs["filter-btn"].length; ++i) {
      let filterBtn: HTMLElement = this.refs["filter-btn"][i];

      if (filterBtn.id === value) {
        if (value === "address") {
          this.refProxy["searchLocationBtnIsActive"] = false;
          this.refProxy["searchInputResultIsActive"] = true;
        } else {
          this.refProxy["searchLocationBtnIsActive"] = true;
          this.refProxy["searchInputResultIsActive"] = false;
        }

        filterBtn.classList.add("active");
      }
    }
  }

  public filterSearch(event: any): void {
    this.refs["filter-btn"].forEach((filterBtn: HTMLButtonElement) => {
      filterBtn.classList.remove("active");
    });

    if (event.target.id === "address") {
      this.refProxy["searchInputResultIsActive"] = true;
      this.refProxy["searchLocationBtnIsActive"] = false;
    } else {
      this.refProxy["searchInputResultIsActive"] = false;
      this.refProxy["searchLocationBtnIsActive"] = true;
    }

    event.target.classList.add("active");
    this.refProxy["filterBy"] = event.target.id;
  }

  public openSearchOverlay(): void {
    this.refProxy["searchOverlayIsActive"] = true;
  }

  public closeSearchOverlay(): void {
    this.refProxy["searchOverlayIsActive"] = false;
  }

  public toggleDropdown(): void {
    this.refProxy["searchOpenDropdownBtnIsActive"] = !this.refProxy["searchOpenDropdownBtnIsActive"];
  }

  public enteredText: string = "";

  public onInputSearchAddress(event: any): void {
    if (!this.refProxy["searchInputResultIsActive"]) {
      this.refProxy["searchInputResultIsActive"] = true;
    }

    let eventTargetValue: string = event.target.value;
    let inputValue: string = eventTargetValue.toUpperCase();
    let txtValue: string;

    this.refProxy["searchInputValue"] = inputValue;
    this.refs["nav-search-result-list"].innerHTML = "";

    if (inputValue.length >= 1) {
      let features: GeoJsonFeature[] = useMapStore.getState().features;
      console.log(inputValue);

      for (let i = 0; i < features.length; ++i) {
        let feature: GeoJsonFeature = features[i];
        let props: TreeObjectPoint = feature.properties;
        let address: string = props.address.toUpperCase();

        if (inputValue[0] === address[0]) {
          this.refs["nav-search-result-list"].innerHTML += /*html*/`
            <li
              class="nav__search__input-search-result__list-item"
              ref="searched-item"
              data-text="${props.address}"
              event-id="${props.id}"
            >${props.address}</li>
          `;

          this.shadowDOM.observeRefs();
          this.enteredText = inputValue;

          let searchedItems: NodeListOf<HTMLElement> = this.refs["searched-item"];

          for (let j = 0; j < searchedItems.length; ++j) {
            let li: HTMLElement = searchedItems[j];
            let txt: string = searchedItems[j].textContent ?? searchedItems[j].innerText;

            li.setAttribute("event-attached", "");

            if (!li.getAttribute("event-attached")) {
              li.addEventListener("click", (event: MouseEvent) => {
                let eventTarget: HTMLLIElement = event.target as HTMLLIElement;
                this.refProxy["searchInputValue"] = eventTarget.textContent.toUpperCase();
                let eventId = eventTarget.getAttribute("event-id");

                import("../../../map/LeafletMap")
                  .then((module) => {
                    let map: LeafletMap = module.map;
                    features.forEach((eventFeature: GeoJsonFeature) => {
                      if (eventFeature.properties.id === eventId) {
                        map.setTreePropsAccordition(eventFeature.properties);
                        let lat: number = eventFeature.geometry.coordinates[1];
                        let lng: number = eventFeature.geometry.coordinates[0];
                        map.map.setView([lat, lng], 20);
                        map.tileLayer.bindPopup(eventFeature.properties.address).openPopup([lat, lng]);
                      }
                      // open mobile tree props as well
                    });
                  })
                  .catch((err) => console.error(err));
              });
            }

            if (txt.toUpperCase().indexOf(inputValue) > -1) {
              li.style.display = "";
            } else {
              li.style.display = "none";
            }
          }
        }
      }
    } else {
      this.refs["nav-search-result-list"].innerHTML = "";
    }
  }

  public searchByCoordinates(): void {
    let inputCoordinates: string;
    let splittedCoord: string[];
    let splittedCoordNum: number[];

    if (this.refProxy["searchInputResultIsActive"]) {
      this.refProxy["searchInputResultIsActive"] = false;
    }

    inputCoordinates = this.refs["input-search-field"]["value"].trim();

    if (inputCoordinates.includes(",")) {
      splittedCoord = inputCoordinates.split(",");
    } else {
      splittedCoord = inputCoordinates.split(" ");
    }

    splittedCoord[0] = splittedCoord[0].trim();
    splittedCoord[1] = splittedCoord[1].trim();

    splittedCoordNum = [Number(splittedCoord[0]), Number(splittedCoord[1])];

    let features: GeoJsonFeature[] = useMapStore.getState().features;

    for (let i = 0; i < features.length; ++i) {
      let feature: GeoJsonFeature = features[i];
      let props: TreeObjectPoint = feature.properties;
      let coordsStr: string = props.coords;
      let coords: string[] = coordsStr.split(",");
      let lat: number = Number(coords[0].trim());
      let lng: number = Number(coords[1].trim());

      if (splittedCoordNum[0] === lat && splittedCoordNum[1] === lng) {
        import("../../../map/LeafletMap")
          .then((module) => {
            let map: LeafletMap = module.map;

            if (window.innerWidth >= 1024) {
              map.setTreePropsAccordition(props);
              map.tileLayer.bindPopup(props.address).openPopup([lat, lng]);
              map.map.setView([lat, lng], 20);
            }
            // open from mobile as well!
          });
      }
    }
  }
}
