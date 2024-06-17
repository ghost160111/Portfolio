// @ts-ignore
import sass from "!css-loader!sass-loader!./VolunteerShare.scss";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ModalBase from "./ModalBase";

const template: string = /*html*/`
  <div class="volunteer-item mt-16">
    <div class="volunteer-item__left">
      <img ref-src="imgURL" alt="Volunteer picture" />
    </div>
    <div class="volunteer-item__right">
      <span class="volunteer-item__fullname mb-4" ref-data="name"></span>
      <span class="volunteer-item__planted-trees mb-4">
        <span class="mr-4" ref-data="treeQty"></span>
        <span ref-data="selectedContent.treeQtyLabel"></span>
      </span>
      <span class="volunteer-item__ranking-place mb-4">
        <span class="mr-4" ref-data="selectedContent.rankingText"></span>
        <span ref-data="ranking"></span>
      </span>
      <span class="volunteer-item__activity mb-4">
        <span class="mr-4" ref-data="selectedContent.activityText"></span>
        <span>
          <span class="mr-2" style="display:none;">30 дн.</span>
          <span ref-data="dateFrom">(с 01.01.2022)</span>
        </span>
      </span>
      <span class="volunteer-item__status" ref-data="selectedContent.inactive"></span>
    </div>
  </div>
  <div class="volunteer-link mt-24">
    <span class="volunteer-link__text mb-8" ref-data="selectedContent.copyText"></span>
    <div class="volunteer-link__copy">
      <input type="text" ref-value="copyLink" />
      <button type="button" ref-data="selectedContent.copyBtn"></button>
    </div>
  </div>
`;

@DefineComponent({
  tag: "volunteer-share"
})
export default class VolunteerShare extends ModalBase {
  constructor() {
    super({
      styles: {
        sass,
        links: ["margins"]
      },
      template
    });
  }

  public data: {} = {
    "name": "",
    "treeQty": 0,
    "dateFrom": "",
    "copyLink": "",
    contents: {
      ru: {
        "copyBtn": "Копировать",
        "copyText": "Копировать ссылку",
        "treeQtyLabel": "деревьев",
        "activityText": "Активность:",
        "inactive": "Не активен",
        "rankingText": "Место в рейтинге:"
      },
      oz: {
        "copyBtn": "Nusxalash",
        "copyText": "Havolani nusxalash",
        "treeQtyLabel": "daraxtlar",
        "activityText": "Faoliyat:",
        "inactive": "Faol emas",
        "rankingText": "Reytingdagi o'rin:"
      },
      uz: {
        "copyBtn": "Нусхалаш",
        "copyText": "Ҳаволани нусхалаш",
        "treeQtyLabel": "дарахтлар",
        "activityText": "Фаолият:",
        "inactive": "Фаол эмас",
        "rankingText": "Рейтингдаги ўрин:"
      }
    },
    selectedContent: {}
  }

  public onConnected(): void {
    this.updateModalSize();
    this.updateLanguage<VolunteerShare>(this);
  }

  public onDisconnected(): void {
    this.modalWindow.refProxy["height"] = "90%";
    this.modalWindow.refProxy["width"] = "80%";
  }

  public updateModalSize(): void {
    this.getModalWindow(() => {
      this.modalWindow.refProxy["height"] = 512;
      this.modalWindow.refProxy["width"] = 512;
    });
  }
}
