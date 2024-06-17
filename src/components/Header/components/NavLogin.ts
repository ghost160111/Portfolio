import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!../styles/NavLogin.scss";

@DefineComponent({
  tag: "nav-login",
  template: /*html*/`
    <div class="wrapper">
      <a
        ref-class="class"
        ref-href="moderatorURL"
        ref-data="selectedContent.title"
        ref-title="selectedContent.title"
        ref-target="linkTarget"
      ></a>
    </div>
  `
})
export default class NavLogin extends ReactiveElement {
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
    class: "login-btn",
    moderatorURL: "https://daraxt.tashkent.uz/login", // enter moderator URL here!
    linkTarget: "_blank",
    contents: {
      ru: {
        title: "Войти"
      },
      oz: {
        title: "Kirish"
      },
      uz: {
        title: "Кирищ"
      }
    },
    selectedContent: {
    }
  }
}
