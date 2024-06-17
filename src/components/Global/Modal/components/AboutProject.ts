import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ModalBase from "./ModalBase";
// @ts-ignore
import sass from "!css-loader!sass-loader!./AboutProject.scss";

const template: string = /*html*/`
  <h2 ref-data="selectedContent.title"></h2>
  <div class="content-wrapper">
    <ul class="content-tabs" ref="content-tabs"></ul>
    <hr>
    <article class="content-article" ref="article"></article>
  </div>
`;

@DefineComponent({
  tag: "modal-about-project"
})
export default class ModalAboutProject extends ModalBase {
  constructor() {
    super({
      template,
      styles: {
        sass,
        links: ["margins"]
      }
    });
  }

  public data: {} = {
    renderedHTMLTemplate: false,
    selectedTemplate: "",
    contents: {
      ru: {
        title: "О проекте",
        contentTypeList: {
          "0": {
            name: "О проекте",
            template: /*html*/`
              <p>Фонд Zamin, Министерство экологии Ташкента и Департамент цифрового развития при Хокимияте города Ташкента объединились, чтобы реализовать масштабный проект по инвентаризации деревьев столицы.</p>
              <h3>Цель проекта:</h3>
              <ul>
                <li>Создать электронную базу данных, содержащую всю информацию о зеленых насаждениях города.</li>
                <li>Разработать систему мониторинга состояния деревьев.</li>
                <li>Оптимизировать уход за зелеными насаждениями.</li>
                <li>Повысить эффективность использования бюджетных средств.</li>
              </ul>
              <h3>Почему это важно?</h3>
              <ul>
                <li>Инвентаризация позволит узнать точное количество, породу, возраст, состояние здоровья и другие важные характеристики деревьев.</li>
                <li>Это поможет эффективно планировать работы по озеленению, обрезке, лечению и другим мероприятиям.</li>
                <li>Мониторинг состояния деревьев позволит своевременно выявлять проблемы и принимать меры.</li>
                <li>Рациональное использование бюджетных средств позволит сделать больше для сохранения и развития зеленых зон города.</li>
              </ul>
              <h3>Как мы работаем:</h3>
              <ul>
                <li>Используем современные технологии, такие как GPS-оборудование, фотофиксация и инструментальные измерения.</li>
                <li>Собрали команду опытных специалистов, которые проводят визуальное обследование деревьев.</li>
                <li>Разрабатываем уникальную методологию инвентаризации, учитывающую особенности города.</li>
              </ul>
              <h3>Присоединяйтесь к нам!</h3>
              <ul>
                <li>Следите за новостями проекта на нашем сайте.</li>
                <li>Расскажите о проекте своим друзьям и знакомым.</li>
                <li>Поддержите проект своими пожертвованиями.</li>
              </ul>
              <p>Вместе мы сделаем Ташкент еще более зеленым и комфортным городом!</p>
            `
          },
          "1": {
            name: "Технологии",
            template: /*html*/`
              <h2>Методология инвентаризации деревьев города Ташкента: шаг к экологичной столице</h2>
              <p>В современном мире, где вопросы экологии выходят на первый план, особое значение приобретает забота о зеленых насаждениях. Город Ташкент, являясь одним из крупнейших мегаполисов Центральной Азии, не остается в стороне от этой тенденции. Для эффективного управления зеленым фондом города специалистами Департамента цифрового развития при Хокимияте города Ташкента была разработана уникальная методология инвентаризации деревьев.</p>
              <h3>Основа методологии – точность позиционирования</h3>
              <p>Главной особенностью данной методологии является высокая точность определения координат каждого дерева. Достигается она за счет использования современного программно-аппаратного комплекса, включающего GPS-приемники и GNSS-технологии. Такой подход позволяет позиционировать деревья с точностью до 1 сантиметра, исключая влияние человеческого фактора и сводя погрешность к минимуму.</p>
              <h3>Информационные технологии на службе экологии</h3>
              <p>Полученные в ходе инвентаризации данные будут занесены в единую информационную систему. Это позволит не только иметь точный учет количества и видов деревьев, но и проводить комплексный анализ их состояния, выявлять проблемные зоны и принимать обоснованные решения по их устранению.</p>
              <h3>Использование новейших технологий в инвентаризации деревьев имеет ряд неоспоримых преимуществ:</h3>
              <ul>
                <li><strong>Высокая точность:</strong> Точное позиционирование деревьев позволяет оптимизировать маршруты обследования, сократить время работы и повысить качество данных.</li>
                <li><strong>Объективность:</strong> Использование GPS/GNSS-технологий исключает влияние человеческого фактора и гарантирует объективность результатов.</li>
                <li><strong>Аналитические возможности:</strong> Информационная система, в которую будут занесены данные, позволит проводить глубокий анализ состояния зеленых насаждений, выявлять проблемные зоны и разрабатывать эффективные меры по их устранению.</li>
                <li><strong>Прозрачность:</strong> Открытый доступ к информации о зеленых насаждениях города будет способствовать повышению прозрачности работы государственных органов и вовлечению общественности в решение экологических проблем.</li>
              </ul>
              <h3>Закуплено 100 комплектов оборудования</h3>
              <p>Для реализации данной методологии при поддержке фонда Zamin, Департаментом цифрового развития было закуплено 100 комплектов оборудования, предназначенного для полевых сотрудников и волонтеров. Это позволит охватить все районы города и провести инвентаризацию деревьев в максимально короткие сроки.</p>
              <h3>Шаг к экологичной столице</h3>
              <p>Применение современной методологии инвентаризации деревьев является важным шагом на пути к созданию экологически благоприятной среды в Ташкенте. Использование новейших технологий позволит не только сохранить существующие зеленые насаждения, но и заложить основы для их дальнейшего развития.</p>
              <p>Важно отметить, что данная методология может быть успешно применена и в других городах Узбекистана, что позволит повысить уровень</p>
            `
          }
        }
      },
      oz: {
        title: "Proekt haqida",
        contentTypeList: {
          "0": {
            name: "Loyiha haqida",
            template: /*html*/`
              <p>Zamin Fоndi, Toshkent Ekologiya vazirligi va Toshkent shahar hokimiyati huzuridagi Raqamli rivojlanish departamenti poytaxt daraxtlarini inventarizatsiya qilish bo'yicha keng ko'lamli loyihani amalga oshirish uchun birlashdilar.</p>
              <h3>Loyihaning maqsadi:</h3>
              <ul>
                <li>Shahar yashil nasajdeniyalari haqida barcha ma'lumotlarni o'z ichiga olgan elektron ma'lumotlar bazasini yaratish.</li>
                <li>Daraxtlar holatini monitoring qilish tizimini ishlab chiqish.</li>
                <li>Yashil nasajdeniyalarni parvarish qilishni optimallashtirish.</li>
                <li>Byudjet mablag'laridan foydalanish samaradorligini oshirish.</li>
              </ul>
              <h3>Nima uchun bu muhim?</h3>
              <ul>
                <li>Inventarizatsiya daraxtlarning aniq soni, turi, yoshi, sog'lig'i holati va boshqa muhim xususiyatlarini bilish imkonini beradi.</li>
                <li>Bu ozlashtirish, kesish, davolash va boshqa tadbirlarni samarali rejalashtirishga yordam beradi.</li>
                <li>Daraxtlar holatini monitoring qilish muammolarni o'z vaqtida aniqlash va chora ko'rishga imkon beradi.</li>
                <li>Byudjet mablag'laridan ratsional foydalanish shahar yashil hududlarini saqlash va rivojlantirish uchun ko'proq ishlarni amalga oshirish imkonini beradi.</li>
              </ul>
              <h3>Qanday ishlaymiz:</h3>
              <ul>
                <li>GPS-uskuna, fotofiksatsiya va asbob-uskunalar bilan o'lchash kabi zamonaviy texnologiyalardan foydalanamiz.</li>
                <li>Daraxtlarni vizual tekshiruvdan o'tkazadigan tajribali mutaxassislar jamoasini yig'dik.</li>
                <li>Shaharning o'ziga xos xususiyatlarini hisobga olgan holda noyob inventarizatsiya metodologiyasini ishlab chiqmoqdamiz.</li>
              </ul>
              <h3>Bizga qo'shiling!</h3>
              <ul>
                <li>Loyihaning yangiliklarini veb-saytimizda kuzatib boring.</li>
                <li>Loyihani do'stlaringiz va tanishlaringizga ayting.</li>
                <li>Loyihani o'z xayriyalariniz bilan qo'llab-quvvatlang.</li>
              </ul>
              <p>Birgalikda biz Toshkentni yanada yashil va qulay shahar qilamiz!</p>
            `
          },
          "1": {
            name: "Texnologiyalar",
            template: /*html*/`
              <h2>Metodologiya inventarizatsiyasi daraxtlar shahri Toshkent: qadam ekologik poytaxt</h2>
              <p>Zamonaviy dunyoda ekologiya masalalari birinchi o'ringa chiqqan bir paytda, yashil nasajdeniyalarga g'amxo'rlik qilish alohida ahamiyat kasb etadi. Toshkent shahri, Markaziy Osiyoning eng yirik megapolislardan biri bo'lib, bu tendensiyadan chetda qolmaydi. Shaharning yashil fondini samarali boshqarish uchun Toshkent shahri hokimiyati huzuridagi Raqamli rivojlanish departamenti mutaxassislari tomonidan noyob daraxtlarni inventarizatsiya qilish metodologiyasi ishlab chiqildi.</p>
              <h3>Metodologiyaning asosi – aniqlik va joylashuv</h3>
              <p>Ushbu metodologiyaning asosiy xususiyati har bir daraxt koordinatalarini aniqlik bilan aniqlashdir. Bu zamonaviy dasturiy-apparat kompleksidan, jumladan, GPS-qabul qiluvchilar va GNSS-texnologiyalaridan foydalanish orqali amalga oshiriladi. Bunday yondashuv daraxtlarni inson omilining ta'sirini bartaraf etgan holda, minimal xatolik bilan 1 santimetrgacha aniqlikda joylashishga imkon beradi.</p>
              <h3>Axborot texnologiyalari ekologiya xizmatida</h3>
              <p>Inventarizatsiya davomida olingan ma'lumotlar yagona axborot tizimiga kiritiladi. Bu nafaqat daraxtlar soni va turlari bo'yicha aniq hisob-kitobga ega bo'lishga, balki ularning holatini kompleks tahlil qilishga, muammoli hududlarni aniqlashga va ularni bartaraf etish bo'yicha asosli qarorlar qabul qilishga imkon beradi.</p>
              <h3>Daraxtlarni inventarizatsiya qilishda eng yangi texnologiyalardan foydalanishning bir qator shubhasiz afzalliklari mavjud:</h3>
              <ul>
                <li><strong>Yuqori aniqlik:</strong> Daraxtlarning aniq joylashuvi tekshirish marshrutlarini optimallashtirish, ish vaqtini qisqartirish va ma'lumotlar sifatini oshirish imkonini beradi.</li>
                <li><strong>Obyektivlik:</strong> GPS/GNSS texnologiyalaridan foydalanish inson omilining ta'sirini bartaraf etadi va natijalar obyektivligini kafolatlaydi.</li>
                <li><strong>Analitik imkoniyatlar:</strong> Ma'lumotlar kiritiladigan axborot tizimi yashil nasajdeniyalarning holatini chuqur tahlil qilish, muammoli hududlarni aniqlash va ularni bartaraf etish bo'yicha samarali choralar ishlab chiqish imkonini beradi.</li>
                <li><strong>Shaffoflik:</strong> Shahar yashil nasajdeniyalari haqidagi ma'lumotlarga ochiq kirish davlat organlari ishining shaffofligini oshirishga va jamoatchilikni ekologik muammolarni hal qilishga jalb qilishga yordam beradi.</li>
              </ul>
              <h3>100 to'plam uskunalar sotib olindi.</h3>
              <p>Ushbu metodologiyani amalga oshirish uchun Zamin fondi ko'magida, Raqamli rivojlanish departamenti tomonidan dala xodimlari va ko'ngillilar uchun mo'ljallangan 100 ta uskuna to'plami sotib olindi. Bu shaharning barcha tumanlarini qamrab olish va daraxtlarni imkon qadar qisqa muddatda inventarizatsiya qilish imkonini beradi.</p>
              <h3>Ekologik poytaxtga qadam</h3>
              <p>Zamonaviy daraxtlarni inventarizatsiya qilish metodologiyasidan foydalanish Toshkentda ekologik jihatdan qulay muhit yaratish yo'lidagi muhim qadamdir. Eng yangi texnologiyalardan foydalanish nafaqat mavjud yashil nasajdeniyalarni saqlab qolishga, balki ularni yanada rivojlantirishga zamin yaratishga imkon beradi. Ta'kidlash joizki, ushbu metodologiya O'zbekistonning boshqa shaharlarida ham muvaffaqiyatli qo'llanilishi mumkin, bu esa obodonlashtirish darajasini oshirish va mamlakatdagi ekologik vaziyatni yaxshilashga yordam beradi.</p>
            `
          }
        }
      },
      uz: {
        title: "Проект хақида",
        contentTypeList: {
          "0": {
            name: "Лойиҳа ҳақида",
            template: /*html*/`
              <p>Замин Фонди, Тошкент Экология вазирлиги ва Тошкент шаҳар ҳокимияти ҳузуридаги Рақамли ривожланиш департаменти пойтахт дарахтларини инвентаризация қилиш бўйича кенг кўламли лойиҳани амалга ошириш учун бирлашдилар.</p>
              <h3>Лойиҳанинг мақсади:</h3>
              <ul>
                <li>Шаҳар яшил насаждениелари ҳақида барча маълумотларни ўз ичига олган электрон маълумотлар базасини яратиш.</li>
                <li>Дарахтлар ҳолатини мониторинг қилиш тизимини ишлаб чиқиш.</li>
                <li>Яшил насаждениеларни парвариш қилишни оптималлаштириш.</li>
                <li>Бюджет маблағларидан фойдаланиш самарадорлигини ошириш.</li>
              </ul>
              <h3>Нима учун бу муҳим?</h3>
              <ul>
                <li>Инвентаризация дарахтларнинг аниқ сони, тури, ёши, соғлиги ҳолати ва бошқа муҳим хусусиятларини билиш имконини беради.</li>
                <li>Бу озлаштириш, кесиш, даволаш ва бошқа тадбирларни самарали режалаштиришга ёрдам беради.</li>
                <li>Дарахтлар ҳолатини мониторинг қилиш муаммоларни ўз вақтида аниқлаш ва чора кўришга имкон беради.</li>
                <li>Бюджет маблағларидан рационал фойдаланиш шаҳар яшил ҳудудларини сақлаш ва ривожлантириш учун кўпроқ ишларини амалга ошириш имконини беради.</li>
              </ul>
              <h3>Қандай ишлаймиз:</h3>
              <ul>
                <li>GPS-ускуна, фотофиксация ва асбоб-ускуналар билан ўлчаш каби замонавий технологиялардан фойдаланамиз.</li>
                <li>Дарахтларни визуал текширувдан ўтказадиган тажрибали мутахассислар жамоасини йиғдик.</li>
                <li>Шаҳарнинг ўзига хос хусусиятларини ҳисобга олган ҳолда ноёб инвентаризация методологиясини ишлаб чиқмоқдамиз.</li>
              </ul>
              <h3>Бизга қўшилинг!</strong></p>
              <ul>
                <li>Лойиҳанинг янгиликларини веб-сайтимизда кузатиб боринг.</li>
                <li>Лойиҳани дўстларингиз ва танишларингизга айтинг.</li>
                <li>Лойиҳани ўз хайриялариниз билан қўллаб-қувватланг.</li>
              </ul>
              <p>Биргаликда биз Тошкентни янада яшил ва қулай шаҳар қиламиз!</p>
            `
          },
          "1": {
            name: "Технологиялар",
            template: /*html*/`
              <h2>Методология инвентаризацияси дарахтлар шаҳри Тошкент: қадам экологик пойтахт</h2>
              <p>Замонавий дунёда экология масалалари биринчи ўринга чиққан бир пайтда, яшил насажденияларга ғамхўрлик қилиш алоҳида аҳамият касб этади. Тошкент шаҳри, Марказий Осиёнинг энг йирик мегаполисларидан бири бўлиб, бу тенденциядан четда қолмайди. Шаҳарнинг яшил фондини самарали бошқариш учун Тошкент шаҳар ҳокимияти ҳузуридаги Рақамли ривожланиш департаменти мутахассислари томонидан ноёб дарахтларни инвентаризация қилиш методологияси ишлаб чиқилди.</p>
              <h3>Методологиянинг асоси – аниқлик ва жойлашув</h3>
              <p>Ушбу методологиянинг асосий хусусияти ҳар бир дарахт координаталарини аниқлик билан аниқлашдир. Бу замонавий дастурий-аппарат комплексидан, жумладан, GPS-қабул қилувчилар ва GNSS-технологияларидан фойдаланиш орқали амалга оширилади. Бундай ёндашув дарахтларни инсон омилининг таъсирини бартараф этган ҳолда, минимал хатолик билан 1 сантиметргача аниқликда жойлашишга имкон беради.</p>
              <h3>Ахборот технологиялари экология хизматда</h3>
              <p>Инвентаризация давомида олинган маълумотлар ягона ахборот тизимига киритилади. Бу нафақат дарахтлар сони ва турлари бўйича аниқ ҳисоб-китобга эга бўлишга, балки уларнинг ҳолатини комплекс таҳлил қилишга, муаммоли ҳудудларни аниқлашга ва уларни бартараф этиш бўйича асосли қарорлар қабул қилишга имкон беради.</p>
              <p>Дарахтларни инвентаризация қилишда энг янги технологиялардан фойдаланишнинг бир қатор шубҳасиз афзалликлари мавжуд:</p>
              <ul>
                <li>Юқори аниқлик: Дарахтларнинг аниқ жойлашуви текшириш маршрутларини оптималлаштириш, иш вақтини қисқартириш ва маълумотлар сифатини ошириш имконини беради.</li>
                <li>Объективлик: GPS/GNSS технологияларидан фойдаланиш инсон омилининг таъсирини бартараф этади ва натижалар объективлигини кафолатлайди.</li>
                <li>Аналитик имкониятлар: Маълумотлар киритиладиган ахборот тизими яшил насажденияларнинг ҳолатини чуқур таҳлил қилиш, муаммоли ҳудудларни аниқлаш ва уларни бартараф этиш бўйича самарали чоралар ишлаб чиқиш имконини беради.</li>
                <li>Шаффофлик: Шаҳар яшил насаждениялари ҳақидаги маълумотларга очиқ кириш давлат органлари ишининг шаффофлигини оширишга ва жамоатчиликни экологик муаммоларни ҳал қилишга жалб қилишга ёрдам беради.</li>
              </ul>
              <h3>100 тўплам ускуналар сотиб олинди</h3>
              <p>Ушбу методологияни амалга ошириш учун Замин фонди кўмагида, Рақамли ривожланиш департаменти томонидан дала ходимлари ва кўнгиллилар учун мўлжалланган 100 та ускуна тўплами сотиб олинди. Бу шаҳарнинг барча туманларини қамраб олиш ва дарахтларни имкони қадар қисқа муддатда инвентаризация қилиш имконини беради.</p>
              <h3>Экологик пойтахтга қадам</h3>
              <p>Замонавий дарахтларни инвентаризация қилиш методологиясидан фойдаланиш Тошкентда экологик жиҳатдан қулай муҳит яратиш йўлидаги муҳим қадамдир. Энг янги технологиялардан фойдаланиш нафақат мавжуд яшил насажденияларни сақлаб қолишга, балки уларни янада ривожлантиришга замин яратишга имкон беради. Таъкидлаш жоизки, ушбу методология Ўзбекистоннинг бошқа шаҳарларида ҳам муваффақиятли қўлланилиши мумкин, бу эса ободонлаштириш даражасини ошириш ва мамлакатдаги экологик вазиятни яхшилашга ёрдам беради.</p>
            `
          }
        }
      }
    },
    selectedContent: {}
  }

  public override onConnected(): void {
    this.updateLanguage<ModalBase>(this);

    if (!this.refProxy["renderedHTMLTemplate"]) {
      setTimeout(() => this.renderHTMLTemplate());
    }
  }

  public renderHTMLTemplate(): void {
    for (const [key] of Object.entries(this.refProxy["selectedContent"]["contentTypeList"])) {
      const tabLiNode: HTMLLIElement = document.createElement("li");

      tabLiNode.innerHTML = /*html*/`
        <button
          type="button"
          class="content-tabs__btn"
          ref="tabs"
          ref-data="selectedContent.contentTypeList.${key}.name"
          set-template="selectedContent.contentTypeList.${key}.template"
        ></button>
      `;

      this.refs["content-tabs"].appendChild(tabLiNode);
    }

    this.shadowDOM.observeRefs();
    this.refProxy["renderedHTMLTemplate"] = true;

    this.refProxy["selectedTabName"] = this.refProxy["selectedContent"]["contentTypeList"]["0"]["name"];
    this.refs["tabs"][0].classList.add("active");
    this.refs["article"].setAttribute("ref-data", "selectedContent.contentTypeList.0.template");
    this.refs["article"].setAttribute("set-html", "");

    this.attachEventListeners();
  }

  public events(): void {
    this.eventHandler.subscribe("tabs", "tabs-event", "click", this.onTabClickHandler);
  }

  public attachEventListeners(): void {
    this.eventHandler.subscribe("tabs", "tabs-event", "click", this.onTabClickHandler);
  }

  public onTabClickHandler(event: MouseEvent): void {
    this.refs["tabs"].forEach((tab: HTMLButtonElement) => tab.classList.remove("active"));
    let tabBtn: HTMLButtonElement = event.target as HTMLButtonElement;
    tabBtn.classList.add("active");
    this.refs["article"].setAttribute("ref-data", tabBtn.getAttribute("set-template"));
  }
}
