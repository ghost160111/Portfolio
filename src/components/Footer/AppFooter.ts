import { ReactiveElement } from "../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../plugins/ReactiveElement/Decorators/DefineComponent";
import ModalWindow from "../Global/Modal/ModalWindow";
// @ts-ignore
import sass from "!!css-loader!sass-loader!./styles/AppFooter.scss";
// @ts-ignore
import textImg from "@/assets/images/toshkent_shahar_text.svg";
// @ts-ignore
import iconImg from "@/assets/images/toshkent_shahar_icon.png";
// @ts-ignore
import zamin from "@/assets/images/zamin-icon.svg";
// @ts-ignore
import dtash from "@/assets/images/dtash-icon.svg";
// @ts-ignore
import fLogo from "@/assets/images/footer-logo.png";
// @ts-ignore
import fLogo2 from "@/assets/images/footer-logo2.png";

export interface AppFooterProps {
  placeOnTheLeft?: boolean;
  orderNavMobile?: boolean;
}

@DefineComponent({
  tag: "app-footer",
  template: /*html*/ `
    <div class="footer-wrapper" ref="wrapper">
      <ul class="footer__link-list" ref="link-list">
        <li>
          <div class="footer__link-item">
            <div class="footer__link-img-multiple">
              <img class="footer__link-img" src="${iconImg}" alt="Shahar Hokimiat" />
              <img class="footer__link-img" src="${textImg}" alt="Text" />
            </div>
            <a class="footer__link footer__link--hidden footer__link--cover-size" href="https://www.tashkent.uz/" target="_blank" title="Shahar Hokimiat">Shahar Hokimiat</a>
          </div>
        </li>
        <li>
          <div class="footer__link-item">
            <img class="footer__link-img" src="${dtash}" alt="Digital Tashkent" />
            <a class="footer__link footer__link--hidden footer__link--cover-size" href="https://digitaltashkent.uz/" target="_blank" title="Digital Tashkent">Digital Tashkent</a>
          </div>
        </li>
        <li>
          <div class="footer__link-item">
            <img class="footer__link-img" src="${zamin}" alt="Zamin Foundation" />
            <a class="footer__link footer__link--hidden footer__link--cover-size" href="https://zaminfoundation.ngo/en" target="_blank" title="Zamin Foundation">Zamin Foundation</a>
          </div>
        </li>
        <li>
          <div class="footer__link-item">
            <img class="footer__link-img" src="${fLogo}" alt="Green Tree" />
            <a class="footer__link footer__link--hidden footer__link--cover-size" href="#green-tree" target="_blank" title="Footer Link 1">Green Tree</a>
          </div>
        </li>
        <li>
          <div class="footer__link-item">
            <img class="footer__link-img" src="${fLogo2}" alt="Footer Link" />
            <a class="footer__link footer__link--hidden footer__link--cover-size" href="#footer-link" target="_blank" title="Footer Link 2">Footer Link</a>
          </div>
        </li>
        <li>
          <div class="footer__link-item">
            <span class="footer__link-text" ref-data="current-year">© GreenTashkent 2022</span>
            <a class="footer__link footer__link--underline privacy-politics" href="javascript:void(0)" ref="footer-link" ref-data="selectedContent.f-link"></a>
          </div>
        </li>
      </ul>
    </div>
  `,
})
export default class AppFooter extends ReactiveElement {
  constructor(props?: AppFooterProps) {
    super({
      styles: {
        sass,
      },
      animations: {
        setOpacityAnimation: true,
      },
      shadowDOM: true,
      props,
    });
  }

  public data: {} = {
    "f-link": "Политика конфиденциальности",
    "footer-text": "© GreenTashkent",
    "current-year": "",
    contents: {
      ru: {
        "f-link": "Политика конфиденциальности",
      },
      oz: {
        "f-link": "Maxfiy siyosat",
      },
      uz: {
        "f-link": "Маҳфий сиёсат",
      },
    },
    selectedContent: {},
  };

  public onConnected(): void {
    let year = new Date().getFullYear();
    this.refProxy["current-year"] = this.refProxy["footer-text"] + " " + year;

    if (this.props) {
      if (this.props["placeOnTheLeft"]) {
        this.refs["link-list"].classList.add("footer__link-list--flex-start");
      }

      if (this.props["orderNavMobile"]) {
        this.refs["link-list"].classList.add(
          "footer__link-list--order-nav-mobile"
        );
      }
    }
  }

  public events(): void {
    this.eventHandler.subscribe(
      "footer-link",
      "footer-link-click-event",
      "click",
      this.openModal
    );
  }

  public openModal(): void {
    let modalWindow: ModalWindow = this.sharedState.components["modal-window"];
    modalWindow.openModal("modal-policy");
  }
}
