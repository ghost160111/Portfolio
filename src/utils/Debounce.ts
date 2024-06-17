export function debounce(func: Function, delay: number) {
  let timerId: any;

  return function(): void {
    const context: any = this;
    const args: IArguments = arguments;

    clearTimeout(timerId);

    timerId = setTimeout((): void => {
      func.apply(context, args);
    }, delay);
  };
};
