import { ReactiveElement } from "../ReactiveElementLib";

export const BASE_COMPONENT_ERRORS = {
  emptyContext: "Context is empty, enter this context of your component class!"
}

export default abstract class BaseComponent {
  public context: ReactiveElement;

  constructor(context: ReactiveElement) {
    if (!context) {
      throw BASE_COMPONENT_ERRORS.emptyContext;
    }

    this.context = context;
  }
}
