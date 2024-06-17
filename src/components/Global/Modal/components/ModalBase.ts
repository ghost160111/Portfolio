import { IStyleConfig, ReactiveElement } from "../../../../plugins/ReactiveElement/ReactiveElementLib";
import NavLang from "../../../Header/components/NavLang";
import ModalWindow from "../ModalWindow";

export interface ModalBaseProps {
  template: string;
  styles: IStyleConfig;
}

export default class ModalBase extends ReactiveElement {
  constructor(props: ModalBaseProps) {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: props.styles,
      props,
      setFadeInTransition: {
        value: true,
        duration: 1000
      }
    });
  }

  public modalWindow: ModalWindow;

  public render(): string {
    return /*html*/`
      <div class="container">
        ${this.props["template"]}
      </div>
    `;
  }

  public onConnected(): void {
    this.updateLanguage<ModalBase>(this);
  }

  public getModalWindow(callback: () => void): void {
    if (this.modalWindow) {
      callback();
    } else {
      this.sharedState.getComponent<ModalWindow>("modal-window")
        .then((component: ModalWindow) => {
          this.modalWindow = component;
          callback();
        })
        .catch((err) => console.error(err));
    }
  }

  public updateLanguage<T>(instance: T): void {
    this.sharedState.getComponent<NavLang | NavLang[]>("nav-lang")
      .then((component: NavLang | NavLang[]) => {
        if (Array.isArray(component)) {
          component[0].updateComponentLanguage<T>(instance);
        } else if (component instanceof NavLang) {
          component.updateComponentLanguage<T>(instance);
        }
      })
      .catch((err) => console.error(err));
  }
}
