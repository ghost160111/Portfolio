import "./App.scss";
import ReactiveApp from "../plugins/ReactiveElement/App/ReactiveApp";
import { PlayFadeInAnimation } from "../plugins/ReactiveElement/Functions/PlayFadeInAnimation";
import AppHeader from "./Header/AppHeader";

const AppTemplate = /*html*/`
  <header></header>
  <main></main>
  <footer></footer>
`;

export default class Main {
  public header: HTMLElement | null;
  public footer: HTMLElement | null;
  public main: HTMLElement | null;

  public app: ReactiveApp;
  public appRoot: HTMLDivElement | null;
  public appTemplate: string;

  public components: Record<string, any> = {
    "app-header": new AppHeader()
  }

  constructor() {
    PlayFadeInAnimation(document.body);
    this.start();
    this.runTasks(); // this is where you run your tasks, write controllers and so on!
  }

  public runTasks(): void {
    console.log("Application is started!");
  }

  public start(): void {
    this.appRoot = document.querySelector("#app");
    this.appTemplate = AppTemplate;
    this.appRoot.innerHTML = this.appTemplate;

    this.header = document.querySelector("header");
    this.main = document.querySelector("main");
    this.footer = document.querySelector("footer");

    this.header.appendChild(this.components["app-header"]);
  }
}
