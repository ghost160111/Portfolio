// @ts-ignore
import $ from "jquery";
import "ion-rangeslider";
import { sharedState } from "../plugins/ReactiveElement/Classes/ReactiveElement";
import AccorditionLeft from "./Global/Accordition/AccorditionLeft";
import AccorditionRight from "./Global/Accordition/AccorditionRight";
import { debounce } from "../utils/Debounce";

class TimelineLogic {
  public filterContainerNode: HTMLElement;
  public filterContainerToggleBtnNode: HTMLElement;
  public mainNode: HTMLElement;
  public isActive: boolean;

  constructor() {
    this.filterContainerNode = document.querySelector(".filter-date-container");
    this.filterContainerToggleBtnNode = document.querySelector(".filter-date-container__toggle-btn");
    this.mainNode = document.querySelector("main.main");

    if ($(".js-range-slider").length) {
      let range = $(".js-range-slider");
      let lang = "ru-RU";
      let min = new Date(2024, 3).getTime();
      let max = Date.now();
      let fromElement = document.querySelector('.js-date-from');
      let toElement = document.querySelector('.js-date-to');
      let reset = document.querySelector('.js-date-reset');

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function tsToDate(ts) {
        let d = new Date(ts);

        return d.toLocaleDateString(lang, {
          year: 'numeric',
          month: 'long',
        });
      }

      range.ionRangeSlider({
        skin: "flat",
        type: "double",
        grid: true,
        step: 1,
        min: min,
        max: max,
        snap_step: true,
        prettify: tsToDate,
        onChange: debounce(changeDate, 300),
        onUpdate: debounce(changeDate, 300),
        onStart: changeDate
      });

      reset.addEventListener('click', function () {
        range.data("ionRangeSlider").update({
          from: min,
          to: max,
        })
      });

      function changeDate(e) {
        let from = e.from_pretty.slice(0, e.from_pretty.lastIndexOf(" "));
        let to = e.to_pretty.slice(0, e.to_pretty.lastIndexOf(" "));

        fromElement.innerHTML = capitalizeFirstLetter(from);
        toElement.innerHTML = capitalizeFirstLetter(to);

        // setTimeout(() => {
        //   ctx.$store.commit('timeline/updateTimeFrom', e.from);
        //   ctx.$store.commit('timeline/updateTimeTo', e.to);
        // }, 200)
      }
    }

    setTimeout(() => {
      this.filterContainerToggleBtnNode.addEventListener("click", this.toggleHandler);
    }, 250);
  }

  public toggleHandler = (): void => {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.openFooterSliderControls();
    } else {
      this.closeFooterSliderControls();
    }
  }

  public openFooterSliderControls(): void {
    this.filterContainerNode.classList.add("active");
    this.filterContainerToggleBtnNode.classList.add("active");

    this.mainNode.style.paddingBottom = "12.5rem";

    sharedState.getComponent<AccorditionLeft>("accordition-left")
      .then((accLeft: AccorditionLeft) => {
        accLeft.style.height = "calc(100dvh - 17rem)";
        accLeft.refs["container-content"].style.height = "calc(100dvh - 17rem)";
      })
      .catch((err) => console.error(err));

    sharedState.getComponent<AccorditionRight>("accordition-right")
      .then((accRight: AccorditionRight) => {
        accRight.style.height = "calc(100dvh - 17rem)";
        accRight.refs["container-content"].style.height = "calc(100dvh - 17rem)";
      })
      .catch((err) => console.error(err));
  }

  public closeFooterSliderControls(): void {
    this.filterContainerNode.classList.remove("active");
    this.filterContainerToggleBtnNode.classList.remove("active");

    this.mainNode.style.paddingBottom = "4.75rem";

    sharedState.getComponent<AccorditionLeft>("accordition-left")
      .then((accLeft: AccorditionLeft) => {
        accLeft.style.height = "calc(100dvh - 9.25rem)";
        accLeft.refs["container-content"].style.height = "calc(100dvh - 9.25rem)";
      })
      .catch((err) => console.error(err));

    sharedState.getComponent<AccorditionRight>("accordition-right")
      .then((accRight: AccorditionRight) => {
        accRight.style.height = "calc(100dvh - 9.25rem)";
        accRight.refs["container-content"].style.height = "calc(100dvh - 9.25rem)";
      })
      .catch((err) => console.error(err));
  }
}

let timeline: TimelineLogic;

try {
  timeline = new TimelineLogic();
} catch (err) {
  console.error(err);
}

export { timeline };
