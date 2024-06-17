import { ReactiveElement } from "../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!./styles/PlantTrees.scss";
// @ts-ignore
import svg1 from "@/assets/images/1.svg";
// @ts-ignore
import svg2 from "@/assets/images/2.svg";
// @ts-ignore
import svg3 from "@/assets/images/3.svg";
// @ts-ignore
import certBlank from "@/assets/images/cert-blank.svg";
// @ts-ignore
import imgBlack from "@/assets/images/BG.jpg";
// @ts-ignore
import imgColor from "@/assets/images/BG Black.jpg";
import RangeSlider2 from "./CustomRange";
import NavLang from "../Header/components/NavLang";
import { Watcher } from "../../plugins/ReactiveElement/Classes/ReactiveElement";
import ModalWindow from "../Global/Modal/ModalWindow";

/**
 * TASKS:
 * 1. NEED TO CREATE IMAGE SLIDER OR ANIMATION
 */

@DefineComponent({
  tag: "plant-trees-view",
  template: /*html*/`
    <div>
      <section class="donat-section container-page">
        <h2 class="donat-section__title" ref-data="selectedContent.title"></h2>

        <!-- ANIMATION COMPONENT WILL BE HERE -->

        <div class="donat-section__image-slider mb-32">

          <div class="img-comparer mb-32">
            <img class="img-comparer__picture" ref="image-1" src="${imgColor}">
            <img class="img-comparer__picture" ref="image-2" src="${imgBlack}">
          </div>

          <div class="img-slider mb-32" ref="img-slider-container"></div>

          <div class="img-counter" ref="img-counter-container">
            <div class="img-counter__btns">
              <button class="img-counter__btn img-counter__btn--decrease" ref="btn-decrement">-</button>
              <input class="img-counter__input-number" ref="input-number" type="number" ref-min="min" ref-max="max" ref-step="plusMinusStep" ref-value="value" />
              <button class="img-counter__btn img-counter__btn--increase" ref="btn-increment">+</button>
            </div>
            <div class="img-counter__payment-amount">
              <span class="img-counter__payment-amount__for-text" ref-data="selectedContent.forText"></span>
              <span class="img-counter__payment-amount__number" ref-data="overallCost"></span>
              <span class="img-counter__payment-amount__som-text" ref-data="selectedContent.somText"></span>
            </div>
          </div>

        </div>

        <!-- END OF ANIMATION COMPONENT -->

        <div class="donat-section__notice donat-notice">
          <p class="donat-notice__text mb-0" ref-data="selectedContent.donat.title"></p>
          <button type="button" class="donat-notice__button" ref-data="selectedContent.donat.btnTitle"></button>
        </div>
      </section>

      <section class="donat-cert container-page">
        <div class="donat-cert__content">
          <h3 class="donat-cert__title donat-mid-title" ref-data="selectedContent.certificate.title"></h3>
          <p class="donat-cert__text" ref-data="selectedContent.certificate.description"></p>
          <div class="donat-cert__input-wrap">
            <label for="cert-name" class="donat-cert__label" ref-data="selectedContent.certificate.label"></label>
            <input type="text" class="donat-cert__input" ref-placeholder="selectedContent.certificate.placeholder" id="cert-name">
          </div>
        </div>

        <div class="donat-cert__image-wrap">
          <img src="${certBlank}" alt="certificate" width="300" height="432">
        </div>
      </section>

      <section class="donat-pay container-page">
        <h3 class="donat-pay__title donat-mid-title" ref-data="selectedContent.payment.title"></h3>

        <div class="donat-pay__split">
          <div class="pay-info">
            <table class="pay-info__table">
              <tbody>
              <tr>
                <td ref-data="selectedContent.payment.block1.labelPayment"></td>
                <td><span ref-data="value"></span> <span ref-data="selectedContent.treeText"></td>
              </tr>
              <tr>
                <td ref-data="selectedContent.payment.block1.labelCertificate"></td>
                <td ref-data="selectedContent.payment.block1.labelCertificateType"></td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td ref-data="selectedContent.payment.block1.labelOverall"></td>
                <td><span ref-data="overallCost"></span> <span ref-data="selectedContent.somText"></span></td>
              </tr>
              </tfoot>
            </table>
          </div>

          <form class="pay-form">
            <div class="pay-form__item">
              <label for="pay-name" class="pay-form__label" ref-data="selectedContent.payment.block2.labelFullname"></label>
              <input type="text" ref-placeholder="selectedContent.payment.block2.labelFullnamePlaceholder" class="pay-form__input" id="pay-name">
            </div>
            <div class="pay-form__item">
              <label for="pay-phone" class="pay-form__label" ref-data="selectedContent.payment.block2.labelPhone">Ваш телефон</label>
              <input type="tel" ref-placeholder="selectedContent.payment.block2.labelPhonePlaceholder" class="pay-form__input" id="pay-phone">
            </div>
            <div class="pay-form__item">
              <label for="pay-mail" class="pay-form__label" ref-data="selectedContent.payment.block2.labelEmail">Ваша электронная почта</label>
              <input type="tel" ref-placeholder="selectedContent.payment.block2.labelEmailPlaceholder" class="pay-form__input" id="pay-mail">
            </div>

            <button type="button" class="pay-form__submit" ref="pay-form-btn" ref-data="selectedContent.payment.block2.submitBtn">Перейти к оплате</button>
          </form>
        </div>
      </section>

      <section class="donat-result container-page">
        <h3 class="donat-result__title donat-mid-title"></h3>
        <ul class="dlist pl-0 donat-result__list">
          <li>
            <img src="${svg1}" alt="Посаженные деревья" width="420" height="400">
            <strong>
              <span ref-data="selectedContent.achievements.1.treeCount"></span>
              <span ref-data="selectedContent.achievements.1.label"></span>
            </strong>
            <p ref-data="selectedContent.achievements.1.description"></p>
          </li>
          <li>
            <img src="${svg2}" alt="Люди" width="400" height="400">
            <strong>
              <span ref-data="selectedContent.achievements.2.peopleCount"></span>
              <span ref-data="selectedContent.achievements.2.label"></span>
            </strong>
            <p ref-data="selectedContent.achievements.2.description"></p>
          </li>
          <li>
            <img src="${svg3}" alt="Деревья" width="400" height="400">
            <strong>
              <span ref-data="selectedContent.achievements.3.ton"></span>
              <span ref-data="selectedContent.achievements.3.label"></span>
            </strong>
            <p ref-data="selectedContent.achievements.3.description"></p>
          </li>
        </ul>
      </section>
    </div>
  `
})
export default class PlantTreesView extends ReactiveElement {
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
    min: 0,
    max: 1000,
    step: 1,
    value: 0,
    plusMinusStep: 1,
    costPerTree: 30000, // som's
    overallCost: 0,
    insetValue: 0,
    contents: {
      ru: {
        title: "Сколько деревьев следует посадить?",
        forText: "",
        somText: "сум",
        treeText: "деревьев",
        donat: {
          title: "Если отчет о посаженных деревьях не нужен, но вы хотите поддержать нас, вы можете сделать пожертвование для нашего проекта.",
          btnTitle: "Сделать пожертвование"
        },
        certificate: {
          title: "Электронный сертификат",
          description: "Сертификат активируется после передачи в дар 3-х деревьев.",
          label: "Ваше имя для сертификата",
          placeholder: "Введите имя"
        },
        payment: {
          title: "Оплата",
          block1: {
            labelPayment: "Вы оплачиваете посадку:",
            labelCertificate: "Сертификат:",
            labelCertificateType: "Электронный вид",
            labelOverall: "Итого:"
          },
          block2: {
            labelFullname: "Ф.И.О",
            labelFullnamePlaceholder: "Введите Ф.И.О",
            labelPhone: "Ваш телефон",
            labelPhonePlaceholder: "+998",
            labelEmail: "Ваша электронная почта",
            labelEmailPlaceholder: "Введите электронную почту",
            submitBtn: "Перейти к оплате"
          }
        },
        achievements: {
          1: {
            treeCount: 0,
            label: "деревьев",
            description: "Посажены в 2015-2021 гг. В рамках программы «Зеленое дыхание» с компаниями-партнерами в Ташкенте сделано вместе."
          },
          2: {
            peopleCount: 0,
            label: "человек",
            description: "Резиденты проекта «Зеленое дыхание» Наш стиль онлайн, не выходя из дома используя наш сервис поддерживается"
          },
          3: {
            ton: 0,
            label: "тонн",
            description: "Углекислый газ SO2 покрыт посадками деревьев"
          }
        }
      },
      oz: {
        title: "Nechta daraxt ekish kerak?",
        forText: "uchun",
        somText: "so'm",
        treeText: "daraxt",
        donat: {
          title: "Agar ekilgan daraxtlar haqida hisobot kerak bo'lmasa, lekin qo'llab-quvvatlashni xohlasangiz, bizning loyihamizga xayriya qilishingiz mumkin.",
          btnTitle: "Xayriya qilish"
        },
        certificate: {
          title: "Elektron sertifikat",
          description: "Sertifikat 3 ta daraxtni hadya qilgandan keyin faollashtiriladi.",
          label: "Sertifikat uchun ismingiz",
          placeholder: "Ismni kiriting"
        },
        payment: {
          title: "To'lov",
          block1: {
            labelPayment: "Siz ekish uchun to'laysiz:",
            labelCertificate: "Sertifikat:",
            labelCertificateType: "Elektron ko'rinish",
            labelOverall: "Jami:"
          },
          block2: {
            labelFullname: "F.I.O",
            labelFullnamePlaceholder: "F.I.O kiriting",
            labelPhone: "Sizning telefoningiz",
            labelPhonePlaceholder: "+998",
            labelEmail: "Sizning elektron pochtangiz",
            labelEmailPlaceholder: "Elektron pochtani kiriting",
            submitBtn: "To'lovga o'tish"
          }
        },
        achievements: {
          1: {
            treeCount: 0,
            label: "daraxtlar",
            description: "2015-2021 yillarda ekilgan. «Yashil Makon» dasturi doirasida hamkor kompaniyalar bilan Toshkentda birgalikda amalga oshirilgan."
          },
          2: {
            peopleCount: 0,
            label: "odamlar",
            description: "«Yashil Makon» loyihasi rezidentlari. Bizning uslub onlayn, uyda o‘tirib, bizning xizmatimiz yordamida qo‘llab-quvvatlanadi."
          },
          3: {
            ton: 0,
            label: "tonna",
            description: "Daraxt ekishlar orqali SO2 karbonat angidrid qoplangan"
          }
        }
      },
      uz: {
        title: "Нечта дарахт экиш керак?",
        forText: "учун",
        somText: "сўм",
        treeText: "дарахт",
        donat: {
          title: "Агар экилган дарахтлар ҳақида ҳисобот керак бўлмаса, лекин қўллаб-қувватлашни хоҳласангиз бизнинг лойиҳамиз хайрия қилишингиз мумкин.",
          btnTitle: "Хайрия қилиш"
        },
        certificate: {
          title: "Электрон сертификат",
          description: "Сертификат 3 та дарахтни ҳадя қилгандан кейin фаоллаштирилади.",
          label: "Сертификат учун исмингиз",
          placeholder: "Исмни киритинг"
        },
        payment: {
          title: "Тўлов",
          block1: {
            labelPayment: "Сиз экиш учун тўлайсиз:",
            labelCertificate: "Сертификат:",
            labelCertificateType: "Электрон кўриниш",
            labelOverall: "Жами:"
          },
          block2: {
            labelFullname: "Ф.И.О",
            labelFullnamePlaceholder: "Ф.И.О киритинг",
            labelPhone: "Сизнинг телефонингиз",
            labelPhonePlaceholder: "+998",
            labelEmail: "Сизнинг электрон почтангиз",
            labelEmailPlaceholder: "Электрон почтани киритинг",
            submitBtn: "Тўловга ўтиш"
          }
        },
        achievements: {
          1: {
            treeCount: 0,
            label: "дарахтлар",
            description: "2015-2021 йилларда экилган. «Яшил Макон» дастури доирасида ҳамкор компаниялар билан Тошкентда биргаликда амалга оширилган."
          },
          2: {
            peopleCount: 0,
            label: "одамлар",
            description: "«Яшил Макон» лойиҳаси резидентлари. Бизнинг услуб онлайн, уйда ўтириб, бизнинг хизматимиз ёрдамида қўллаб-қувватланади."
          },
          3: {
            ton: 0,
            label: "тонна",
            description: "Дарахт экишлар орқали SO2 карбонат ангидрид қопланган"
          }
        }
      }
    },
    selectedContent: {}
  }

  public watch: Watcher = {
    "value": (newValue: number) => {
      if (newValue >= 1000) {
        this.refProxy["value"] = 1000;
        this.refs["btn-increment"].setAttribute("disabled", "");
      } else {
        this.refProxy["value"] = Math.min(this.refProxy["max"], newValue);
        this.refProxy["value"] = Math.max(this.refProxy["min"], newValue);
        this.refs["btn-increment"].removeAttribute("disabled");
      }

      this.refProxy["overallCost"] = this.refProxy["value"] * this.refProxy["costPerTree"];
      this.refs["input-number"]["value"] = this.refProxy["value"];

      this.components["img-range-slider"].refs["range"]["value"] = this.refProxy["value"];
      this.components["img-range-slider"]["updateProgress"]();
      this.components["img-range-slider"]["updateValueNode"]();

      // this.refProxy["insetValue"] = (this.refProxy["value"] / this.refProxy["max"]) * 100;
      this.refProxy["insetValue"] = (this.refProxy["value"] / 100) * 100;

      // in case if value is more than 100, something like 1000
      // if (this.refProxy["value"] >= 100) {
      //   this.refProxy["plusMinusStep"] = 100;
      // } else {
      //   this.refProxy["plusMinusStep"] = 1;
      // }
    },
    "insetValue": () => {
      this.updateImageInset();
    },
    "overallCost": (newValue: number) => {
      this.refProxy["overallCost"] = newValue.toLocaleString();
    }
  }

  public components: Record<string, ReactiveElement> = {
    "img-range-slider": new RangeSlider2({
      min: 0,
      max: 100,
      step: 1,
      value: 0,
      callback: () => {
        this.refProxy["value"] = this.components["img-range-slider"].refProxy["value"];
        this.refs["input-number"]["value"] = this.refProxy["value"];
      }
    })
  }

  public customRangeSlider: RangeSlider2;

  public onConnected(): void {
    this.refs["img-slider-container"].appendChild(this.components["img-range-slider"]);
    this.refs["image-1"].style.clipPath = `inset(0 0 0 ${this.refProxy["insetValue"]}%)`;

    this.sharedState.getComponent<NavLang | NavLang[]>("nav-lang")
      .then((component: NavLang | NavLang[]) => {
        if (Array.isArray(component)) {
          component[0].updateComponentLanguage<PlantTreesView>(this);
        } else if (component instanceof NavLang) {
          component.updateComponentLanguage<PlantTreesView>(this);
        }
      })
      .catch((err) => console.error(err));
  }

  public events(): void {
    this.eventHandler.subscribe("input-number", "input-number-event", "input", (event: InputEvent) => {
      let inputNumber: HTMLInputElement = event.target as HTMLInputElement;
      let value: number = Number(inputNumber.value);

      if (value >= 1000) {
        value = 1000;
      }

      inputNumber.value = String(value);

      this.refProxy["value"] = value;
      this.updateSlider();
    });

    this.eventHandler.subscribe("btn-decrement", "decrement-event", "click", () => {
      if (this.refProxy["value"] <= 100) {
        this.refProxy["plusMinusStep"] = 1;
      }

      this.refProxy["value"] -= this.refProxy["plusMinusStep"];
      this.updateSlider();
    });

    this.eventHandler.subscribe("btn-increment", "inrement-event", "click", () => {
      this.refProxy["value"] += this.refProxy["plusMinusStep"];
      this.updateSlider();
    });

    this.eventHandler.subscribe("pay-form-btn", "pay-form-event", "click", () => {
      this.sharedState.getComponent<ModalWindow>("modal-window")
        .then((modalWindow: ModalWindow) => {
          modalWindow.openModal("modal-pay-form");
          modalWindow.refProxy["width"] = 600;
        })
        .catch((err) => console.error(err));
    });
  }

  public updateSlider(): void {
    this.components["img-range-slider"].refs["range"]["value"] = this.refProxy["value"];
    this.components["img-range-slider"]["updateProgress"]();
    this.components["img-range-slider"]["updateValueNode"]();
  }

  public updateImageInset(): void {
    this.refs["image-1"].style.clipPath = `inset(0 0 0 ${this.refProxy["insetValue"]}%)`;
  }
}
