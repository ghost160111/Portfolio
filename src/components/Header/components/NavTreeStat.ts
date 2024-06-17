// @ts-ignore
import treeImg from "../../../assets/images/tree-icon.svg";
// @ts-ignore
import sass from "!!css-loader!sass-loader!../styles/NavTreeStat.scss";
import { ReactiveElement } from "../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../plugins/ReactiveElement/Decorators/DefineComponent";
import { treesURL } from "../../../constants/API_URL";
import WorkerHandler from "../../../web_workers/classes/WorkerHandler";
// @ts-ignore
import FetchRequestWorker from "../../../web_workers/fetch_request.worker";
import { TreeList } from "../../../state/Interfaces";

export interface ResponseData {
  total_count: number;
  last_added: number;
  updated: string;
}

export interface NavTreeStatProps {
  apiUrl: string;
}

@DefineComponent({
  tag: "nav-tree-stat",
  template: /*html*/`
    <div class="nav__current-city-tree-amount-today">
      <img class="nav__current-city-tree-amount-today__img" src="${treeImg}" alt="White Tree">
      <span class="nav__current-city-tree-amount-today__info">
        <pre style="margin: 0"><span class="info__tree-amount" ref-data="treeQty">0</span> (+<span class="info__new-trees" ref-data="treeQtyYesterday">0</span>)</pre>
        <time class="info__date" ref-data="postedDate"></time>
      </span>
    </div>
  `
})
export default class NavTreeStat extends ReactiveElement {
  constructor(props: NavTreeStatProps) {
    super({
      styles: {
        sass
      },
      animations: {
        setOpacityAnimation: true
      },
      shadowDOM: true,
      props
    });

    this.intervalTime = 30000; // interval time in MilliSeconds

    this.fetchRequestWorker = new WorkerHandler(FetchRequestWorker, (event: MessageEvent) => {
      const data = event.data;

      try {
        this.updateData(data);
      } catch (err) {
        console.log(err);
      }
    });
  }

  public fetchRequestWorker: WorkerHandler;
  public fetchedData: boolean;
  public intervalRef: any;
  public intervalTime: number;

  public data: {} = {
    treeQty: 4526305,
    treeQtyYesterday: 120,
    postedDate: this.getDate()
  }

  public computeZeros(input: number): string {
    if (input < 10) {
      return `0${input}`;
    }
    return input.toString();
  }

  // this is how date is being shown in his place
  public getDate(): string {
    let date: Date = new Date();
    let year: number = date.getFullYear();
    let month: number | string = this.computeZeros(date.getMonth());
    let day: number | string = this.computeZeros(date.getDate());
    let hours: number | string = this.computeZeros(date.getHours());
    let minutes: number | string = this.computeZeros(date.getMinutes());

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  public onConnected(): void {
    this.fetchRequestWorker.postMessage(treesURL);

    this.intervalRef = setInterval(() => {
      this.fetchRequestWorker.postMessage(treesURL);
    }, this.intervalTime);
  }

  public onDisconnected(): void {
    clearInterval(this.intervalRef);
  }

  public updateData(data: TreeList): void {
    const { total_count, last_added, updated } = data;

    this.refProxy["treeQty"] = total_count;
    this.refProxy["treeQtyYesterday"] = last_added;
    this.refProxy["postedDate"] = updated;
  }

  protected async fetchData(url: string): Promise<void> {
    const response: Response = await fetch(url);

    try {
      if (!response.ok) {
        throw `Response to API with url: ${url} wasn't ok!`;
      }

      const data: any = await response.json(); // set data structure here, Type.
      const { total_count, last_added, updated } = data;

      this.refProxy["treeQty"] = total_count;
      this.refProxy["treeQtyYesterday"] = last_added;
      this.refProxy["postedDate"] = updated;
    } catch (err) {
      console.error(err);
    }
  }
}
