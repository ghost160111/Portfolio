import "./App.scss";
import ReactiveApp from "../plugins/ReactiveElement/App/ReactiveApp";
import AppHeader from "./Header/AppHeader";
import AppMain from "./Main/AppMain";
import ModalWindow from "./Global/Modal/ModalWindow";
import { PlayFadeInAnimation } from "../plugins/ReactiveElement/Functions/PlayFadeInAnimation";
import AccorditionLeft from "./Global/Accordition/AccorditionLeft";
import AccorditionRight from "./Global/Accordition/AccorditionRight";
import PlantTreesReference from "./Global/PlantTreesReference";
import ChangeMap from "./Global/ChangeMap/ChangeMap";
// @ts-ignore
import("./Timeline");
import AppFooter from "./Footer/AppFooter";

const AppTemplate = /*html*/`
  <header class="header">
    <div class="header-wrapper">
      <nav class="nav">
        <div class="nav__left"></div>
        <div class="nav__right"></div>
      </nav>
    </div>
  </header>
  <main class="main"></main>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
  <footer class="footer">
    <div class="filter-date-container">
      <div class="filter-date-container-wrapper mb-16">
        <div class="filter-date-view">
          <span class="top-filter-time__date"><span class="js-date-from"></span> - <span class="js-date-to"></span></span>
          <button type="button" class="filter-date-reset js-date-reset">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V10H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1066 12.5157 20.9945C14.4637 20.8824 16.3226 20.1402 17.8121 18.8798C19.3017 17.6194 20.3413 15.909 20.7742 14.0064C21.2072 12.1038 21.0101 10.112 20.2126 8.33111C19.4152 6.55025 18.0605 5.0768 16.3528 4.13277C14.6451 3.18874 12.6769 2.82527 10.7447 3.09713C8.81245 3.36898 7.02091 4.26143 5.64 5.64001L1 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="filter-date-slider">
        <input class="js-range-slider" type="range" />
      </div>
      <button class="filter-date-container__toggle-btn" type="button">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.70759 10.9706C8.1079 11.4906 8.8921 11.4906 9.29241 10.9706L15.9209 2.35999C16.4271 1.70243 15.9583 0.75 15.1285 0.75H1.87153C1.04169 0.75 0.572923 1.70243 1.07912 2.35999L7.70759 10.9706Z" fill="black"/>
        </svg>
      </button>
    </div>
  </footer>
`;

export default class Main {
  public header: HTMLElement | null;
  public footer: HTMLElement | null;
  public main: HTMLElement | null;
  public map: HTMLElement | null;

  public app: ReactiveApp;
  public appRoot: HTMLDivElement | null;
  public appTemplate: string;

  public components: Record<string, any> = {
    "main": new AppMain(),
    "footer": new AppFooter(),
    "modal-window": new ModalWindow(),
    "accordition-left": new AccorditionLeft(),
    "accordition-right": new AccorditionRight(),
    "plant-trees-reference": new PlantTreesReference(),
    "change-map": new ChangeMap()
  }

  constructor() {
    PlayFadeInAnimation(document.body);
    this.start();
    this.runTasks(); // this is where you run your tasks, write controllers and so on!
  }

  public runTasks(): void {
    setTimeout(() => {
      this.components["accordition-left"].refProxy["is-active"] = true; // turn this on
    }, 500);
  }

  public start(): void {
    this.appRoot = document.querySelector("#app");
    this.appTemplate = AppTemplate;
    this.appRoot.innerHTML = this.appTemplate;

    AppHeader();
    this.header = document.querySelector(".header");
    this.footer = document.querySelector(".filter-date-container-wrapper");
    this.main = document.querySelector(".main");
    this.map = document.querySelector("#map");

    this.main.appendChild(this.components["main"]);
    this.footer.appendChild(this.components["footer"]);
    this.appRoot.append(
      this.components["modal-window"],
      this.components["accordition-left"],
      this.components["accordition-right"],
      this.components["plant-trees-reference"],
      this.components["change-map"]
    );

    this.main.style.zIndex = "100";
  }
}
