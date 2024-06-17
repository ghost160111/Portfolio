// @ts-ignore
import sass from "!css-loader!sass-loader!./SortAccordition.scss";
import { ReactiveElement } from "../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ToggleElement from "../../ToggleElement";
import { Watcher } from "../../../../plugins/ReactiveElement/Classes/ReactiveElement";
import { PlayFadeInAnimation } from "../../../../plugins/ReactiveElement/Functions/PlayFadeInAnimation";
import RangeSlider from "../../RangeSlider/RangeSlider";
import ModalWindow from "../../Modal/ModalWindow";
import { useMapStore } from "../../../../state/MapStore";
import { Volunteer } from "../../../../state/Interfaces";
import { fetchVolunteers, INTERVAL_TIME_SECONDS } from "../../../../state/fetchVolunteers";

@DefineComponent({
  tag: "sort-accordition",
  template: /*html*/`
    <div class="sort-wrapper">
      <div class="sort-toggles mb-16">
        <h2 class="sort-toggles__title" ref-data="selectedContent.title"></h2>
        <div class="sort-toggles__sort" ref="sort-node">
          <label class="sort-toggles__sort__label mr-8" ref-data="selectedContent.sortVolunteersText"></label>
        </div>
      </div>
      <section class="sort-container" ref="sort-container">
        <div class="sort-container__sort-by-tree active" ref="sort-by-tree">
          <div class="sort-by-tree__search mb-24">
            <label class="sort-label" for="search-tree" ref-data="selectedContent.sortByTree.search.label"></label>
            <div class="sort-method mt-16">
              <div class="search__input-wrapper">
                <input class="search__input" type="text" id="search-tree" ref="search-input-by-tree" ref-placeholder="selectedContent.sortByTree.search.inputPlaceholder" />
                <button class="search__btn" type="button">Search</button>
                <div class="search__result" ref="search-result-by-tree">
                  <ul class="result__list" ref="result-list-by-tree"></ul>
                </div>
              </div>
            </div>
          </div>
          <div class="sort-by-tree__tree-params">
            <label class="sort-label" for="tree-params" ref-data="selectedContent.sortByTree.treeParams.label"></label>
            <div class="sort-method mt-16" ref="sort-tree-params">
              <div class="sort-by-tree__item">
                <label class="sort-by-tree__item__label" ref-data="selectedContent.sortByTree.treeParams.thickness"></label>
                <div class="sort-by-tree__item__range">
                  <span class="ml-16" ref="sort-by-thickness" ref-data="selectedContent.sortByTree.treeParams.thicknessMaxValue"></span>
                </div>
              </div>
              <div class="sort-by-tree__item">
                <label class="sort-by-tree__item__label" ref-data="selectedContent.sortByTree.treeParams.height"></label>
                <div class="sort-by-tree__item__range">
                  <span class="ml-16" ref="sort-by-height" ref-data="selectedContent.sortByTree.treeParams.heightMaxValue"></span>
                </div>
              </div>
              <div class="sort-by-tree__item">
                <label class="sort-by-tree__item__label" ref-data="selectedContent.sortByTree.treeParams.thickness2"></label>
                <div class="sort-by-tree__item__range">
                  <span class="ml-16" ref="sort-by-thickness-2" ref-data="selectedContent.sortByTree.treeParams.thickness2MaxValue"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sort-container__sort-by-volunteers" ref="sort-by-volunteers">
          <div class="sort-by-volunteer__search mb-24">
            <label class="sort-label" for="search-volunteer" ref-data="selectedContent.sortByTree.search.label"></label>
            <div class="sort-method mt-16 mb-16">
              <div class="search__input-wrapper">
                <input class="search__input" type="text" id="search-volunteer" ref="search-input-by-volunteer" ref-placeholder="selectedContent.sortByTree.search.inputPlaceholder" />
                <button class="search__btn" type="button">Search</button>
              </div>
            </div>
            <div class="sort-by-volunteer__search__result">
              <ul class="sort-by-volunteer__search__result__list" ref="volunteer-list"></ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export default class SortAccordition extends ReactiveElement {
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

    fetchVolunteers();
  }

  public data: {} = {
    sortByVolunteers: false,
    componentsAreRendered: false,
    searchOverlayIsActive: false,
    rangeThickness: 0,
    rangeHeight: 0,
    rangeThickness2: 0,
    maxallaIsChecked: false,
    areasIsChecked: false,
    parksIsChecked: false,
    ndviIsChecked: false,
    plantedYearsIsChecked: false,
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
            thicknessMaxValue: "25 см (сантиметры)",
            heightMaxValue: "2 м (метры)",
            thickness2MaxValue: "2 м (метры)"
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
        },
        "copyBtn": "Копировать",
        "copyText": "Копировать ссылку",
        "treeQtyLabel": "деревьев",
        "activityText": "Активность:",
        "inactive": "Не активен",
        "rankingText": "Место в рейтинге:"
      },
      oz: {
        title: "Saralash",
        sortVolunteersText: "Ko‘ngillilar",
        sortByTree: {
          search: {
            label: "Qidirish",
            inputPlaceholder: "Dastlabki uchta belgini kiriting"
          },
          treeParams: {
            label: "Daraxt tasnifi",
            thickness: "Daraxt tanasining qalinligi",
            height: "Balandlik boʻyicha",
            thickness2: "Qismning kengligi bo‘yicha",
            thicknessMaxValue: "25 sm (santimetrlar)",
            heightMaxValue: "2 m (metrlar)",
            thickness2MaxValue: "2 m (metrlar)"
          },
          mapParams: {
            label: "Karta ko‘rsatkichlari",
            maxallas: "Mahallalar",
            areas: "Tumanlar",
            parks: "Bogʻlar",
            ndvi: "NDVI",
            plantedYears: "Ko'p yillik o'simliklar ekiladigan maydonlar"
          }
        },
        sortByVolunteers: {
          search: {
            label: "Qidirish",
            inputPlaceholder: "Dastlabki uchta belgini kiriting"
          }
        },
        "copyBtn": "Nusxa olish",
        "copyText": "Havolani nusxalash",
        "treeQtyLabel": "daraxtlar",
        "activityText": "Faollik:",
        "inactive": "Faol emas",
        "rankingText": "Reytingdagi o‘rni:"
      },
      uz: {
        title: "Саралаш",
        sortVolunteersText: "Кўнгиллилар",
        sortByTree: {
          search: {
            label: "Қидирув",
            inputPlaceholder: "Дастлабки учта белгилини киритинг"
          },
          treeParams: {
            label: "Дарахт таснифи",
            thickness: "Дарахт танасининг қалинлиги",
            height: "Баландлиги",
            thickness2: "Қисмнинг кенглиги бўйича",
            thicknessMaxValue: "25 см (сантиметрлар)",
            heightMaxValue: "2 м (метрлар)",
            thickness2MaxValue: "2 м (метрлар)"
          },
          mapParams: {
            label: "Карта кўрсаткичлари",
            maxallas: "Маҳаллалар",
            areas: "Туманлар",
            parks: "Боғлар",
            ndvi: "NDVI",
            plantedYears: "Кўп йиллик ўсимликлар экиладиган майдонлар"
          }
        },
        sortByVolunteers: {
          search: {
            label: "Қидириш",
            inputPlaceholder: "Дастлабки учта белгилини киритинг"
          }
        },
        "copyBtn": "Нусха олиш",
        "copyText": "Ҳаволани нусҳалаш",
        "treeQtyLabel": "дарахтлар",
        "activityText": "Фаоллик:",
        "inactive": "Фаол эмас",
        "rankingText": "Рейтингдаги ўрни"
      }
    },
    selectedContent: {}
  }

  public watch: Watcher = {
    "sortByVolunteers": (newValue: boolean) => {
      if (newValue) {
        this.refs["sort-by-volunteers"].classList.add("active");
        this.refs["sort-by-tree"].classList.remove("active");
      } else {
        this.refs["sort-by-volunteers"].classList.remove("active");
        this.refs["sort-by-tree"].classList.add("active");
      }

      PlayFadeInAnimation(this.refs["sort-container"], 1000);
    },
    "searchOverlayIsActive": (newValue: boolean) => {
      this.toggleResultList(newValue);
    },
    // diameter
    "rangeThickness": (newValue: number) => {
      console.log("Diameter: ", newValue);
    },
    // height
    "rangeHeight": (newValue: number) => {
      console.log("Height: ", newValue)
    },
    // width
    "rangeThickness2": (newValue: number) => {
      console.log("Width: ", newValue);
    }
  }

  public components: Record<string, ReactiveElement> = {
    "toggle-element": new ToggleElement(() => {
      this.refProxy["sortByVolunteers"] = this.components["toggle-element"].refProxy["isActive"];
    }),
    // diameter
    "range-thickness": new RangeSlider({
      min: 0,
      max: 25,
      step: 0.1,
      callback: () => {
        this.refProxy["rangeThickness"] = this.components["range-thickness"].refProxy["value"];
      }
    }),
    // height
    "range-height": new RangeSlider({
      min: 0,
      max: 2,
      step: 0.1,
      callback: () => {
        this.refProxy["rangeHeight"] = this.components["range-height"].refProxy["value"];
      }
    }),
    // width
    "range-thickness-2": new RangeSlider({
      min: 0,
      max: 2,
      step: 0.1,
      callback: () => {
        this.refProxy["rangeThickness2"] = this.components["range-thickness-2"].refProxy["value"];
      }
    })
  }

  public modalWindow: ModalWindow;
  public intervalID: any;

  public onConnected(): void {
    if (!this.refProxy["componentsAreRendered"]) {
      this.renderComponents();
    }

    this.toggleResultList(this.refProxy["searchOverlayIsActive"]);

    this.sharedState.getComponent<ModalWindow>("modal-window")
      .then((modalWindow: ModalWindow) => this.modalWindow = modalWindow)
      .catch((err) => console.error(err));

    this.generateList();
    this.intervalID = setInterval(() => this.generateList(), INTERVAL_TIME_SECONDS * 1000);
  }

  public onDisconnected(): void {
    clearInterval(this.intervalID);
  }

  public renderComponents(): void {
    this.refs["sort-node"].appendChild(this.components["toggle-element"]);
    this.refs["sort-by-thickness"].insertAdjacentElement("beforebegin", this.components["range-thickness"]);
    this.refs["sort-by-height"].insertAdjacentElement("beforebegin", this.components["range-height"]);
    this.refs["sort-by-thickness-2"].insertAdjacentElement("beforebegin", this.components["range-thickness-2"]);

    this.refProxy["componentsAreRendered"] = true;
  }

  public toggleResultList(value: boolean): void {
    if (value) {
      this.refs["search-result-by-tree"].classList.add("active");
      this.components["range-thickness"].style.zIndex = "-1";
      this.components["range-height"].style.zIndex = "-1";
      this.components["range-thickness-2"].style.zIndex = "-1";
    } else {
      this.refs["search-result-by-tree"].classList.remove("active");
      this.components["range-thickness"].style.zIndex = "";
      this.components["range-height"].style.zIndex = "";
      this.components["range-thickness-2"].style.zIndex = "";
    }
  }

  public generateList(): void {
    setTimeout(() => {
      this.refs["volunteer-list"].innerHTML = "";
      let volunteers: Volunteer[] = useMapStore.getState().volunteers;

      for (let i = 0; i < volunteers.length; ++i) {
        let volunteer: Volunteer = volunteers[i];
        let template: string = this.generateVolunteerTemplate(volunteer);
        this.refs["volunteer-list"].innerHTML += template;
      }

      setTimeout(() => {
        this.shadowDOM.observeRefs();
        this.eventHandler.subscribe("volunteer-item", "volunteer-item-share", "click", (event: MouseEvent) => {
          let item: HTMLElement = event.target as HTMLElement;

          this.modalWindow.openModal("volunteer-share");

          this.sharedState.components["volunteer-share"].refProxy["name"] = item.querySelector(".volunteer-item__fullname").textContent;
          this.sharedState.components["volunteer-share"].refProxy["treeQty"] = item.querySelector(".volunteer-item__planted-trees__qty").textContent;
          this.sharedState.components["volunteer-share"].refProxy["ranking"] = item.querySelector(".volunteer-item__ranking").textContent;
          this.sharedState.components["volunteer-share"].refProxy["dateFrom"] = item.querySelector(".date-from").textContent;
          this.sharedState.components["volunteer-share"].refProxy["copyLink"] = item.querySelector(".volunteer-unique-link").textContent;
          this.sharedState.components["volunteer-share"].refProxy["imgURL"] = item.querySelector(".volunteer-img").getAttribute("src");
        });
      }, 750);
    }, 500);
  }

  public static get observedAttributes(): string[] {
    return ["lang"];
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
    this.updateChanged({
      attrName: "lang",
      name: "lang",
      newValue: newValue,
      oldValue: oldValue,
      callback: () => {
        this.generateList();
      }
    });
  }

  public generateVolunteerTemplate(volunteer: Volunteer): string {
    return /*html*/`
      <li>
        <div class="list__volunteer-item" ref="volunteer-item">
          <div class="volunteer-item__left">
            <img class="volunteer-img" src="${volunteer.photo}" alt="Volunteer picture" />
          </div>
          <div class="volunteer-item__right">
            <span class="volunteer-item__fullname mb-4">${volunteer[this.lang].name}</span>
            <span class="volunteer-item__planted-trees mb-4">
              <span class="volunteer-item__planted-trees__qty">${volunteer.count}</span> <span ref-data="selectedContent.treeQtyLabel">деревьев</span>
            </span>
            <span class="volunteer-item__ranking-place mb-4">
              <span class="mr-2">Место в рейтинге:</span>
              <span class="volunteer-item__ranking">${volunteer.rating}</span>
            </span>
            <span class="volunteer-item__activity mb-4">
              <span class="mr-2">Активность:</span>
              <span>
                <span class="mr-2" style="display:none;">30 дн.</span>
                <span class="date-from">${volunteer.date_active}</span>
              </span>
            </span>
            <span class="volunteer-item__status">Не активен</span>
            <span class="volunteer-unique-link" style="display:none">${volunteer.link}</span>
          </div>
        </div>
      </li>
    `;
  }
}
