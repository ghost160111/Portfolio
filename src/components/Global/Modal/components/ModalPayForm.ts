// @ts-ignore
import sass from "!css-loader!sass-loader!./ModalPayForm.scss";
import { ReactiveElement } from "../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ModalWindow from "../ModalWindow";
import ModalBase from "./ModalBase";

const TEMPLATE: string = /*html*/`
  <div class="wrapper">
    <h2 ref-data="selectedContent.title"></h2>
  </div>
`;

@DefineComponent({
  tag: "modal-pay-form",
})
export default class ModalPayForm extends ModalBase {
  constructor() {
    super({
      template: TEMPLATE,
      styles: {
        sass
      }
    });
  }

  public data: {} = {
    contents: {
      ru: {
        title: "Мы рады что вы проявили интерес к сервису. В данный момент пожертвования приостановлены. Мы обещаем что скоро все заработает. Спасибо за понимание!"
      },
      oz: {
        title: "Biz xizmatimizga qiziqish bildirganingizdan xursandmiz. Hozirgi vaqtda ehsonlar to'xtatilgan. Yaqinda hammasi yana ishga tushishini va'da qilamiz. Tushunganingiz uchun rahmat!"
      },
      uz: {
        title: "Биз хизматимизга қизиқиш билдирганингиздан хурсандмиз. Ҳозирги вақтда эҳсонлар тўхтатилган. Яқинда ҳаммаси яна ишга тушишини ваъда қиламиз. Тушунганингиз учун раҳмат!"
      }
    },
    selectedContent: {}
  }

  public onConnected(): void {
    this.updateModalSize();
    this.updateLanguage<ModalPayForm>(this);
  }

  public onDisconnected(): void {
    this.modalWindow.refProxy["height"] = "90%";
    this.modalWindow.refProxy["width"] = "80%";
  }

  public updateModalSize(): void {
    this.getModalWindow(() => {
      this.modalWindow.refProxy["height"] = 300;
      this.modalWindow.refProxy["width"] = 600;
    });
  }
}
