import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ModalBase from "./ModalBase";
// @ts-ignore
import sass from "!css-loader!sass-loader!./Infographics.scss";

const template: string = /*html*/`
  <h1>Write HTML for your ModalInfographics component right here!!!</h1>
`;

@DefineComponent({
  tag: "modal-infographics"
})
export default class ModalInfographics extends ModalBase {
  constructor() {
    super({
      template,
      styles: {
        sass,
        links: ["margins"]
      }
    });
  }
}
