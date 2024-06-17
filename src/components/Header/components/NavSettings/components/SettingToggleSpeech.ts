import { ReactiveElement } from "../../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ToggleElement from "../../../../Global/ToggleElement";
import { Watcher } from "../../../../../plugins/ReactiveElement/Classes/ReactiveElement";
// @ts-ignore
import sass from "!css-loader!sass-loader!../styles/SettingToggleSpeech.scss";

@DefineComponent({
  tag: "setting-toggle",
  template: /*html*/`
    <div class="container">
      <label for="toggle-state" ref="toggle-label" ref-data="selectedContent.label" ref-speech></label>
    </div>
  `
})
export default class SettingToggleSpeech extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: {
        sass,
        links: ["margins"]
      },
      speechAPI: true
    });
  }

  public data: {} = {
    "toggle-is-rendered": false,
    "enable-speech": false,
    "contents": {
      "ru": {
        "label": "Проигрыватель экрана"
      },
      "oz": {
        "label": "Ekran pleer"
      },
      "uz": {
        "label": "Экран плеер"
      }
    },
    "selectedContent": {}
  }

  public watch: Watcher = {
    "enable-speech": (newValue: boolean) => {
      this.toggleSpeechAPI(newValue);
    }
  }

  public components: Record<string, ReactiveElement> = {
    "toggle-element": new ToggleElement(() => {
      this.refProxy["enable-speech"] = this.components["toggle-element"].refProxy["isActive"];
    })
  }

  public onConnected(): void {
    if (!this.refProxy["toggle-is-rendered"]) {
      this.components["toggle-element"].classList.add("mr-16");
      this.refs["toggle-label"].insertAdjacentElement("beforebegin", this.components["toggle-element"]);
      this.refProxy["toggle-is-rendered"] = true;
    }

    this.toggleSpeechAPI(this.refProxy["enable-speech"]);
  }

  public toggleSpeechAPI(value: boolean): void {
    for (const [key] of Object.entries(this.sharedState.components)) {
      this.sharedState.getComponent(key)
        .then((component: ReactiveElement) => {
          if (component.speechSynthesisHandler) {
            if (value) {
              component.speechSynthesisHandler.observeElementsToRead();
            } else {
              component.speechSynthesisHandler.removeEvents();
            }
          }
        })
        .catch((err) => console.error(err));
    }
  }
}
