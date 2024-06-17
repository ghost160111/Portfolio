import { ReactiveElement } from "../../plugins/ReactiveElement/ReactiveElementLib";
import DefineComponent from "../../plugins/ReactiveElement/Decorators/DefineComponent";
// @ts-ignore
import sass from "!css-loader!sass-loader!./styles/News.scss";
import NavLang from "../Header/components/NavLang";
// @ts-ignore
import Img1 from "@/assets/images/green_tash.jpg";
// @ts-ignore
import Img2 from "@/assets/images/green_tash.jpg"; // change it
import { PlayFadeInAnimation } from "../../plugins/ReactiveElement/Functions/PlayFadeInAnimation";

@DefineComponent({
  tag: "news-view",
  template: /*html*/`
    <section class="news">
      <h2 class="news-title" ref="title" ref-data="selectedContent.title"></h2>
      <div class="news-wrapper">
        <div class="selected-news" ref="selected-news">
          <button class="back-btn" type="button" ref="back-btn">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="23.5" stroke="#565656"/>
              <path d="M26.3333 19L21 24.3333L26.3333 29.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="animation-wrapper" ref="animation-wrapper"></div>
        </div>
        <ul class="news-list wrap active" ref="news-list">
        </ul>
      </div>
    </section>
  `
})
export default class NewsView extends ReactiveElement {
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

  public selectedNewsNode: HTMLElement;
  public animationWrapperNode: HTMLElement;
  public titleNode: HTMLElement;

  public onConnected(): void {
    this.generateList();

    this.selectedNewsNode = this.refs["selected-news"];
    this.animationWrapperNode = this.refs["animation-wrapper"];
    this.titleNode = this.refs["title"];

    this.sharedState.getComponent<NavLang>("nav-lang")
      .then((navLang: NavLang | NavLang[]) => {
        if (Array.isArray(navLang)) {
          navLang[0].updateComponentLanguage(this);
        } else if (navLang instanceof NavLang) {
          navLang.updateComponentLanguage(this);
        }
      })
      .catch((err) => console.error(err));
  }

  public onDisconnected(): void {
    this.cleanUpSelectedNews();
  }

  public hashList: { hash: string; ru: string; oz: string; uz: string; }[] = [
    {
      hash: "#news-1",
      ru: /*html*/`
        <div class="news-item" ref="item" route-news="#news-1">
          <div class="news-item__left-block">
            <div class="news-item__img-wrapper">
              <img class="news-item__img" src="${Img1}" alt="Tree picture" />
            </div>
          </div>
          <div class="news-item__right-block">
            <h3 class="news-item__title">Зелёный щит Ташкента: почему важна инвентаризация деревьев?</h3>
            <p class="news-item__description">Ташкент, утопающий в зелени, - это не просто красивый образ, а жизненно важная необходимость. Деревья - наши легкие, защищающие от палящего солнца, пыли и шума. Но как сохранить этот зеленый щит? Ответ прост: провести инвентаризацию деревьев.</p>
            <div class="news-item__hidden-text" style="display:none;">
              <h2 class="selected-news__title">Зелёный щит Ташкента: почему важна инвентаризация деревьев?</h2>
              <div class="selected-news__img-wrapper">
                <img class="selected-news__img" src="${Img1}" alt="Tree picture" />
              </div>
              <p>Ташкент, утопающий в зелени, - это не просто красивый образ, а жизненно важная необходимость. Деревья - наши легкие, защищающие от палящего солнца, пыли и шума. Но как сохранить этот зеленый щит? Ответ прост: провести инвентаризацию деревьев.</p>
              <p>Инвентаризация - это не просто учет. Это комплексное обследование каждого дерева, включающее:</p>
              <ul>
                <li>Вид, возраст и состояние дерева. Это позволит понять, какие деревья нуждаются в уходе, а какие - в лечении или замене.</li>
                <li>Точное местоположение. Создание электронной карты зеленых насаждений поможет оптимизировать работу коммунальных служб и избежать ненужного спила деревьев.</li>
                <li>Диаметр ствола и высота кроны. Эти данные важны для оценки санитарного состояния дерева и его потенциальной опасности.</li>
              </ul>
              <h3>Зачем нужна инвентаризация?</h3>
              <ul>
                <li>Для контроля за зелеными насаждениями. Зная точное количество и состояние деревьев, городские власти могут планировать работы по озеленению, уходу и санитарной рубке.</li>
                <li>Для защиты зеленых насаждений. Инвентаризация позволит выявить и сохранить ценные породы деревьев, а также защитить их от незаконной вырубки.</li>
                <li>Для улучшения городской среды. Здоровые деревья очищают воздух, снижают уровень шума и создают более комфортный микроклимат.</li>
              </ul>
              <p>Инвентаризация деревьев в Ташкенте уже началась. В 2019 году была поставлена задача провести полную инвентаризацию до 1 июня, но, к сожалению, в срок она не была выполнена. В 2023 году президент снова поручил провести инвентаризацию, но уже с использованием современных цифровых технологий.</p>
              <p>Важно, чтобы эта работа была завершена как можно скорее. Ведь от этого зависит не только красота нашего города, но и наше здоровье и благополучие.</p>
              <h3>Сохраним наш город зеленым!</h3>
            </div>
            <time class="news-item__date">03.06.2024</time>
            <a class="news-item__link" href="javascript:void(0)" ref="item-link" route-news="#news-1"></a>
          </div>
        </div>
      `,
      oz: /*html*/`
        <div class="news-item" ref="item" route-news="#news-1">
          <div class="news-item__left-block">
            <div class="news-item__img-wrapper">
              <img class="news-item__img" src="${Img1}" alt="Daraxt rasmi" />
            </div>
          </div>
          <div class="news-item__right-block">
            <h3 class="news-item__title">Toshkentning yashil qalqoni: Daraxtlarni inventarizatsiya qilish nega muhim?</h3>
            <p class="news-item__description">Yashil Toshkent - bu faqatgina go'zal manzara emas, balki hayotiy zaruriyatdir. Daraxtlar bizning o'pkamiz, quyoshdan, changdan va shovqindan himoya qiladi. Lekin bu yashil qalqonni qanday saqlash mumkin? Javob oddiy: daraxtlarni inventarizatsiya qilish.</p>
            <div class="news-item__hidden-text" style="display:none;">
              <h2 class="selected-news__title">Toshkentning yashil qalqoni: Daraxtlarni inventarizatsiya qilish nega muhim?</h2>
              <div class="selected-news__img-wrapper">
                <img class="selected-news__img" src="${Img1}" alt="Daraxt rasmi" />
              </div>
              <p>Yashil Toshkent - bu faqatgina go'zal manzara emas, balki hayotiy zaruriyatdir. Daraxtlar bizning o'pkamiz, quyoshdan, changdan va shovqindan himoya qiladi. Lekin bu yashil qalqonni qanday saqlash mumkin? Javob oddiy: daraxtlarni inventarizatsiya qilish.</p>
              <p>Inventarizatsiya - bu faqatgina hisob-kitob emas. Bu har bir daraxtni kompleks tekshirish, jumladan:</p>
              <ul>
                <li>Daraxtning turi, yoshi va holati. Bu qanday daraxtlar parvarishga muhtojligini va qaysilarini davolash yoki almashtirish kerakligini aniqlashga yordam beradi.</li>
                <li>Aniq joylashuv. Yashil hududlarning elektron xaritasini yaratish kommunal xizmatlarning ishini optimallashtirishga va keraksiz daraxtlarni kesishdan qochishga yordam beradi.</li>
                <li>Tanining diametri va tojning balandligi. Ushbu ma'lumotlar daraxtning sanitariya holatini va uning potensial xavfini baholash uchun muhimdir.</li>
              </ul>
              <h3>Inventarizatsiya nima uchun kerak?</h3>
              <ul>
                <li>Yashil hududlarni nazorat qilish uchun. Daraxtlarning aniq soni va holatini bilish shahar hokimiyatiga ko'kalamzorlashtirish, parvarishlash va sanitariya kesish ishlari rejasini tuzishga yordam beradi.</li>
                <li>Yashil hududlarni himoya qilish uchun. Inventarizatsiya qimmatli daraxt turlarini aniqlash va ularni noqonuniy kesishdan himoya qilishga imkon beradi.</li>
                <li>Shahar muhitini yaxshilash uchun. Sog'lom daraxtlar havoni tozalaydi, shovqin darajasini pasaytiradi va qulay mikroiqlim yaratadi.</li>
              </ul>
              <p>Toshkentda daraxtlarni inventarizatsiya qilish allaqachon boshlandi. 2019 yilda to'liq inventarizatsiyani 1-iyungacha o'tkazish vazifasi qo'yilgan edi, ammo afsuski, muddatida bajarilmagan. 2023 yilda prezident yana inventarizatsiyani o'tkazishni topshirdi, ammo bu safar zamonaviy raqamli texnologiyalar yordamida.</p>
              <p>Ushbu ish iloji boricha tezroq yakunlanishi muhimdir. Chunki bu nafaqat shahrimizning go'zalligiga, balki sog'lig'imiz va farovonligimizga ham bog'liq.</p>
              <h3>Shahrimizni yashil saqlaylik!</h3>
            </div>
            <time class="news-item__date">03.06.2024</time>
            <a class="news-item__link" href="javascript:void(0)" ref="item-link" route-news="#news-1"></a>
          </div>
        </div>
      `,
      uz: /*html*/`
        <div class="news-item" ref="item" route-news="#news-1">
          <div class="news-item__left-block">
            <div class="news-item__img-wrapper">
              <img class="news-item__img" src="${Img1}" alt="Дарахт расми" />
            </div>
          </div>
          <div class="news-item__right-block">
            <h3 class="news-item__title">Тошкентнинг яшил қалқони: Дарахтларни инвентаризация қилиш нега муҳим?</h3>
            <p class="news-item__description">Яшил Тошкент - бу фақатгина гўзал манзара эмас, балки ҳаётий заруриятдир. Дарахтлар бизнинг ўпкамиз, қуёшдан, чангдан ва шовқиндан ҳимоя қилади. Лекин бу яшил қалқонни қандай сақлаш мумкин? Жавоб оддий: дарахтларни инвентаризация қилиш.</p>
            <div class="news-item__hidden-text" style="display:none;">
              <h2 class="selected-news__title">Тошкентнинг яшил қалқони: Дарахтларни инвентаризация қилиш нега муҳим?</h2>
              <div class="selected-news__img-wrapper">
                <img class="selected-news__img" src="${Img1}" alt="Дарахт расми" />
              </div>
              <p>Яшил Тошкент - бу фақатгина гўзал манзара эмас, балки ҳаётий заруриятдир. Дарахтлар бизнинг ўпкамиз, қуёшдан, чангдан ва шовқиндан ҳимоя қилади. Лекин бу яшил қалқонни қандай сақлаш мумкин? Жавоб оддий: дарахтларни инвентаризация қилиш.</p>
              <p>Инвентаризация - бу фақатгина ҳисоб-китоб эмас. Бу ҳар бир дарахтни комплекс текшириш, жумладан:</p>
              <ul>
                <li>Дарахтнинг тури, ёши ва ҳолати. Бу қандай дарахтлар парваришга муҳтожлигини ва қайсиларини даволаш ёки алмаштириш кераклигини аниқлашга ёрдам беради.</li>
                <li>Аниқ жойлашув. Яшил ҳудудларнинг электрон харитасини яратиш коммунал хизматларнинг ишини оптималлаштиришга ва кераксиз дарахтларни кесишдан қочишга ёрдам беради.</li>
                <li>Танининг диаметри ва тожнинг баландлиги. Ушбу маълумотлар дарахтнинг санитария ҳолатини ва унинг потенциал хавфини баҳолаш учун муҳимдир.</li>
              </ul>
              <h3>Инвентаризация нима учун керак?</h3>
              <ul>
                <li>Яшил ҳудудларни назорат қилиш учун. Дарахтларнинг аниқ сони ва ҳолатини билиш шаҳар ҳокимиятига кўкаламзорлаштириш, парваришлаш ва санитария кесиш ишлари режасини тузишга ёрдам беради.</li>
                <li>Яшил ҳудудларни ҳимоя қилиш учун. Инвентаризация қимматли дарахт турларини аниқлаш ва уларни ноқонуний кесишдан ҳимоя қилишга имкон беради.</li>
                <li>Шаҳар муҳитини яхшилаш учун. Соғлом дарахтлар ҳавони тозалайди, шовқин даражасини пасайтиради ва қулай микроклимат яратади.</li>
              </ul>
              <p>Тошкентда дарахтларни инвентаризация қилиш аллақачон бошланди. 2019 йилда тўлиқ инвентаризацияни 1-июнгача ўтказиш вазифаси қўйилган эди, аммо афсуски, муддатида бажарилмаган. 2023 йилда президент яна инвентаризацияни ўтказишни топширди, аммо бу сафар замонавий рақамли технологиялар ёрдамида.</p>
              <p>Ушбу иш иложи борича тезроқ якунланиши муҳимдир. Чунки бу нафақат шаҳримизнинг гўзаллигига, балки соғлигимиз ва фаровонлигимизга ҳам боғлиқ.</p>
              <h3>Шаҳримизни яшил сақлайлик!</h3>
            </div>
            <time class="news-item__date">03.06.2024</time>
            <a class="news-item__link" href="javascript:void(0)" ref="item-link" route-news="#news-1"></a>
          </div>
        </div>
      `
    },
    {
      hash: "#news-2",
      ru: /*html*/`
        <div class="news-item" ref="item" route-news="#news-2">
          <div class="news-item__left-block">
            <div class="news-item__img-wrapper">
              <img class="news-item__img" src="${Img2}" alt="Tree picture" />
            </div>
          </div>
          <div class="news-item__right-block">
            <h3 class="news-item__title">Подготовка системы инвентаризации деревьев в Ташкенте: большой шаг к зеленым городам будущего</h3>
            <p class="news-item__description">В современном мире, где вопросы экологии и бережного отношения к окружающей среде выходят на первый план, особое значение приобретают проекты, направленные на сохранение и развитие зеленых зон в мегаполисах. Одним из таких проектов стала разработка системы инвентаризации деревьев в Ташкенте,инициированная Фондом Zamin при поддержке Министерства экологии Ташкента и Департамента цифрового развития при Хокимияте города Ташкента.</p>
            <div class="news-item__hidden-text" style="display:none;">
              <h2 class="selected-news__title">Подготовка системы инвентаризации деревьев в Ташкенте: большой шаг к зеленым городам будущего</h2>
              <div class="selected-news__img-wrapper">
                <img class="selected-news__img" src="${Img2}" alt="Tree picture" />
              </div>
              <p class="selected-news__description">Ташкент, утопающий в зелени, - это не просто красивый образ, а жизненно важная необходимость. Деревья - наши легкие, защищающие от палящего солнца, пыли и шума. Но как сохранить этот зеленый щит? Ответ прост: провести инвентаризацию деревьев.</p>
              <p class="selected-news__description">В современном мире, где вопросы экологии и бережного отношения к окружающей среде выходят на первый план, особое значение приобретают проекты, направленные на сохранение и развитие зеленых зон в мегаполисах. Одним из таких проектов стала разработка системы инвентаризации деревьев в Ташкенте, инициированная Фондом Zamin при поддержке Министерства экологии Ташкента и Департамента цифрового развития при Хокимияте города Ташкента.</p>
              <h3>Цели и задачи проекта</h3>
              <p class="selected-news__description">Главная цель проекта - создание комплексной системы учета и мониторинга зеленых насаждений столицы Узбекистана. Реализация проекта позволит:</p>
              <ul>
                <li>Провести точную инвентаризацию деревьев, включая их геолокацию, породу, возраст, состояние здоровья и другие важные характеристики.</li>
                <li>Создать электронную базу данных, содержащую всю собранную информацию о зеленых насаждениях города.</li>
                <li>Разработать систему мониторинга состояния деревьев, позволяющую своевременно выявлять проблемы и принимать необходимые меры.</li>
                <li>Оптимизировать уход за зелеными насаждениями, используя полученные данные для планирования работ по озеленению, обрезке, лечению и другим мероприятиям.</li>
                <li>Повысить эффективность использования бюджетных средств, выделяемых на содержание и развитие зеленых зон.</li>
              </ul>
              <h3>Уникальная методология инвентаризации</h3>
              <p class="selected-news__description">Для проведения инвентаризации деревьев в Ташкенте была разработана уникальная методология, основанная на использовании современных технологий. В ее основе лежит комплекс мер, включающих:</p>
              <ul>
                <li>Сбор геопространственных данных: Координаты каждого дерева определяются с помощью высокоточного GPS-оборудования.</li>
                <li>Визуальное обследование: Специалисты проводят осмотр деревьев, фиксируя их породу, возраст, состояние ствола, кроны, ветвей, наличие признаков заболеваний или повреждений.</li>
                <li>Инструментальные измерения: При необходимости проводятся инструментальные измерения диаметра ствола, высоты дерева, толщины кроны и других параметров.</li>
                <li>Фотофиксация: Для каждого дерева осуществляется фотофиксация, позволяющая документировать его состояние.</li>
              </ul>
              <h3>Сбор и анализ данных</h3>
              <p>Вся собранная в ходе инвентаризации информация заносится в электронную базу данных. База данных будет содержать исчерпывающую информацию о каждом дереве, произрастающем на территории города. Это позволит проводить комплексный анализ состояния зеленых насаждений, выявлять проблемные зоны и разрабатывать эффективные программы по уходу за деревьями.</p>
              <h3>Ожидаемые результаты</h3>
              <p class="selected-news__description">Реализация проекта по инвентаризации деревьев в Ташкенте позволит создать надежную информационную основу для принятия решений в области озеленения города. Это будет способствовать:</p>
              <ul>
                <li>Сохранению и развитию зеленых зон Ташкента.</li>
                <li>Повышению качества жизни горожан.</li>
                <li>Улучшению экологической ситуации в городе.</li>
                <li>Созданию более комфортной и привлекательной городской среды.</li>
              </ul>
              <p class="selected-news__description">Проект по инвентаризации деревьев в Ташкенте является важным шагом на пути к созданию более зеленого и устойчивого города. Благодаря использованию современных технологий и уникальной методологии инвентаризации, будет создана исчерпывающая информационная база о зеленых насаждениях столицы. Это позволит оптимизировать уход за деревьями, повысить эффективность использования бюджетных средств и, в конечном итоге, создать более комфортную и здоровую городскую среду для всех жителей Ташкента.</p>
              <h3>Вклад участников проекта</h3>
              <ul>
                <li>Фонд Zamin: Инвестор проекта, обеспечивающий его финансовую поддержку.</li>
                <li>Министерство экологии Ташкента: Технический заказчик проекта, определяющий его цели, задачи и требования к результатам.</li>
                <li>Департамент цифрового развития при Хокимияте города Ташкента: Исполнитель проекта, ответственный за разработку и внедрение системы инвентаризации деревьев.</li>
              </ul>
            </div>
            <time class="news-item__date">03.06.2024</time>
            <a class="news-item__link" href="javascript:void(0)" ref="item-link" route-news="#news-2"></a>
          </div>
        </div>
      `,
      oz: /*html*/`
        <div class="news-item" ref="item" route-news="#news-2">
          <div class="news-item__left-block">
            <div class="news-item__img-wrapper">
              <img class="news-item__img" src="${Img2}" alt="Daraxt rasmi" />
            </div>
          </div>
          <div class="news-item__right-block">
            <h3 class="news-item__title">Toshkentda daraxtlarni inventarizatsiya qilish tizimini tayyorlash: yashil shaharlar sari katta qadam</h3>
            <p class="news-item__description">Zamonaviy dunyoda ekologiya va atrof-muhitga e'tibor muhim ahamiyatga ega bo'lib, yirik shaharlarda yashil zonalarni saqlash va rivojlantirishga qaratilgan loyihalar alohida ahamiyat kasb etmoqda. Shunday loyihalardan biri Zamin jamg'armasi tomonidan Toshkent Ekologiya vazirligi va Toshkent shahri hokimiyatining Raqamli rivojlanish departamenti yordamida boshlangan daraxtlarni inventarizatsiya qilish tizimini ishlab chiqishdir.</p>
            <div class="news-item__hidden-text" style="display:none;">
              <h2 class="selected-news__title">Toshkentda daraxtlarni inventarizatsiya qilish tizimini tayyorlash: yashil shaharlar sari katta qadam</h2>
              <div class="selected-news__img-wrapper">
                <img class="selected-news__img" src="${Img2}" alt="Daraxt rasmi" />
              </div>
              <p class="selected-news__description">Yashil Toshkent - bu faqatgina go'zal manzara emas, balki hayotiy zaruriyatdir. Daraxtlar bizning o'pkamiz, quyoshdan, changdan va shovqindan himoya qiladi. Lekin bu yashil qalqonni qanday saqlash mumkin? Javob oddiy: daraxtlarni inventarizatsiya qilish.</p>
              <p class="selected-news__description">Zamonaviy dunyoda ekologiya va atrof-muhitga e'tibor muhim ahamiyatga ega bo'lib, yirik shaharlarda yashil zonalarni saqlash va rivojlantirishga qaratilgan loyihalar alohida ahamiyat kasb etmoqda. Shunday loyihalardan biri Zamin jamg'armasi tomonidan Toshkent Ekologiya vazirligi va Toshkent shahri hokimiyatining Raqamli rivojlanish departamenti yordamida boshlangan daraxtlarni inventarizatsiya qilish tizimini ishlab chiqishdir.</p>
              <h3>Loyihaning maqsad va vazifalari</h3>
              <p class="selected-news__description">Loyihaning asosiy maqsadi O'zbekiston poytaxti yashil hududlarini hisobga olish va kuzatishning kompleks tizimini yaratishdir. Loyihani amalga oshirish quyidagilarga imkon beradi:</p>
              <ul>
                <li>Daraxtlarni, ularning geolokatsiyasi, turi, yoshi, sog'ligi holati va boshqa muhim xususiyatlarini aniq hisobga olishni amalga oshirish.</li>
                <li>Shahar yashil hududlari haqida to'plangan barcha ma'lumotlarni o'z ichiga olgan elektron ma'lumotlar bazasini yaratish.</li>
                <li>Daraxtlarning holatini kuzatish tizimini ishlab chiqish, bu muammolarni o'z vaqtida aniqlash va zarur choralarni ko'rishga imkon beradi.</li>
                <li>Yashil hududlarga parvarish qilishni optimallashtirish, olingan ma'lumotlardan foydalanib, ko'kalamzorlashtirish, kesish, davolash va boshqa tadbirlarni rejalashtirish.</li>
                <li>Yashil hududlarni saqlash va rivojlantirish uchun ajratilgan byudjet mablag'laridan samarali foydalanishni oshirish.</li>
              </ul>
              <h3>Inventarizatsiya uchun noyob metodologiya</h3>
              <p class="selected-news__description">Toshkentda daraxtlarni inventarizatsiya qilish uchun zamonaviy texnologiyalar asosida noyob metodologiya ishlab chiqildi. Bu metodologiya quyidagi choralardan iborat:</p>
              <ul>
                <li>Geoprostansial ma'lumotlarni yig'ish: Har bir daraxtning koordinatlari yuqori aniqlikdagi GPS-uskunalari yordamida aniqlanadi.</li>
                <li>Vizual tekshiruv: Mutaxassislar daraxtlarni ko'zdan kechirib, ularning turi, yoshi, tanasi, toj, shoxlarining holati, kasallik yoki zararlanish belgilarini qayd etadi.</li>
                <li>Asbob-uskunalar o'lchovlari: Zarurat bo'lganda tananing diametri, daraxt balandligi, toj qalinligi va boshqa parametrlari asbob-uskunalar yordamida o'lchanadi.</li>
                <li>Fotosurat: Har bir daraxtning holatini hujjatlashtirish uchun fotosurat qilinadi.</li>
              </ul>
              <h3>Ma'lumotlarni yig'ish va tahlil qilish</h3>
              <p>Inventarizatsiya davomida to'plangan barcha ma'lumotlar elektron ma'lumotlar bazasiga kiritiladi. Ma'lumotlar bazasi shaharda o'sayotgan har bir daraxt haqida to'liq ma'lumotni o'z ichiga oladi. Bu yashil hududlarning holatini kompleks tahlil qilish, muammoli hududlarni aniqlash va daraxtlarga parvarish qilish bo'yicha samarali dasturlar ishlab chiqishga imkon beradi.</p>
              <h3>Kutilayotgan natijalar</h3>
              <p class="selected-news__description">Toshkentda daraxtlarni inventarizatsiya qilish loyihasi shaharni ko'kalamzorlashtirish sohasida qarorlar qabul qilish uchun ishonchli axborot asosini yaratishga imkon beradi. Bu quyidagilarga yordam beradi:</p>
              <ul>
                <li>Toshkentning yashil zonalarini saqlash va rivojlantirish.</li>
                <li>Shahar aholisining hayot sifatini oshirish.</li>
                <li>Shahardagi ekologik vaziyatni yaxshilash.</li>
                <li>Qulay va jozibador shahar muhitini yaratish.</li>
              </ul>
              <p class="selected-news__description">Toshkentda daraxtlarni inventarizatsiya qilish loyihasi yashil va barqaror shahar yaratish yo'lida muhim qadamdir. Zamonaviy texnologiyalar va noyob metodologiya yordamida shaharning yashil hududlari haqida to'liq axborot bazasi yaratiladi. Bu daraxtlarga parvarish qilishni optimallashtirish, byudjet mablag'laridan samarali foydalanish va, oxir-oqibatda, Toshkentning barcha aholisi uchun qulay va sog'lom shahar muhitini yaratishga imkon beradi.</p>
              <h3>Loyihada ishtirokchilar hissasi</h3>
              <ul>
                <li>Zamin jamg'armasi: Loyihaning investori, uning moliyaviy qo'llab-quvvatlashini ta'minlaydi.</li>
                <li>Toshkent Ekologiya vazirligi: Loyihaning texnik buyurtmachisi, uning maqsadlari, vazifalari va natijalarga bo'lgan talablarini aniqlaydi.</li>
                <li>Toshkent shahri hokimiyatining Raqamli rivojlanish departamenti: Daraxtlarni inventarizatsiya qilish tizimini ishlab chiqish va joriy etish uchun javobgar ijrochi.</li>
              </ul>
            </div>
            <time class="news-item__date">03.06.2024</time>
            <a class="news-item__link" href="javascript:void(0)" ref="item-link" route-news="#news-2"></a>
          </div>
        </div>
      `,
      uz: /*html*/`
        <div class="news-item" ref="item" route-news="#news-2">
          <div class="news-item__left-block">
            <div class="news-item__img-wrapper">
              <img class="news-item__img" src="${Img2}" alt="Фото дерева" />
            </div>
          </div>
          <div class="news-item__right-block">
            <h3 class="news-item__title">Тошкентдаги дарахтлар инвентаризация тизимини тайёрлаш: мустақил шаҳарларнинг иқтисодиянинг зарурлидир ўткинча қадам</h3>
            <p class="news-item__description">Экология ва атрофгарликга барча етиштирилган соҳада, жаҳоннинг иқтисодия муаммолари, хусусий мақсадлар ва зелёний ёдқудратни саклаш ва ривожлантиришга ўз жиҳатларини тугатган лойиҳалар муҳим мақомни эгалади. Тошкентда дарахтлар инвентаризация тизимини ишлаб чиқиш, Тошкент марказий ҳокимлиги Дигитал ривожланиш бўлими ва Тошкент шаҳри экология манзили қоғози тўғрисида Zamin фонди ҳамроҳлигида бошланган лойиҳалардан бири.</p>
            <div class="news-item__hidden-text" style="display:none;">
              <h2 class="selected-news__title">Тошкентдаги дарахтлар инвентаризация тизимини тайёрлаш: мустақил шаҳарларнинг иқтисодиянинг зарурлидир ўткинча қадам</h2>
              <div class="selected-news__img-wrapper">
                <img class="selected-news__img" src="${Img2}" alt="Фото дерева" />
              </div>
              <p class="selected-news__description">Ташкент, зарёрлар ичидаги шаҳар - бу просто қизиқарли расм эмас, балки зарур воқеа. Дарахтлар - бизнинг ўткинча, жалб қилишга қарши, қалб-қабз, тола ва шу ҳолда кўп бошқа муҳим хусусиятлардир.</p>
              <p class="selected-news__description">Экология ва атрофгарликга барча етиштирилган соҳада, жаҳоннинг иқтисодия муаммолари, хусусий мақсадлар ва зелёний ёдқудратни саклаш ва ривожлантиришга ўз жиҳатларини тугатган лойиҳалар муҳим мақомни эгалади. Тошкентда дарахтлар инвентаризация тизимини ишлаб чиқиш, Тошкент марказий ҳокимлиги Дигитал ривожланиш бўлими ва Тошкент шаҳри экология манзили қоғози тўғрисида Zamin фонди ҳамроҳлигида бошланган лойиҳалардан бири.</p>
              <h3>Лойиҳанинг мақсад ва вазифалари</h3>
              <p class="selected-news__description">Лойиҳанинг асосий мақсади - Озбекистон республикаси столицасининг зелёндастларини ҳисобга олиш ва кўзгуни бўйича мониторинг тизимини яратиш. Лойиҳанинг амалиётга келиши бўйича ўз вазифаларни бажариш:</p>
              <ul>
                <li>Дарахтларнинг точик инвентаризациясини олиш, уларнинг геолокацияси, турмуши, ёшлиги, тиббий ҳолати ва бошқа муҳим хусусиятлари билан биргаликда.</li>
                <li>Хамма маълумотларни ўз ичига олиш учун электрон маълумотлар базаси яратиш, шаҳр зелёндастлари ҳақида барча жамоа эга маълумотларни ҳамда.</li>
                <li>Дарахтларнинг ҳолати мониторинги тизимини ишлаб чиқиш, муаммоларни замонавий топшириш ва зарур мақомларни олдириш имкониятини бериш.</li>
                <li>Зелёндастларга қайта топшириш, тарқатиш, тиббиётлаш ва бошқа чора-тадбирларни планлаш учун маълумотлардан фойдаланиш.</li>
                <li>Молия воситалари фойдаланишини таъминлашда эффективликни ошириш.</li>
              </ul>
              <h3>Инвентаризациянинг униклаштирилган методологияси</h3>
              <p class="selected-news__description">Тошкентда дарахтлар инвентаризациясини олиш учун, янги технологиялардан фойдаланиш асосида униклаштирилган методология ишлаб чиқилган. Унинг асосида қўйилган марказий технологиялардан фойдаланилади:</p>
              <ul>
                <li>Геопространствен маълумотларни жамлаш: ҳар бир дарахтнинг координатлари юқори точикликдаги GPS-қурилмалар идораси орқали белгиланади.</li>
                <li>Кўриш ва анкеталаш: Мутахассислар дарахтларни кўриб чиқаради, уларнинг турмуши, ёшлиги, ствол, тўққа, шох ва дамларнинг ҳолати, касалликлар ёки зарарланмалар мавжудлиги ҳақида маълумотларни ёзади.</li>
                <li>Иловачи ўлчовлар: Зарур бўлган ҳолда ствол диаметри, дарахт баландлиги, тўққа кенглиги ва бошқа параметрлар ўлчаш ўтказилади.</li>
                <li>Фотошакллантириш: ҳар бир дарахт учун фотошакллантириш амалга оширилади, унинг ҳолатини ҳужжатлаш мумкин бўлади.</li>
              </ul>
              <h3>Маълумотларни жамлаш ва таҳлил</h3>
              <p>Инвентаризация якунларидаги барча маълумотлар электрон маълумотлар базасига киритилади. Маълумотлар базаси шаҳр майдонидаги ҳар бир дарахт ҳақида тўлиқ маълумотларни ўз ичига олиши мумкин бўлади. Бу, зелёндастларнинг ҳолатини тўлиқ таҳлил қилишга ва муаммоли майдонларни аниқлашга имконият яратади.</p>
              <h3>Кутилган натижалар</h3>
              <p class="selected-news__description">Тошкентдаги дарахтлар инвентаризация лойиҳасини амалга ошириш мақсадида, шаҳарни ёзиш масалаларига қарор қабул қилиш учун ишончли маълумот базасини яратиш имконияти яратилади. Бу, кўк илмий ёдқудратни сақлашга ёрдам беради:</p>
              <ul>
                <li>Тошкент зелёндастлик майдонларини саклаш ва ривожлантириш.</li>
                <li>Шаҳар жамоатининг меҳнат мақомини ошириш.</li>
                <li>Шаҳар иккизлари муҳитини яхшилаш.</li>
                <li>Кўк илмий ва кўнгилча шаҳар майдонини яратиш.</li>
              </ul>
              <p class="selected-news__description">Тошкентдаги дарахтлар инвентаризация лойиҳаси, замонавий технологиялар ва униклаштирилган методология фойдаланиши тармоғида шаҳр зелёндастлигининг ҳолатини таҳлил қилиш учун тўлиқ маълумотлар базаси яратади. Бу, дарахтларга нисбатан таъминотчиликни ошириш, бюджет молияси фондларининг фойдаланилиш эффективлигини ошириш ва натижада, барча Тошкент аҳолига кўкча ва саломлик майдон яратиш имкониятини таъминлайди.</p>
              <h3>Лойиҳа иштирокчиларининг ҳиссаси</h3>
              <ul>
                <li>Zamin фонди: Лойиҳанинг иштирокчиси, унинг молиявий қўллаб-қувватлашини таъминлайди.</li>
                <li>Тошкент экология манзили: Лойиҳанинг техник фармончиси, унинг мақсадлари, вазифалари ва натижаларига баҳолаш бўйича ўз ишончли қарорларни қабул қилади.</li>
                <li>Тошкент шаҳри хокимияти Дигитал ривожланиш бўлими: Лойиҳанинг амалий қисми, дарахтлар инвентаризация тизимини ишлаб чиқиш ва ташқи меҳнатларни амалга ошириш учун масъул.</li>
              </ul>
            </div>
            <time class="news-item__date">03.06.2024</time>
            <a class="news-item__link" href="javascript:void(0)" ref="item-link" route-news="#news-2"></a>
          </div>
        </div>
      `
    }
  ];

  public events(): void {
    this.eventHandler.subscribe("back-btn", "back-route-event", "click", this.backClickHandler);
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
            this.refs["selected-news"].classList.remove("active");
            this.refs["animation-wrapper"].innerHTML = "";

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

  public backClickHandler(): void {
    this.cleanUpSelectedNews();

    for (let i = 0; i < this.refs["item"].length; ++i) {
      this.refs["item"][i].style.display = "flex";
    }

    PlayFadeInAnimation(this.refs["news-list"], 1000);
  }

  public generateList(): void {
    this.refs["news-list"].innerHTML = "";

    for (let i = 0; i < this.hashList.length; ++i) {
      let hashItem: { hash: string; ru: string; oz: string; uz: string; } = this.hashList[i];
      this.refs["news-list"].innerHTML += /*html*/`<li>${hashItem[this.lang]}</li>`;
    }

    this.shadowDOM.observeRefs();
    this.eventHandler.subscribe("item-link", "item-link-event", "click", this.onLinkClick);

    this.renderSelectedNews(localStorage.getItem("selected-news"));
  }

  public onLinkClick(event: MouseEvent): void {
    let link: HTMLAnchorElement = event.target as HTMLAnchorElement;
    let routeNewsAttr: string = link.getAttribute("route-news");

    this.renderSelectedNews(routeNewsAttr, () => {
      localStorage.setItem("selected-news", routeNewsAttr);
    });

    PlayFadeInAnimation(this.refs["selected-news"], 1000);
  }

  public renderSelectedNews(newsID: string, callback?: () => void): void {
    if (newsID) {
      this.shadowDOM.observeRefs();

      for (let i = 0; i < this.refs["item"].length; ++i) {
        let item: HTMLElement = this.refs["item"][i];
        let hiddenHTML: string = item.querySelector(".news-item__hidden-text").innerHTML;
        let routeNewsAttr: string = item.getAttribute("route-news");

        if (routeNewsAttr === newsID) {
          item.style.display = "none";
          this.refs["selected-news"].classList.add("active");
          this.refs["animation-wrapper"].innerHTML = hiddenHTML;
        } else {
          item.style.display = "flex";
        }
      }

      PlayFadeInAnimation(this.refs["news-list"], 100);
      this.refs["title"].style.display = "none";

      if (callback) {
        callback();
      }
    }
  }

  public cleanUpSelectedNews(): void {
    try {
      this.selectedNewsNode.classList.remove("active");
      this.animationWrapperNode.innerHTML = "";
      localStorage.removeItem("selected-news");
      this.titleNode.style.display = "flex";
    } catch (err) {
      console.error(err);
    }
  }
}
