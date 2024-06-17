import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import routes from "./Routes";
import {
  Route,
  Routes,
} from "../../../plugins/ReactiveElement/Interfaces/IRoutes";
import { Watcher } from "../../../plugins/ReactiveElement/Classes/ReactiveElement";
import NavLogo from "./NavLogo";
import AppFooter from "../../Footer/AppFooter";
import { PlayFadeInAnimation } from "../../../plugins/ReactiveElement/Functions/PlayFadeInAnimation";
import NavLang from "./NavLang";
import NavLogin from "./NavLogin";
// @ts-ignore
import sass from "!css-loader!sass-loader!../styles/NavLinks.scss";
import PlantTreesReference from "../../Global/PlantTreesReference";
import AccorditionRight from "../../Global/Accordition/AccorditionRight";
import AccorditionLeft from "../../Global/Accordition/AccorditionLeft";
import ChangeMap from "../../Global/ChangeMap/ChangeMap";

export const TITLE: string = "Green Tashkent";

@DefineComponent({
  tag: "nav-links",
  template: /*html*/ `
    <nav class="nav-wrapper">
      <button class="nav__toggle-list-btn hidden" ref="menu-toggle-btn" type="button" ref-title="selectedContent.toggleBtnTitle" ref-data="selectedContent.toggleBtnTitle"></button>
      <ul class="nav__list">
        <li><a class="nav__link" ref-data="selectedContent.routeList.item-1.title" ref="nav-items" href="/plant-trees" is-route></a></li>
        <li><a class="nav__link" ref-data="selectedContent.routeList.item-2.title" ref="nav-items-modal" href="javascript:void(0)" modal-name="modal-about-project">О проекте</a></li>
        <li style="display:none"><a class="nav__link" ref-data="selectedContent.routeList.item-3.title" ref="nav-items-modal" href="javascript:void(0)" modal-name="modal-contacts">Обратная связь</a></li>
        <li style="display:none"><a class="nav__link" ref-data="selectedContent.routeList.item-4.title" ref="nav-items-modal" href="javascript:void(0)" modal-name="modal-infographics">Инфографика</a></li>
        <li><a class="nav__link" ref-data="selectedContent.routeList.item-5.title" ref="nav-items-modal" href="javascript:void(0)" modal-name="modal-volunteers">Волонтеры</a></li>
        <li><a class="nav__link" ref-data="selectedContent.routeList.item-6.title" ref="nav-items" href="/news" is-route>Новости</a></li>
      </ul>
      <div class="nav__mobile-wrapper" ref="mobile-wrapper">
        <div class="nav__mobile" ref="nav-mobile">
          <button class="nav__toggle-list-btn nav__toggle-list-btn--nav-mobile hidden" ref="menu-toggle-btn" type="button" ref-title="selectedContent.toggleBtnTitle" ref-data="selectedContent.toggleBtnTitle"></button>
          <div class="nav__mobile__logo mt-24" ref="logo"></div>
          <hr class="nav__mobile__hr">
          <ul class="nav__list nav__list--mobile" ref="nav-list-mobile">
            <li><a class="nav__link nav__link--mobile" ref-data="selectedContent.routeList.item-1.title" ref="nav-items" href="/plant-trees" is-route>Посадить деревья</a></li>
            <li><a class="nav__link nav__link--mobile" ref-data="selectedContent.routeList.item-2.title" ref="nav-items-modal" href="javascript:void(0)" modal-name="modal-about-project">О проекте</a></li>
            <li style="display:none;"><a class="nav__link nav__link--mobile" ref-data="selectedContent.routeList.item-3.title" ref="nav-items-modal" href="javascript:void(0)" modal-name="modal-contacts">Обратная связь</a></li>
            <li style="display:none;"><a class="nav__link nav__link--mobile" ref-data="selectedContent.routeList.item-4.title" ref="nav-items-modal" href="javascript:void(0)" modal-name="modal-infographics" style="display:none">Инфографика</a></li>
            <li><a class="nav__link nav__link--mobile" ref-data="selectedContent.routeList.item-5.title" ref="nav-items-modal" href="javascript:void(0)" modal-name="modal-volunteers">Волонтеры</a></li>
            <li><a class="nav__link nav__link--mobile" ref-data="selectedContent.routeList.item-6.title" ref="nav-items" href="/news" is-route>Новости</a></li>
          </ul>
          <hr class="nav__mobile__hr">
        </div>
      </div>
    </nav>
  `,
})
export default class NavLinks extends ReactiveElement {
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

    this.compileRouter();
  }

  public data: {} = {
    isMenuActive: false,
    routeMatched: false,
    componentsAreRendered: false,
    "opened-once": false,
    contents: {
      ru: {
        toggleBtnTitle: "Открыть навигационную панель",
        routeList: {
          "item-1": { title: "Посадить деревья" },
          "item-2": { title: "О проекте" },
          "item-3": { title: "Обратная связь" },
          "item-4": { title: "Инфографика" },
          "item-5": { title: "Волонтеры" },
          "item-6": { title: "Новости" },
        },
      },
      oz: {
        toggleBtnTitle: "Navigatsiya panelini ochish",
        routeList: {
          "item-1": { title: "Daraxtni ekish" },
          "item-2": { title: "Loyiha to‘g‘risidagi" },
          "item-3": { title: "Qayta aloqa" },
          "item-4": { title: "Infografika" },
          "item-5": { title: "Ko‘ngillilar" },
          "item-6": { title: "Yangiliklar" },
        },
      },
      uz: {
        toggleBtnTitle: "Навигация панелини очиш",
        routeList: {
          "item-1": { title: "Дарахтни экиш" },
          "item-2": { title: "Лойиҳа тўғрисидаги" },
          "item-3": { title: "Қайта алоқа" },
          "item-4": { title: "Инфографика" },
          "item-5": { title: "Кўнгиллилар" },
          "item-6": { title: "Янгиликлар" },
        },
      },
    },
    selectedContent: {},
  };

  public components: Record<string, ReactiveElement> = {
    "nav-logo": new NavLogo({ logo: "#greentashkent" }),
    "app-footer": new AppFooter({ placeOnTheLeft: true, orderNavMobile: true }),
    "nav-lang": new NavLang(),
    "nav-login": new NavLogin(),
  };
  public routes: Routes = routes;
  public compiledRoutes: Routes;
  public routedIsCompiled: boolean;
  public modalRoutes: string[] = [
    "modal-about-project",
    "modal-contacts",
    "modal-infographics",
    "modal-policy",
    "modal-volunteers",
  ];

  public watch: Watcher = {
    isMenuActive: (newValue: boolean) => {
      return newValue ? this.openMenu() : this.closeMenu();
    },
  };

  public componentsAreRendered: boolean;

  public onConnected(): void {
    if (!this.refProxy["componentsAreRendered"]) {
      this.renderComponents();
    }

    setTimeout(() => this.handleRouting()); // handle initial route!
  }

  public events(): void {
    this.eventHandler.subscribe(
      "nav-items",
      "nav-items-click",
      "click",
      this.preventDefaultHandler
    );
    this.eventHandler.subscribe(
      window,
      "window-state-route",
      "popstate",
      this.handleRouting
    );
    this.eventHandler.subscribe(
      "menu-toggle-btn",
      "menu-toggle-event",
      "click",
      this.toggleMenuHandler
    );
    this.eventHandler.subscribe(
      "nav-items-modal",
      "open-modal-event",
      "click",
      this.modalRouteHandler
    );
    this.eventHandler.subscribe(
      "mobile-wrapper",
      "focus-out-handler-mobile",
      "click",
      this.focusHandler
    );
    this.eventHandler.subscribe(
      window,
      "window-width-change-event",
      "resize",
      () => {
        if (window.innerWidth >= 1024 && this.refProxy["isMenuActive"]) {
          this.closeMenu();
        }
      }
    );
  }

  public modalRouteHandler(event: MouseEvent): void {
    let hasModalName: boolean = event.target["hasAttribute"]("modal-name");
    let modalName: string = event.target["getAttribute"]("modal-name");

    this.refs["nav-items-modal"].forEach((modalBtn: HTMLButtonElement) => {
      modalBtn.classList.remove("nav__link--active");
    });

    if (hasModalName) {
      this.sharedState.components["modal-window"].openModal(modalName);
      event.target["classList"].add("nav__link--active");
    }
  }

  public toggleMenuHandler(): void {
    this.refProxy["isMenuActive"] = !this.refProxy["isMenuActive"];
  }

  public header: HTMLElement = document.querySelector(".header");

  public openMenu(): void {
    this.header.style.zIndex = "10000";
    this.refs["menu-toggle-btn"].forEach((btn: HTMLButtonElement) => {
      btn.classList.add("nav__toggle-list-btn--active");
    });
    this.refs["nav-mobile"].classList.add("nav__mobile--active");
    this.refs["mobile-wrapper"].classList.add("nav__mobile-wrapper--active");
  }

  public closeMenu(): void {
    this.header.style.zIndex = "2000";
    this.refs["menu-toggle-btn"].forEach((btn: HTMLButtonElement) => {
      btn.classList.remove("nav__toggle-list-btn--active");
    });
    this.refs["nav-mobile"].classList.remove("nav__mobile--active");
    this.refs["mobile-wrapper"].classList.remove("nav__mobile-wrapper--active");
  }

  public focusHandler(event: any): void {
    if (
      !event.target.matches(".nav__mobile") &&
      !event.target.matches(".nav__mobile *")
    ) {
      this.refProxy["isMenuActive"] = false;
    }
  }

  public renderComponents(): void {
    this.components["nav-logo"].classList.add("ml-24");
    this.components["nav-lang"].classList.add("mb-24");
    // this.components["nav-login"].classList.add("ml-24");
    this.components["nav-login"].classList.add("mb-24");
    this.components["app-footer"].classList.add("ml-16");

    this.refs["logo"].appendChild(this.components["nav-logo"]);
    this.refs["nav-mobile"].append(
      this.components["nav-lang"],
      // this.components["nav-login"],
      this.components["app-footer"]
    );

    this.componentsAreRendered = true;
  }

  //#region ROUTING LOGIC
  public preventDefaultHandler(event: any): void {
    event.preventDefault();
    const pathname: string = event.target.getAttribute("href");
    const isRoute: boolean = event.target.hasAttribute("is-route");

    if (window.location.pathname !== pathname && isRoute) {
      this.navigateTo(pathname);
    }
  }

  public navigateTo(url: string): void {
    if (window.location.pathname !== url) {
      window.history.pushState(null, "", url);
      this.handleRouting();
    }
  }

  public compileRouter(): void {
    const routes: Routes = this.routes;
    let compiledRoutes: Routes = {};

    const observerNestedRoutes = (
      oldPropKey: string,
      nestedRouteKey: string,
      nestedProps: Route
    ) => {
      let newPropKey = oldPropKey + nestedRouteKey;

      Object.defineProperty(compiledRoutes, newPropKey, {
        value: nestedProps,
        writable: true,
        configurable: true,
        enumerable: true,
      });

      if (nestedProps.routes) {
        for (const [subNestedRouteKey, subNestedProps] of Object.entries(
          nestedProps.routes
        )) {
          observerNestedRoutes(newPropKey, subNestedRouteKey, subNestedProps);
        }
      }
    };

    for (const [key, props] of Object.entries(routes)) {
      if (props.routes) {
        for (const [nestedRoute, nestedProps] of Object.entries(props.routes)) {
          let newPropertyKey = key + nestedRoute;

          Object.defineProperty(compiledRoutes, newPropertyKey, {
            value: nestedProps,
            writable: true,
            configurable: true,
            enumerable: true,
          });

          if (!nestedProps.routes) {
            break;
          }
          observerNestedRoutes(newPropertyKey, nestedRoute, nestedProps);
        }
      }

      Object.defineProperty(compiledRoutes, key, {
        value: props,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }

    this.compiledRoutes = compiledRoutes;
    this.routedIsCompiled = true;
  }

  public handleRouting(): void {
    const pathname: string = window.location.pathname;
    const mainElement: HTMLElement =
      this.sharedState.root.querySelector("main");
    const mainWrapper: HTMLElement =
      this.sharedState.components["app-main"].refs["main-wrapper"];
    this.sharedState.root.scrollTo({ behavior: "smooth", left: 0, top: 0 });
    this.refProxy["routeMatched"] = false;

    for (let j = 0; j < this.refs["nav-items"].length; ++j) {
      this.refs["nav-items"][j].classList.remove("nav__link--active");
    }

    for (let i = 0; i < this.refs["nav-items"].length; ++i) {
      let navItem = this.refs["nav-items"][i];

      if (navItem.getAttribute("href") === pathname) {
        navItem.classList.add("nav__link--active");
      }
    }

    for (const [path, props] of Object.entries(this.compiledRoutes)) {
      if (path === pathname && path !== "/") {
        mainWrapper.innerHTML = "";
        mainWrapper.appendChild(props.component);

        if (props.title) {
          document.title = TITLE + " - " + props.title;
        } else {
          document.title = TITLE;
        }

        this.refProxy["routeMatched"] = true;

        document.querySelector("#map")["style"] = "visibility:hidden;";

        if (props.callback) {
          props.callback();
        }
        break;
      }
    }

    mainElement.style.transition = "all 0.3s ease";

    let filterDateToggleBtn: HTMLElement = document.querySelector(
      ".filter-date-container__toggle-btn"
    );
    let filterDateView: HTMLElement =
      document.querySelector(".filter-date-view");
    let filterContainer: HTMLElement = document.querySelector(
      ".filter-date-container"
    );

    if (pathname === "/") {
      mainWrapper.innerHTML = "";
      mainWrapper.appendChild(this.routes["/"].component);
      document.title = TITLE + " - " + this.routes["/"].title;

      filterDateToggleBtn.style.opacity = "1";
      filterDateToggleBtn.style.visibility = "visible";
      filterDateView.style.opacity = "1";
      filterDateView.style.visibility = "visible";

      if (this.compiledRoutes["/"].callback) {
        this.compiledRoutes["/"].callback();
      }

      mainElement.style.opacity = "0";
      mainElement.style.visibility = "hidden";
      mainElement.style.zIndex = "97";

      document.querySelector("#map")["style"] = "visibility:visible;";
      PlayFadeInAnimation(document.querySelector("#map"));

      this.sharedState
        .getComponent("accordition-left")
        .then((component: AccorditionRight) => {
          component.style.visibility = "visible";
          component.style.opacity = "1";
        })
        .catch((err) => console.error(err));

      this.sharedState
        .getComponent("accordition-right")
        .then((component: AccorditionRight) => {
          component.style.visibility = "visible";
          component.style.opacity = "1";
        })
        .catch((err) => console.error(err));

      this.sharedState
        .getComponent("plant-trees-reference")
        .then((component: PlantTreesReference) => {
          component.style.visibility = "visible";
          component.style.opacity = "1";
        })
        .catch((err) => console.error(err));

      this.sharedState
        .getComponent("change-map")
        .then((component: ChangeMap) => {
          component.style.visibility = "visible";
          component.style.opacity = "1";
        })
        .catch((err) => console.error(err));

      return;
    } else {
      mainElement.style.opacity = "1";
      mainElement.style.visibility = "visible";
      mainElement.style.zIndex = "99";

      document.querySelector("#map")["style"] = "visibility:hidden;";

      let footer: HTMLElement = document.querySelector(".footer");
      setTimeout(() => {
        footer.style.opacity = "0";
        footer.style.visibility = "hidden";
        mainElement.style.paddingBottom = "0";
      });

      this.sharedState
        .getComponent("accordition-left")
        .then((component: AccorditionLeft) => {
          component.style.visibility = "hidden";
          component.style.opacity = "0";
          component.refProxy["is-active"] = false;
          component.style.height = "calc(100dvh - 9.25rem)";
          component.refs["container-content"].style.height =
            "calc(100dvh - 9.25rem)";
        })
        .catch((err) => console.error(err));

      this.sharedState
        .getComponent("accordition-right")
        .then((component: AccorditionRight) => {
          component.style.visibility = "hidden";
          component.style.opacity = "0";
          component.refProxy["is-active"] = false;
          component.refProxy["sort-is-active"] = true;
          component.style.height = "calc(100dvh - 9.25rem)";
          component.refs["container-content"].style.height =
            "calc(100dvh - 9.25rem)";
        })
        .catch((err) => console.error(err));

      this.sharedState
        .getComponent("plant-trees-reference")
        .then((component: PlantTreesReference) => {
          component.style.visibility = "hidden";
          component.style.opacity = "0";
        })
        .catch((err) => console.error(err));

      this.sharedState
        .getComponent("change-map")
        .then((component: ChangeMap) => {
          component.style.visibility = "hidden";
          component.style.opacity = "0";
        })
        .catch((err) => console.error(err));

      filterDateToggleBtn.style.opacity = "0";
      filterDateToggleBtn.style.visibility = "hidden";
      filterDateView.style.opacity = "0";
      filterDateView.style.visibility = "hidden";

      filterDateToggleBtn.classList.remove("active");
      filterContainer.classList.remove("active");

      mainElement.style.paddingBottom = "4.75rem";

      import("../../Timeline")
        .then((module) => {
          const timeline = module.timeline;
          timeline.isActive = false;
        })
        .catch((err) => console.error(err));
    }

    if (!this.refProxy["routeMatched"]) {
      mainWrapper.innerHTML = "";
      mainWrapper.appendChild(this.routes["error-404"].component);
      document.title = TITLE + " - " + this.routes["error-404"].title;

      document.querySelector("#map")["style"] = "visibility:hidden;";
    }
  }
  //#endregion
}
