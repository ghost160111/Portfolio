// @ts-ignore
import sass from "!css-loader!sass-loader!./NewsAccordition.scss";
import { ReactiveElement } from "../../../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import Img1 from "@/assets/images/green_tash.jpg";
// @ts-ignore
import Img2 from "@/assets/images/green_tash.jpg"; // change it

@DefineComponent({
  tag: "news-accordition",
  template: /*html*/`
    <h2 class="news-title ml-16 mt-32 mb-24" ref-data="selectedContent.title"></h2>
    <div class="news-overlay">
      <ul class="news-list" ref="news-list"></ul>
    </div>
  `
})
export default class NewsAccordition extends ReactiveElement {
  constructor() {
    super({
      shadowDOM: true,
      animations: {
        setOpacityAnimation: true
      },
      styles: {
        sass,
        links: ["margins"]
      }
    });
  }

  public data: {} = {
    contents: {
      ru: {
        title: "Новости"
      },
      oz: {
        title: "Yangiliklar"
      },
      uz: {
        title: "Янгиликлар"
      }
    },
    selectedContent: {}
  }

  public hashList: { hash: string; ru: string; oz: string; uz: string; }[] = [
    {
      hash: "#news-1",
      ru: /*html*/`
        <div class="news-item">
          <div class="news-item__left-block">
            <img class="left-block__img" src="${Img1}" alt="Tree image" />
          </div>
          <div class="news-item__right-block">
            <time class="right-block__date">03.06.2024</time>
            <h3 class="right-block__title">Зелёный щит Ташкента: почему важна инвентаризация деревьев?</h3>
            <p class="right-block__description">Ташкент, утопающий в зелени, - это не просто красивый образ, а жизненно важная необходимость. Деревья - наши легкие, защищающие от палящего солнца, пыли и шума. Но как сохранить этот зеленый щит? Ответ прост: провести инвентаризацию деревьев.</p>
          </div>
          <a class="news-item__link" href="/news" ref="links" route-news="#news-1">Title of news</a>
        </div>
      `,
      oz: /*html*/`
        <div class="news-item">
          <div class="news-item__left-block">
            <img class="left-block__img" src="${Img1}" alt="Daraxt rasmi" />
          </div>
          <div class="news-item__right-block">
            <time class="right-block__date">03.06.2024</time>
            <h3 class="right-block__title">Toshkentning Yashil Qalqoni: daraxtlar inventarizatsiyasi nima uchun muhim?</h3>
            <p class="right-block__description">Yashil manzaraga burkangan Toshkent - bu shunchaki chiroyli tasvir emas, balki hayotiy zarurat. Daraxtlar - quyoshning qizdirishidan, chang va shovqindan himoya qiluvchi o'pkalarimizdir. Ammo bu yashil qalqonni qanday saqlab qolish mumkin? Javob oddiy: daraxtlar inventarizatsiyasini o'tkazish.</p>
          </div>
          <a class="news-item__link" href="/news" ref="links" route-news="#news-1">Yangiliklar sarlavhasi</a>
        </div>
      `,
      uz: /*html*/`
        <div class="news-item">
          <div class="news-item__left-block">
            <img class="left-block__img" src="${Img1}" alt="Дарахт расми" />
          </div>
          <div class="news-item__right-block">
          <time class="right-block__date">03.06.2024</time>
            <h3 class="right-block__title">Тошкентнинг Яшил Қалқони: дарахтлар инвентаризацияси нима учун муҳим?</h3>
            <p class="right-block__description">Яшил манзарага бурканган Тошкент - бу шунчаки чиройли тасвир эмас, балки ҳаётий зарурат. Дарахтлар - қуёшнинг қиздиришидан, чанг ва шовқиндан ҳимоя қилувчи ўпкаларимиздир. Аммо бу яшил қалқонни қандай сақлаб қолиш мумкин? Жавоб оддий: дарахтлар инвентаризациясини ўтказиш.</p>
          </div>
          <a class="news-item__link" href="/news" ref="links" route-news="#news-1">Янгиликлар сарлавҳаси</a>
        </div>
      `
    },
    {
      hash: "#news-2",
      ru: /*html*/`
        <div class="news-item">
          <div class="news-item__left-block">
            <img class="left-block__img" src="${Img2}" alt="Tree image" />
          </div>
          <div class="news-item__right-block">
          <time class="right-block__date">03.06.2024</time>
            <h3 class="right-block__title">Подготовка системы инвентаризации деревьев в Ташкенте: большой шаг к зеленым городам будущего</h3>
            <p class="right-block__description">В современном мире, где вопросы экологии и бережного отношения к окружающей среде выходят на первый план, особое значение приобретают проекты, направленные на сохранение и развитие зеленых зон в мегаполисах. Одним из таких проектов стала разработка системы инвентаризации деревьев в Ташкенте,инициированная Фондом Zamin при поддержке Министерства экологии Ташкента и Департамента цифрового развития при Хокимияте города Ташкента.</p>
          </div>
          <a class="news-item__link" href="/news" ref="links" route-news="#news-2">Title of news</a>
        </div>
      `,
      oz: /*html*/`
        <div class="news-item">
          <div class="news-item__left-block">
            <img class="left-block__img" src="${Img2}" alt="Daraxt rasmi" />
          </div>
          <div class="news-item__right-block">
          <time class="right-block__date">03.06.2024</time>
            <h3 class="right-block__title">Toshkentda daraxtlar inventarizatsiyasi tizimini tayyorlash: kelajakdagi yashil shaharlar sari katta qadam</h3>
            <p class="right-block__description">Hozirgi zamonda ekologiya va atrof-muhitga ehtiyotkorlik bilan munosabat qilish masalalari birinchi o'ringa chiqib, yashil zonalarni saqlash va rivojlantirishga qaratilgan loyihalar alohida ahamiyat kasb etmoqda. Shunday loyihalardan biri Toshkentda Zamin fondi tomonidan Toshkent Ekologiya vazirligi va Toshkent shahar hokimiyatining Raqamli rivojlanish departamenti ko'magida boshlangan daraxtlar inventarizatsiyasi tizimini ishlab chiqish loyihasi bo'ldi.</p>
          </div>
          <a class="news-item__link" href="/news" ref="links" route-news="#news-2">Yangiliklar sarlavhasi</a>
        </div>
      `,
      uz: /*html*/`
        <div class="news-item">
          <div class="news-item__left-block">
            <img class="left-block__img" src="${Img2}" alt="Дарахт расми" />
          </div>
          <div class="news-item__right-block">
          <time class="right-block__date">03.06.2024</time>
            <h3 class="right-block__title">Тошкентда дарахтлар инвентаризацияси тизимини тайёрлаш: келажакдаги яшил шаҳарлар сари катта қадам</h3>
            <p class="right-block__description">Ҳозирги замонда экология ва атроф-муҳитга эҳтиёткорлик билан муносабат қилиш масалалари биринчи ўринга чиқиб, яшил зоналарни сақлаш ва ривожлантиришга қаратилган лойиҳалар алоҳида аҳамият касб этмоқда. Шундай лойиҳалардан бири Тошкентда Замин фонди томонидан Тошкент Экология вазирлиги ва Тошкент шаҳар ҳокимиятининг Рақамли ривожланиш департаменти кўмагида бошланган дарахтлар инвентаризацияси тизимини ишлаб чиқиш лойиҳаси бўлди.</p>
          </div>
          <a class="news-item__link" href="/news" ref="links" route-news="#news-2">Янгиликлар сарлавҳаси</a>
        </div>
      `
    }
  ];

  public onConnected(): void {
    setTimeout(() => {
      this.generateList();
    });
  }

  public generateList(): void {
    this.refs["news-list"].innerHTML = "";

    for (let i = 0; i < this.hashList.length; ++i) {
      let hashItem: { hash: string; ru: string; oz: string; uz: string; } = this.hashList[i];
      this.refs["news-list"].innerHTML += /*html*/`
        <li>${hashItem[this.lang]}</li>
      `;
    }

    this.shadowDOM.observeRefs();

    this.eventHandler.subscribe("links", "link-prevent-default", "click", this.onLinkClick);
  }

  public onLinkClick(event: MouseEvent): void {
    event.preventDefault();
    let eventTarget: HTMLAnchorElement = event.target as HTMLAnchorElement;
    localStorage.setItem("selected-news", eventTarget.getAttribute("route-news"));
    this.sharedState.components["nav-links"].navigateTo(eventTarget.href);
  }

  static get observedAttributes() {
    return ["lang"];
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
    try {
      this.updateChanged({
        attrName: name,
        name: name,
        oldValue: oldValue,
        newValue,
        callback: () => {
          try {
            if (oldValue && newValue && oldValue !== newValue) {
              this.refs["news-list"].innerHTML = "";
            }

            this.generateList();
          } catch (err) {
            if (this.devMode) {
              console.error(err);
            }
          }
        }
      });
    } catch (err) {
      if (this.devMode) {
        console.error(err);
      }
    }
  }
}
