// @ts-ignore
import sass from "!css-loader!sass-loader!../styles/NavLang.scss";
import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";

@DefineComponent({
  tag: "nav-lang",
  template: /*html*/`
    <div class="nav__lang">
      <button class="lang__lang-selected focus-visible" type="button" title="Выберите язык" ref="toggle-btn">Ру</button>
      <ul class="lang__lang-list" ref="lang-list">
        <li><button ref="lang-item" class="lang-list__item mb-16" href="javascript:void(0)" lang="ru" id="ru" prefix-name="Ру">Русский</button></li>
        <li><button ref="lang-item" class="lang-list__item mb-16" href="javascript:void(0)" lang="uz" id="uz" prefix-name="Ўз">Ўзбекча</button></li>
        <li><button ref="lang-item" class="lang-list__item" href="javascript:void(0)" lang="oz" id="oz" prefix-name="O’z">O’zbekcha</button></li>
      </ul>
    </div>
  `
})
export default class NavLang extends ReactiveElement {
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
    selectedLang: localStorage.getItem("lang") ?? "ru",
    listIsActive: false,
    mouseEntered: false,
    html: document.querySelector("html")
  }

  public watch: Watcher = {
    "listIsActive": (newValue: boolean) => {
      return (newValue) ? this.openDropdown() : this.closeDropdown();
    }
  }

  public onConnected(): void {
    this.updateApplication(this.refProxy["selectedLang"]);
  }

  public events(): void {
    this.eventHandler.subscribe("toggle-btn", "toggle-event", "click", this.toggleDropdown);
    this.eventHandler.subscribe("lang-item", "lang-change-event", "click", this.selectLanguage);
    this.eventHandler.subscribe(window, "window-outside-click", "click", this.windowClickOutside);
  }

  public toggleDropdown(): void {
    this.refProxy["listIsActive"] = !this.refProxy["listIsActive"];
  }

  public selectLanguage(event: MouseEvent): void {
    this.updateApplication(event.target["lang"]);
  }

  public updateLangComponents = (lang: string) => {
    this.sharedState.getComponent("nav-lang")
      .then((component: NavLang | NavLang[]) => {
        if (Array.isArray(component)) {
          component.forEach((navLang: NavLang) => {
            if (navLang.refs["lang-item"]) {
              this.updateSelectedInDOM(navLang, lang);
            }
          });
        } else if (component instanceof NavLang) {
          let navLang: NavLang = component;
          this.updateSelectedInDOM(navLang, lang);
        }
      })
      .catch((err) => console.error(err));
  }

  public updateApplication(lang: string): void {
    document.body.animate(
      [ { opacity: 0 }, { opacity: 1 } ],
      { duration: 1000, easing: "ease-in-out" }
    );

    if (this.refProxy["html"].lang !== lang) {
      this.refProxy["html"].lang = lang;
    }

    if (localStorage.getItem("lang") !== lang) {
      localStorage.setItem("lang", lang);
    }

    for (const [key] of Object.entries(this.sharedState.components)) {
      this.sharedState.getComponent(key)
        .then((promisedComponent: ReactiveElement | ReactiveElement[]) => {
          if (!promisedComponent) {
            throw "No component with this key: " + key;
          }

          if (Array.isArray(promisedComponent) && promisedComponent.length > 0) {
            promisedComponent.forEach((pComponent) => {
              if (pComponent instanceof ReactiveElement) {
                pComponent.lang = lang;

                if (pComponent.refProxy["selectedContent"] && pComponent.refProxy["contents"][lang]) {
                  pComponent.refProxy["selectedContent"] = pComponent.refProxy["contents"][lang];
                }
              }
            });
          }

          if (promisedComponent instanceof ReactiveElement) {
            promisedComponent.lang = lang;

            if (promisedComponent.refProxy["selectedContent"] && promisedComponent.refProxy["contents"][lang]) {
              promisedComponent.refProxy["selectedContent"] = promisedComponent.refProxy["contents"][lang];
            }
          }
        })
        .catch((err) => {
          if (this.devMode) {
            console.error(err);
          }
        });
    }

    this.updateLangComponents(lang);
  }

  public updateComponentLanguage<T>(component: T) {
    if (component instanceof ReactiveElement && component.refProxy["selectedContent"] && component.refProxy["contents"][component.lang]) {
      component.refProxy["selectedContent"] = component.refProxy["contents"][component.lang];
    }
  }

  public openDropdown(): void {
    this.refs["toggle-btn"].classList.add("active");
    this.refs["lang-list"].classList.add("active");
  }

  public closeDropdown(): void {
    this.refs["toggle-btn"].classList.remove("active");
    this.refs["lang-list"].classList.remove("active");
  }

  public windowClickOutside(event: any): void {
    if (event.target !== this && !event.target.matches("initial-settings") && !event.target.matches("nav-links")) {
      this.refProxy["listIsActive"] = false;
    }
  }

  public updateSelectedInDOM(navLang: NavLang, lang: string): void {
    navLang.refs["lang-item"].forEach((item: HTMLButtonElement) => {
      item.classList.remove("lang-list__item--active")
      if (item.lang === lang) {
        navLang.refs["toggle-btn"].textContent = item.getAttribute("prefix-name");
        item.classList.add("lang-list__item--active");
      }
    });
  }
}
