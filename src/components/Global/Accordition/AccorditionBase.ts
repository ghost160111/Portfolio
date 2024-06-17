import { IStyleConfig, ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";

export interface AccorditionBaseProps {
  placedOnTheLeft: boolean;
  styles: IStyleConfig;
}

export default class AccorditionBase extends ReactiveElement {
  constructor(props: AccorditionBaseProps) {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: props.styles,
      props
    });

    if (this.props["placedOnTheLeft"]) {
      this.style.left = "0";
      this.style.transform = "translate(-100%, 0)";
    } else {
      this.style.left = "100%";
      this.style.transform = "translate(0, 0)";
    }
  }

  public data: {} = {
    "is-active": false
  }

  public toggleComponent(): void {
    this.refProxy["is-active"] = !this.refProxy["is-active"];
  }

  public events(): void {
    this.eventHandler.subscribe("toggle-btn", "toggle-event", "click", this.toggleComponent);
  }
}
