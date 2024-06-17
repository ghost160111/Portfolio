import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import "./NavSettings/NavSettingsLayers";
import "./NavSettings/NavSettingsAccessibility";
import "./NavSearch";
// @ts-ignore
import sass from "!css-loader!sass-loader!../styles/NavSettings.scss";
import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";

@DefineComponent({
  tag: "nav-settings",
  template: /*html*/`
    <div class="settings-wrapper">
      <ul class="settings-list" ref="settings-list">
        <li>
          <button class="settings-item" ref="setting-item" setting-type="layers"></button>
          <svg ref="setting-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 22.6401L15.9867 28.0001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15.9867 28.0001L4 22.6401" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M28 16L15.9867 21.36" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15.9867 21.36L4 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 9.36533L15.9827 14.732L28 9.36533L16.0173 4L4 9.36533Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <div class="settings__overlay" ref="overlay" overlay-type="layers">
            <div class="settings__overlay__arrow"></div>
            <nav-settings-layers></nav-settings-layers>
          </div>
        </li>
        <li>
          <button class="settings-item" ref="setting-item" setting-type="accessibility"></button>
          <svg ref="setting-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.0003 18.6674C10.9027 16.8889 7.09368 16.8889 3.99609 18.6674" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M10.6655 7.19898L9.47007 6.80048C8.75352 6.56163 7.9693 6.63772 7.31203 7.00986C6.65476 7.382 6.18604 8.01532 6.02219 8.75264L4.12315 17.2983C4.0387 17.6784 3.99609 18.0665 3.99609 18.4558V21.3353C3.99609 23.5454 5.7877 25.337 7.99776 25.337H9.71181C11.7677 25.337 13.489 23.7792 13.6936 21.7335L14.0003 18.6675" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M21.3367 7.19898L22.5321 6.80048C23.2487 6.56163 24.0329 6.63772 24.6902 7.00986C25.3475 7.382 25.8162 8.01532 25.98 8.75264L27.8791 17.2983C27.9635 17.6784 28.0061 18.0665 28.0061 18.4558V21.3353C28.0061 23.5454 26.2145 25.337 24.0045 25.337H22.2904C20.2345 25.337 18.5132 23.7792 18.3086 21.7335L18.002 18.6675" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M14 18.6674C15.1856 17.7781 16.816 17.7781 18.0016 18.6674" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M28.0061 18.6674C24.9085 16.8889 21.0995 16.8889 18.002 18.6674" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <div class="settings__overlay" ref="overlay" overlay-type="accessibility">
            <div class="settings__overlay__arrow"></div>
            <nav-settings-accessibility></nav-settings-accessibility>
          </div>
        </li>
        <li>
          <button class="settings-item" ref="setting-item" setting-type="search"></button>
          <nav-search></nav-search>
          <div class="settings__overlay" ref="overlay" overlay-type="search">
            <div class="settings__overlay__arrow"></div>
          </div>
        </li>
      </ul>
    </div>
  `
})
export default class NavSettings extends ReactiveElement {
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
  }

  public data: {} = {
    searchIsActive: false,
  }

  public watch: Watcher = {
    "searchIsActive": (newValue: boolean) => {
      return (newValue)
        ? this.components["search"].show()
        : this.components["search"].hide();
    }
  }

  public events(): void {
    this.eventHandler.subscribe("setting-item", "settings-event", "click", this.selectSettingsItem);
    this.eventHandler.subscribe(window, "click-outside-event", "click", this.windowClickOutside);
  }

  public selectSettingsItem(event: any): void {
    this.removeActiveClassHandler();
    event.target.classList.add("active");

    this.refs["overlay"].forEach((item) => {
      if (item.getAttribute("overlay-type") === event.target.getAttribute("setting-type")) {
        item.classList.add("active");
      }
    });
  }

  public removeActiveClassHandler(): void {
    this.refs["setting-item"].forEach((item: HTMLButtonElement) => item.classList.remove("active"));
    this.refs["overlay"].forEach((item: HTMLDivElement) => item.classList.remove("active"));
  }

  public windowClickOutside(event: any): void {
    if (!event.target.matches("nav-settings")) {
      this.removeActiveClassHandler();
    }
  }

  public rootClickOutside(event: any): void {
    if (!event.target.matches(".settings-item") && !event.target.matches(".settings__overlay") && !event.target.matches(".settings__overlay *")) {
      this.removeActiveClassHandler();
    }
  }
}
