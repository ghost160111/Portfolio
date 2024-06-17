import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ModalBase from "./ModalBase";
// @ts-ignore
import sass from "!css-loader!sass-loader!./Volunteers.scss";
import { Watcher } from "../../../../plugins/ReactiveElement/Classes/ReactiveElement";
import { PlayFadeInAnimation } from "../../../../plugins/ReactiveElement/Functions/PlayFadeInAnimation";
import { useMapStore } from "../../../../state/MapStore";
import { TreeList, Volunteer } from "../../../../state/Interfaces";
import { INTERVAL_TIME_SECONDS } from "../../../../state/fetchVolunteers";
// @ts-ignore
import TreeImageSvg from "@/assets/images/tree-image-svg.svg";
import { treesURL } from "../../../../constants/API_URL";

const template: string = /*html*/`
  <div class="wrapper">
    <h2 ref-data="selectedContent.title"></h2>
    <div class="content-wrapper">
      <ul class="content-tabs" ref="content-tabs">
        <li><button ref="content-tab" tab-name="rankings" class="content-tabs__btn" ref-data="selectedContent.volunteer-rankings.name" type="button"></button></li>
        <li><button ref="content-tab" tab-name="results" class="content-tabs__btn" ref-data="selectedContent.results.name" type="button"></button></li>
      </ul>
      <hr>
      <article class="content-article" ref="content-article">
        <div class="rankings" ref="content" tab-name="rankings">
          <ul class="rankings__tab-list mb-32">
            <li><button class="rankings__tab-list__btn" type="button" ref="filter-by-entire-period" ref-data="selectedContent.volunteer-rankings.tabs.wholePeriod"></button></li>
            <li><button class="rankings__tab-list__btn" type="button" ref="filter-by-year" ref-data="selectedContent.volunteer-rankings.tabs.perYear"></button></li>
            <li><button class="rankings__tab-list__btn" type="button" ref="filter-by-quartile" ref-data="selectedContent.volunteer-rankings.tabs.perQuartile"></button></li>
            <li><button class="rankings__tab-list__btn" type="button" ref="filter-by-month" ref-data="selectedContent.volunteer-rankings.tabs.perMonth"></button></li>
            <li><button class="rankings__tab-list__btn" type="button" ref="filter-by-week" ref-data="selectedContent.volunteer-rankings.tabs.perWeek"></button></li>
            <li><button class="rankings__tab-list__btn" type="button" ref="filter-by-today" ref-data="selectedContent.volunteer-rankings.tabs.today"></button></li>
          </ul>
          <div class="rankings__search-input-wrapper mb-32">
            <input class="rankings__search-input" type="text" id="search-volunteer" ref="search-input-by-volunteer" ref-placeholder="selectedContent.volunteer-rankings.filterInput.placeholder" />
            <button class="rankings__search-input-btn" type="button">Search</button>
          </div>
          <table class="rankings__table">
            <thead>
              <tr>
                <th ref-data="selectedContent.volunteer-rankings.table.headers.number"></th>
                <th ref-data="selectedContent.volunteer-rankings.table.headers.volunteer"></th>
                <th ref-data="selectedContent.volunteer-rankings.table.headers.activity"></th>
                <th ref-data="selectedContent.volunteer-rankings.table.headers.treeQty"></th>
              </tr>
            </thead>
            <tbody ref="tbody"></tbody>
          </table>
        </div>
        <div class="results mb-24" ref="content" tab-name="results">
          <div class="list__volunteer-item" ref="volunteer-item">
            <div class="volunteer-item__left">
              <img class="volunteer-img" src="${TreeImageSvg}" alt="Volunteer picture" />
            </div>
            <div class="volunteer-item__right">
              <span class="volunteer-item__fullname mb-4" ref-data="selectedContent.results.title"></span>
              <span class="volunteer-item__planted-trees mb-4">
                <span class="volunteer-item__planted-trees__qty" ref-data="selectedContent.results.treeQty"></span> <span ref-data="selectedContent.results.treeQtyLabel"></span>
              </span>
              <span class="volunteer-item__ranking-place mb-4">
                <span class="mr-2" ref-data="selectedContent.results.rankingPlaceLabel"></span>
                <span class="volunteer-item__ranking" ref-data="selectedContent.results.rankingPlaceNum"></span>
              </span>
              <span class="volunteer-item__activity mb-4">
                <span class="mr-2" ref-data="selectedContent.results.activityText"></span>
                <span>
                  <span class="mr-2" style="display:none;">30 дн.</span>
                  <span class="date-from" ref-data="selectedContent.results.activity"></span>
                </span>
              </span>
              <span class="volunteer-item__status">Не активен</span>
              <span class="volunteer-unique-link" style="display:none" ref-data="selectedContent.results.link"></span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
`;

@DefineComponent({
  tag: "modal-volunteers"
})
export default class ModalVolunteers extends ModalBase {
  constructor() {
    super({
      template,
      styles: {
        sass,
        links: ["margins"]
      }
    });
  }

  public data: {} = {
    activeTab: "rankings",
    tabs: [
      "rankings",
      "results"
    ],
    contents: {
      ru: {
        "title": "Волонтеры",
        "volunteer-rankings": {
          name: "Рейтинг волонтеров",
          tabs: {
            wholePeriod: "Весь период",
            perYear: "за год",
            perQuartile: "За квартал",
            perMonth: "За месяц",
            perWeek: "За неделю",
            today: "За сегодня"
          },
          filterInput: {
            placeholder: "Введите Имя"
          },
          table: {
            headers: {
              number: "№",
              volunteer: "Волонтер",
              activity: "Активность",
              treeQty: "Деревьев"
            }
          },
          showVolunteer: {
            fullname: "",
            treeQty: 0,
            treeQtyLabel: "деревьев",
            rankingPlaceLabel: "Место в рейтинге",
            rankingPlaceNum: 0,
            status: "",
            shareBtnLabel: "Поделиться"
          }
        },
        "results": {
          name: "Результаты",
          title: "Общие результаты",
          treeQty: 0,
          treeQtyLabel: "деревьев",
          rankingPlaceLabel: "Место в рейтинге",
          rankingPlaceNum: 0,
          activityText: "Активность",
          activity: ""
        }
      },
      oz: {
        "title": "Vo'lo'nterlar",
        "volunteer-rankings": {
          name: "Vo'lo'nterlar reytingi",
          tabs: {
            wholePeriod: "Butun davr",
            perYear: "yilda",
            perQuartile: "Chorakda",
            perMonth: "Oydan oyga",
            perWeek: "Haftadan haftaga",
            today: "Bugun"
          },
          filterInput: {
            placeholder: "Ismni kiriting"
          },
          table: {
            headers: {
              number: "№",
              volunteer: "Vo'lo'nter",
              activity: "Faoliyat",
              treeQty: "Daraxtlar"
            }
          },
          showVolunteer: {
            fullname: "",
            treeQty: 0,
            treeQtyLabel: "daraxtlar",
            rankingPlaceLabel: "Reytingdagi o'rin",
            rankingPlaceNum: 0,
            status: "",
            shareBtnLabel: "Ulashish"
          }
        },
        "results": {
          name: "Natijalar",
          title: "Umumiy natijalar",
          treeQty: 0,
          treeQtyLabel: "daraxtlar",
          rankingPlaceLabel: "Reytingdagi o'rin",
          rankingPlaceNum: 0,
          activityText: "Faoliyat",
          activity: ""
        }
      },
      uz: {
        "title": "Волонтерлар",
        "volunteer-rankings": {
          name: "Волонтерлар рейтинги",
          tabs: {
            wholePeriod: "Бутун давр",
            perYear: "йилда",
            perQuartile: "Чоракда",
            perMonth: "Ойдан ойга",
            perWeek: "Ҳафтадан ҳафтага",
            today: "Бугун"
          },
          filterInput: {
            placeholder: "Исмни киритинг"
          },
          table: {
            headers: {
              number: "№",
              volunteer: "Волонтер",
              activity: "Фаолият",
              treeQty: "Дарахтлар"
            }
          },
          showVolunteer: {
            fullname: "",
            treeQty: 0,
            treeQtyLabel: "дарахтлар",
            rankingPlaceLabel: "Рейтингдаги ўрин",
            rankingPlaceNum: 0,
            status: "",
            shareBtnLabel: "Улашиш"
          }
        },
        "results": {
          name: "Натижалар",
          title: "Умумий натижалар",
          treeQty: 0,
          treeQtyLabel: "дарахтлар",
          rankingPlaceLabel: "Рейтингдаги ўрин",
          rankingPlaceNum: 0,
          activityText: "Фаолият",
          activity: ""
        }
      }
    },
    selectedContent: {}
  }

  public watch: Watcher = {
    "activeTab": (newValue: string) => {
      for (let i = 0; i < this.refProxy["tabs"].length; ++i) {
        let tabName: string = this.refProxy["tabs"][i];

        if (tabName === newValue) {
          this.contentTabUpdate(tabName);
          PlayFadeInAnimation(this.refs["content-article"], 1000);
        }
      }
    }
  }

  public intervalID: any;

  public onConnected(): void {
    this.updateLanguage<ModalVolunteers>(this);
    this.contentTabUpdate(this.refProxy["activeTab"]);
    this.updateModalWindowSize();
    this.btns = this.$root.querySelectorAll(".rankings__tab-list__btn");
    this.btns.forEach((btn: HTMLElement) => btn.classList.remove("active"));
    this.generateList();
    this.intervalID = setInterval(() => {
      this.btns.forEach((btn: HTMLElement) => btn.classList.remove("active"));
      this.generateList();
    }, INTERVAL_TIME_SECONDS * 1000);

    this.updateResults();
  }

  public onDisconnected(): void {
    this.getModalWindow(() => {
      this.modalWindow.refProxy["width"] = "80%";
    });
    this.shadowRoot.querySelector("table > tbody").innerHTML = "";
    clearInterval(this.intervalID);
  }

  public events(): void {
    this.eventHandler.subscribe("content-tab", "content-tab-event", "click", this.contentTabClick);
    this.eventHandler.subscribe(window, "window-resize-event", "resize", this.updateModalWindowSize);
    this.eventHandler.subscribe("search-input-by-volunteer", "search-event", "input", this.searchVolunteerByName);

    // Add event listeners for filter buttons
    this.eventHandler.subscribe("filter-by-entire-period", "filter-entire-period-event", "click", this.filterByEntirePeriod);
    this.eventHandler.subscribe("filter-by-year", "filter-year-event", "click", this.filterByYear);
    this.eventHandler.subscribe("filter-by-quartile", "filter-quartile-event", "click", this.filterByQuartile);
    this.eventHandler.subscribe("filter-by-month", "filter-month-event", "click", this.filterByMonth);
    this.eventHandler.subscribe("filter-by-week", "filter-week-event", "click", this.filterByWeek);
    this.eventHandler.subscribe("filter-by-today", "filter-today-event", "click", this.filterByToday);
  }

  public searchVolunteerByName(event: InputEvent): void {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    let value = eventTarget.value;
    console.log(value);

    for (let i = 0; i < this.refs["tr-item"].length; ++i) {
      let trItem: HTMLElement = this.refs["tr-item"][i];
      let tdNameNode: HTMLElement = trItem.querySelector(".name");
      let name: string = tdNameNode.textContent.toUpperCase();

      if (name.indexOf(value.toUpperCase()) > -1) {
        trItem.style.display = "";
      } else {
        trItem.style.display = "none";
      }
    }
  }

  public updateResults(): void {
    fetch(treesURL)
      .then((response: Response) => {
        if (!response.ok) {
          throw "Response wasn't ok!";
        }
        return response.json();
      })
      .then((data: TreeList) => {
        this.refProxy["selectedContent"]["results"]["treeQty"] = data.total_count;
        this.refProxy["selectedContent"]["results"]["rankingPlaceNum"] = data.last_added; // check this property
        this.refProxy["selectedContent"]["results"]["activity"] = data.updated;
      })
      .catch((err) => console.error(err));
  }

  public contentTabClick(event: MouseEvent): void {
    let tab: HTMLButtonElement = event.target as HTMLButtonElement;
    this.refProxy["activeTab"] = tab.getAttribute("tab-name");
  }

  public contentTabUpdate(tabName: string): void {
    this.refs["content"].forEach((content: HTMLElement) => content.classList.remove("active"));
    this.refs["content"].forEach((content: HTMLElement) => {
      if (content.getAttribute("tab-name") === tabName) {
        content.classList.add("active");
      }
    });

    this.refs["content-tab"].forEach((tabBtn: HTMLButtonElement) => tabBtn.classList.remove("active"));
    this.refs["content-tab"].forEach((tabBtn: HTMLButtonElement) => {
      if (tabBtn.getAttribute("tab-name") === tabName) {
        tabBtn.classList.add("active");
      }
    });
  }

  public updateModalWindowSize(): void {
    this.getModalWindow(() => {
      if (window.innerWidth <= 1024) {
        this.modalWindow.refProxy["width"] = "90%";
      } else {
        this.modalWindow.refProxy["width"] = 1000;
      }
    });
  }

  public btns: NodeListOf<HTMLButtonElement>;

  public generateList(): void {
    this.btns[0].classList.add("active");

    setTimeout(() => {
      const volunteers: Volunteer[] = useMapStore.getState().volunteers;
      const tbodyNode: HTMLElement = this.refs["tbody"];

      tbodyNode.innerHTML = "";
      volunteers.forEach((volunteer: Volunteer) => {
        tbodyNode.innerHTML += /*html*/`
          <tr ref="tr-item">
            <td class="id">${volunteer.rating}</td>
            <td class="name">${volunteer[this.lang].name}</td>
            <td class="activity">${volunteer.date_active}</td>
            <td class="rating">${volunteer.count}</td>
          </tr>
        `;
      });

      this.shadowDOM.observeRefs();
    }, 500);
  }

  public filterByEntirePeriod(event: MouseEvent): void {
    this.btns.forEach((btn: HTMLButtonElement) => btn.classList.remove("active"));
    const btn: HTMLButtonElement = event.target as HTMLButtonElement;
    const volunteers: Volunteer[] = useMapStore.getState().volunteers;
    const tbodyNode: HTMLElement = this.refs["tbody"];

    tbodyNode.innerHTML = "";
    volunteers.forEach((volunteer: Volunteer) => {
      tbodyNode.innerHTML += /*html*/`
        <tr ref="tr-item">
          <td class="id">${volunteer.rating}</td>
          <td class="name">${volunteer[this.lang].name}</td>
          <td class="activity">${volunteer.date_active}</td>
          <td class="rating">${volunteer.count}</td>
        </tr>
      `;
    });

    btn.classList.add("active");
    this.shadowDOM.observeRefs();
  }

  public filterByYear(event: MouseEvent): void {
    const currentYear = new Date().getFullYear();
    this.filterVolunteers((volunteer) => new Date(volunteer.date_active).getFullYear() === currentYear);
    const btn: HTMLButtonElement = event.target as HTMLButtonElement;
    btn.classList.add("active");
  }

  public filterByQuartile(event: MouseEvent): void {
    const currentMonth = new Date().getMonth();
    const currentQuartile = Math.floor(currentMonth / 3);
    this.filterVolunteers((volunteer) => {
      const volunteerMonth = new Date(volunteer.date_active).getMonth();
      const volunteerQuartile = Math.floor(volunteerMonth / 3);
      return volunteerQuartile === currentQuartile;
    });
    const btn: HTMLButtonElement = event.target as HTMLButtonElement;
    btn.classList.add("active");
  }

  public filterByMonth(event: MouseEvent): void {
    const currentMonth = new Date().getMonth();
    this.filterVolunteers((volunteer) => new Date(volunteer.date_active).getMonth() === currentMonth);
    const btn: HTMLButtonElement = event.target as HTMLButtonElement;
    btn.classList.add("active");
  }

  public filterByWeek(event: MouseEvent): void {
    const currentWeek = this.getWeekNumber(new Date());
    this.filterVolunteers((volunteer) => this.getWeekNumber(new Date(volunteer.date_active)) === currentWeek);
    const btn: HTMLButtonElement = event.target as HTMLButtonElement;
    btn.classList.add("active");
  }

  public filterByToday(event: MouseEvent): void {
    const today = new Date().toDateString();
    this.filterVolunteers((volunteer) => new Date(volunteer.date_active).toDateString() === today);
    const btn: HTMLButtonElement = event.target as HTMLButtonElement;
    btn.classList.add("active");
  }

  private filterVolunteers(filterFn: (volunteer: Volunteer) => boolean): void {
    const volunteers: Volunteer[] = useMapStore.getState().volunteers.filter(filterFn);
    const tbodyNode: HTMLElement = this.refs["tbody"];

    tbodyNode.innerHTML = "";
    volunteers.forEach((volunteer: Volunteer) => {
      tbodyNode.innerHTML += /*html*/`
        <tr ref="tr-item">
          <td class="id">${volunteer.rating}</td>
          <td class="name">${volunteer[this.lang].name}</td>
          <td class="activity">${volunteer.date_active}</td>
          <td class="rating">${volunteer.count}</td>
        </tr>
      `;
    });

    this.shadowDOM.observeRefs();
    this.btns.forEach((btn: HTMLButtonElement) => btn.classList.remove("active"));
  }

  private getWeekNumber(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = (date.getTime() - start.getTime()) + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000;
    const oneWeek = 604800000;
    return Math.floor(diff / oneWeek);
  }

}
