import { ReactiveElement } from "../../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!../styles/SettingSelectColor.scss";

@DefineComponent({
  tag: "setting-select-color",
  template: /*html*/`
    <div class="change-colors-block">
      <button class="change-color-theme change-color-theme--default" type="button" ref-data="selectedContent.colorful" ref-speech></button>
      <button class="change-color-theme change-color-theme--gray" type="button" ref-data="selectedContent.grey" ref-speech></button>
      <button class="change-color-theme change-color-theme--dark" type="button" ref-data="selectedContent.dark" ref-speech></button>
    </div>
  `
})
export default class SettingSelectColor extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: {
        sass
      },
      speechAPI: true
    });
  }

  public data: {} = {
    "contents": {
      "ru": {
        "colorful": "Цветной",
        "grey": "Серый",
        "dark": "Темный"
      },
      "oz": {
        "colorful": "Standart",
        "grey": "Kulrang",
        "dark": "Qora rang"
      },
      "uz": {
        "colorful": "Стандарт",
        "grey": "Кулранг",
        "dark": "Қоронги"
      }
    },
    "selectedContent": {}
  }
}
