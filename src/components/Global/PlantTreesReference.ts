import { ReactiveElement } from "../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!./styles/PlantTreesReference.scss";
import NavLinks from "../Header/components/NavLinks";

@DefineComponent({
  tag: "plant-trees-reference",
  template: /*html*/ `
    <a class="plant-trees-reference" ref="plant-trees-link" type="button" ref-data="selectedContent.title" ref-href="pathname"></a>
  `,
})
export default class PlantTreesReference extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true,
      },
      styles: {
        sass,
      },
    });
  }

  public data: {} = {
    pathname: "/plant-trees",
    contents: {
      ru: {
        title: "Посадить деревья",
      },
      uz: {
        title: "Daraxtlar ekish",
      },
      kiril: {
        title: "Дарахтлар екиш",
      },
    },
    selectedContent: {},
  };

  public events(): void {
    this.eventHandler.subscribe(
      "plant-trees-link",
      "plant-trees-event",
      "click",
      (event: any) => {
        event.preventDefault();
        this.sharedState
          .getComponent("nav-links")
          .then((component: NavLinks) =>
            component.navigateTo(this.refProxy["pathname"])
          )
          .catch((err) => console.error(err));
      }
    );
  }
}
