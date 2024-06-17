import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ModalAboutProject from "./components/AboutProject";
import ModalComplain from "./components/Complain";
import ModalContacts from "./components/Contacts";
import ModalInfographics from "./components/Infographics";
import ModalPolicy from "./components/Policy";
import ModalVolunteers from "./components/Volunteers";
// @ts-ignore
import closeSvg from "@/assets/images/close-icon.svg";
// @ts-ignore
import sass from "!css-loader!sass-loader!./styles/ModalWindow.scss";
import VolunteerShare from "./components/VolunteerShare";
import ModalPayForm from "./components/ModalPayForm";

interface Sizes {
  height: number;
  width: number;
}

type KeyofSizes = keyof Sizes;

@DefineComponent({
  tag: "modal-window",
  template: /*html*/`
    <div class="modal-wrapper">
      <div class="modal" ref="modal-container">
        <button class="modal__close-btn" ref="modal-close-btn" type="button" ref-title="selectedContent.closeBtn">
          close
          <img src="${closeSvg}" />
        </button>
        <section class="modal__content" ref="content"></section>
      </div>
    </div>
  `
})
export default class ModalWindow extends ReactiveElement {
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

    this.htmlAttributeObserver = new MutationObserver(this.htmlAttrObserverCallback);
    this.htmlAttributeObserver.observe(this.html, {
      attributes: true,
      attributeFilter: ["style"]
    });
  }

  public htmlAttributeObserver: MutationObserver;

  public htmlAttrObserverCallback = (): void => {
    let zoom: number = Number(this.html.style.zoom);

    this.sharedState.getComponent("modal-window")
      .then((modalWindow: ModalWindow) => {
        let modalContainer: HTMLElement = modalWindow.refs["modal-container"];

        if (zoom >= 1.20) {
          modalContainer.style.height = "75%";
        } else if (zoom >= 1.08) {
          modalContainer.style.top = "0";
          modalContainer.style.transform = "translate(-50%, 0)";
          modalContainer.style.height = "80%";
        } else {
          modalContainer.style.top = "50%";
          modalContainer.style.transform = "translate(-50%, -50%)";
          modalContainer.style.height = "";
        }
      })
      .catch((err) => console.error(err));
  }

  public data: {} = {
    height: 0,
    width: 0,
    contents: {
      ru: {
        closeBtn: "Закрыть"
      },
      oz: {
        closeBtn: "Yopish"
      },
      uz: {
        closeBtn: "Йопиш"
      }
    },
    selectedContent: {}
  }

  public watch: Watcher = {
    "height": (newValue: number | string) => {
      this.sizeSetter(newValue, "height");
    },
    "width": (newValue: number | string) => {
      this.sizeSetter(newValue, "width");
    }
  }

  public components: Record<string, ReactiveElement> = {
    "modal-about-project": new ModalAboutProject(),
    "modal-complain": new ModalComplain(),
    "modal-contacts": new ModalContacts(),
    "modal-infographics": new ModalInfographics(),
    "modal-policy": new ModalPolicy(),
    "modal-volunteers": new ModalVolunteers(),
    "volunteer-share": new VolunteerShare(),
    "modal-pay-form": new ModalPayForm()
  }

  public events(): void {
    this.eventHandler.subscribe("modal-close-btn", "modal-close-event", "click", this.closeModal);
    this.eventHandler.subscribe(this.$root, "external-click-event", "click", this.checkModal);
    this.eventHandler.subscribe(window, "escape-event", "keydown", this.closeModalOnEsc);
  }

  public sizeSetter(value: number | string, sizeType: KeyofSizes): void {
    switch (typeof value) {
      case "number":
        this.refs["modal-container"].style[sizeType] = `${value / 16}rem`;
        break;
      case "string":
        if (value.includes("%") && value.endsWith("%")) {
          this.refs["modal-container"].style[sizeType] = value;
        }
        break;
      default:
        throw "Only string and number types are allowed, string for percentage and number for pixels!";
    }
  }

  public openModal(componentKey: string): void {
    let targetNode = this.refs["content"];
    let component = this.components[componentKey];
    this.shadowDOM.setContentToNode(targetNode, component);

    this.style.visibility = "visible";
    this.style.opacity = "1";

    this.refs["modal-close-btn"].classList.remove("modal__close-btn--closed");
    this.refs["modal-container"].classList.remove("modal--closed");
    this.refs["modal-container"].classList.add("modal--opened");
  }

  public closeModal(): void {
    let targetNode = this.refs["content"];
    targetNode.innerHTML = "";

    this.style.visibility = "hidden";
    this.style.opacity = "0";

    this.refs["modal-close-btn"].classList.add("modal__close-btn--closed");
    this.refs["modal-container"].classList.add("modal--closed");
    this.refs["modal-container"].classList.remove("modal--opened");

    if (this.sharedState.components["nav-links"] && this.sharedState.components["nav-links"].refs["nav-items-modal"]) {
      this.sharedState.components["nav-links"].refs["nav-items-modal"].forEach((navItem: HTMLButtonElement) => {
        navItem.classList.remove("nav__link--active");
      });
    }
  }

  public checkModal(event: MouseEvent): void {
    if (!event.target["matches"](".modal") && !event.target["matches"](".modal *")) {
      this.closeModal();
    }
  }

  public closeModalOnEsc(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.closeModal();
    }
  }
}
