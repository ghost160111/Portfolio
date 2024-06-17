import { ReactiveElement } from "../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import SettingSlider from "./components/SettingSlider";
// import SettingToggleSpeech from "./components/SettingToggleSpeech";
// import SettingSelectColor from "./components/SettingSelectColor";
// @ts-ignore
import sass from "!css-loader!sass-loader!./styles/NavSettingsAccessibility.scss";

@DefineComponent({
  tag: "nav-settings-accessibility",
  template: /*html*/ `
    <div class="container" ref="container">
      <div class="container__item mb-24">
        <h3 class="mb-12" ref-data="selectedContent.title"></h3>
      </div>
      <div class="container__item" ref="select-font-size"></div>
      <!-- <div class="container__item mb-16" ref="toggle-speech"></div>
      <div class="container__item" ref="select-color"></div> -->
    </div>
  `,
})
export default class NavSettingsAccessibility extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true,
      },
      styles: {
        sass,
        links: ["margins"],
      },
    });
  }

  public components: Record<string, ReactiveElement> = {
    "setting-slider": new SettingSlider(),
    // "setting-toggle-speech": new SettingToggleSpeech(),
    // "setting-select-color": new SettingSelectColor()
  };

  public data: {} = {
    "rendered-components": false,
    contents: {
      ru: {
        title: "Размер шрифта",
      },
      oz: {
        title: "Shrift hajmi",
      },
      uz: {
        title: "Шрифт хажми",
      },
    },
    selectedContent: {},
  };

  public onConnected(): void {
    if (!this.refProxy["rendered-components"]) {
      this.components["setting-slider"].classList.add("mb-24");
      // this.components["setting-toggle-speech"].classList.add("mb-16");

      this.refs["select-font-size"].appendChild(
        this.components["setting-slider"]
      );
      // this.refs["toggle-speech"].appendChild(this.components["setting-toggle-speech"]);
      // this.refs["select-color"].appendChild(this.components["setting-select-color"]);
    }
  }
}
