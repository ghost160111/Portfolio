import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import ModalBase from "./ModalBase";
// @ts-ignore
import sass from "!css-loader!sass-loader!./Policy.scss";

const template: string = /*html*/ `
  <h2 ref-data="selectedContent.title"></h2>
  <div ref-data="selectedContent.template" set-html></div>
`;

@DefineComponent({
  tag: "modal-policy",
})
export default class ModalPolicy extends ModalBase {
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
    contents: {
      ru: {
        title: "Политика конфиденциальности",
        template: /*html*/`
          <p>Настоящая Политика конфиденциальности является публичным Договором, заключенным между ООО «Raqamli rivojlanish departamenti» - владельцем Сайта green.tashkent.uz, юридический адрес: Узбекистан, город Ташкент, Чиланзарский район, ул.И.Каримова, дом 51, далее «Оператор», и «Пользователем». Настоящая Политика конфиденциальности основана на Законе Республики Узбекистан Республики Узбекистан от 02.07.2019 г. N ЗРУ-547 "О персональных данных", действует в отношении всей информации, которую «Оператор» может получить о «Пользователе» во время использования сайта green.tashkent.uz.</p>
          <p>1. Определение терминов</p>
          <p>1.1. «Сайт» - сайт, расположенный в сети Интернет по адресу green.tashkent.uz. Все исключительные права на Сайт и его отдельные элементы (включая программное обеспечение, дизайн) принадлежат Оператору в полном объеме.</p>
          <p>1.2. «Администрация сайта» - уполномоченные сотрудники на управление Сайтом, действующие от имени ООО «Raqamli rivojlanish departamenti», которые организуют и (или) осуществляет обработку персональных данных, а также определяют цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.</p>
          <p>1.3. «Пользователь» — лицо использующее Сайт.</p>
          <p>1.4. «Законодательство» — действующее законодательство Республики Узбекистан.</p>
          <p>1.5. «Персональные данные» — персональные данные Пользователя, которые Пользователь предоставляет в процессе использования функционала Сайта.</p>
          <p>1.6. «Неличные данные» - сведения, которые автоматически передаются при посещении Пользователем страниц, на которых установлен статистический скрипт системы (пиксель).</p>
          <p>1.7. Обработка персональных данных - любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</p>
          <p>1.8. Сервисы сайта - совокупность данных, доступных на Сайте.</p>
          <p>1.9. Конфиденциальность персональных данных - обязательное для соблюдения Оператором или иным получивши¬м доступ к персональным данным лицом требование не допускать их распространения без согласия субъекта персональных данных или наличия иного законного основания.</p>
          <p>1.10. «Оператор» - владелец Сайта.</p>
          <p>1.11. Cookies - фрагмент данных, отправленный веб-сервером и хранимый на компьютере Пользователя, который веб-клиент или веб-браузер каждый раз пересылает веб-серверу в HTTP-запросе при попытке открыть страницу Сайта.</p>
          <p>1.12. IP-адрес - уникальный сетевой адрес узла в компьютерной сети, построенной по протоколу IP.</p>
          <p>2. Общие положения</p>
          <p>2.1. Передавая «Оператору» персональные данные посредством «Сайта», «Пользователь»» подтверждает свое согласие на использование указанных данных на условиях, изложенных в Политике конфиденциальности.</p>
          <p>2.2. Если «Пользователь» не согласен с условиями Политики конфиденциальности, он обязан прекратить использование «Сайта».</p>
          <p>2.3. «Сайт» «Оператора» может содержать ссылки на другие веб сайты. «Оператор» не несет ответственности за политику конфиденциальности веб-сайтов, которые управляются не «Оператором». Настоящая Политика Конфиденциальности применяется исключительно к информации собранной «Оператором» на Сайте.</p>
          <p>2.4. «Оператор» не проверяет достоверность персональных данных, предоставляемых «Пользователем». Однако, «Оператор» исходит из того, что «Пользователь» предоставляет достоверные персональные данные и поддерживает эти данные в актуальном состоянии. Всю ответственность, а также возможные последствия за предоставление недостоверных или не актуальных персональных данных несет «Пользователь».</p>
          <p>3. Предмет Политики конфиденциальности</p>
          <p>3.1. Настоящая Политика конфиденциальности устанавливает обязательства «Оператора» по неразглашению и обеспечению режима защиты конфиденциальности персональных данных, которые «Пользователь» предоставляет при использовании любых Сервисов сайта.</p>
          <p>3.2. «Персональные данные», разрешенные к обработке в рамках настоящей Политики конфиденциальности
          <p>3.5. «Сайт» осуществляет сбор статистики об IP-адресах своих Посетителей. Данная информация используется с целью выявления и решения технических проблем.</p>
          <p>3.6. Любая иная персональная информация неоговоренная выше подлежит надежному хранению и нераспространению, за исключением случаев, предусмотренных в настоящей Политики конфиденциальности.</p>
          <p>4. Цели сбора «Персональных данных»</p>
          <p>4.1. «Оператор» собирает и хранит только те «Персональные данные», которые необходимы для Сервисов сайта и взаимодействия с «Пользователем».</p>
          <p>4.2. «Персональные данные» могут использоваться в следующих целях:</p>
          <p>4.2.1. предоставление информации «Пользователю»;</p>
          <p>4.2.2. идентификация «Пользователя»;</p>
          <p>4.2.3. взаимодействие с «Пользователем»;</p>
          <p>4.2.4. направление «Пользователю» информации и запросов;</p>
          <p>4.2.5. проведение статистических и иных исследований.</p>
          <p>5. Порядок и сроки обработки «Персональных данных»</p>
          <p>5.1. Обработка персональных данных «Пользователя» осуществляется без ограничения срока, любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств.</p>
          <p>5.2. «Оператор» обязуется использовать «Персональные данные» в соответствии с Законом «О персональных данных» Республики Узбекистан и внутренними документами «Оператора».</p>
          <p>5.3. «Оператор» имеет право передавать «Персональные данные» и «Неличные данные» без согласия «Пользователя» следующим лицам:</p>
          <p>5.3.1. государственным органам, в том числе правоохранительным органам и судам по их мотивированному запросу;</p>
          <p>5.3.2. в иных случаях, прямо предусмотренных действующим законодательством Республики Узбекистан.</p>
          <p>5.4. «Оператор» имеет право передавать «Персональные данные» третьим лицам, не указанным в п.5.3. настоящей Политики конфиденциальности, в следующих случаях:</p>
          <p>5.4.1. «Пользователь» выразил свое согласие на такие действия;</p>
          <p>5.4.2. Передача необходима в рамках использования «Пользователем» «Сайта».</p>
          <p>6. Защита персональных данных</p>
          <p>6.1. Оператор осуществляет надлежащую защиту Персональных и иных данных в соответствии с Законодательством и принимает необходимые и достаточные организационные и технические меры для защиты Персональных данных.</p>
          <p>7. Иные положения</p>
          <p>7.1. К настоящей Политике конфиденциальности и отношениям между «Пользователем» и «Оператором», возникающим в связи с применением Политики конфиденциальности, подлежит применению законодательство Республики Узбекистан.</p>
          <p>7.2. Все возможные споры, вытекающие из настоящего Соглашения, подлежат разрешению в соответствии с действующим законодательством по месту регистрации «Оператора». Перед обращением в суд «Пользователь» должен соблюсти обязательный досудебный порядок и направить «Оператору» соответствующую претензию в письменном виде. Срок ответа на претензию составляет 30 (тридцать) рабочих дней.</p>
          <p>7.3. Если по тем или иным причинам одно или несколько положений Политики конфиденциальности будут признаны недействительными или не имеющими юридической силы, это не оказывает влияния на действительность или применимость остальных положений Политики конфиденциальности.</p>
          <p>7.4. «Оператор» имеет право в любой момент изменять Политику конфиденциальности (полностью или в части) в одностороннем порядке без предварительного согласования с «Пользователем». Все изменения вступают в силу с момента ее размещения на «Сайте».</p>
          <p>7.5. «Пользователь» обязуется самостоятельно следить за изменениями Политики конфиденциальности путем ознакомления с актуальной редакцией.</p>
        `
      },
      oz: {
        title: "Konfidensiallik siyosati",
        template: /*html*/`
          <p>Ushbu Maxfiylik siyosati “Raqamli ishlab chiqarish departamenti” MChJ – green.tashkent.uz veb-sayti egasi (yuridik manzili: O‘zbekiston, Toshkent sh., Chilonzor tumani, I.Karimov ko‘chasi, 51-uy), bundan buyon matnda "Operator" deb nomlanuvchi va "Foydalanuvchi" o’rtasida tuzilgan ommaviy shartnomadir. Ushbu Maxfiylik siyosati O‘zbekiston Respublikasining 2019-yil 2-iyuldagi “Shaxsiy ma’lumotlar to‘g‘risida”gi O‘RQ-547-sonli Qonuniga asoslanadi va “Operator” “Foydalanuvchi” to‘g‘risida green.tashkent.uz sayti orqali olishi mumkin bo‘lgan barcha ma’lumotlarga nisbatan qo‘llaniladi.</p>
          <p>1. Atamalar ta’rifi</p>
          <p>1.1. “Sayt” – internetda green.tashkent.uz manzilida joylashgan veb-sayt. Saytga va uning alohida elementlariga (shu jumladan dasturiy ta'minot, dizayn) barcha eksklyuziv huquqlar to'liq hajmda Operatorga tegishli.</p>
          <p>1.2. "Sayt ma'muriyati" - "Raqamli rivojlanish departamenti" MChJ nomidan ish yurituvchi, shaxsiy ma'lumotlarni tartibga soluvchi va (yoki) qayta ishlaydigan, shuningdek, shaxsiy ma'lumotlarni qayta ishlash maqsadlarini, qayta ishlanadigan shaxsiy ma'lumotlar tarkibini, shaxsiy ma'lumotlar bilan amalga oshirilgan harakatlar (operatsiyalar)ni aniqlaydigan Saytni boshqarish bo'yicha vakolatli xodimlar.</p>
          <p>1.3. "Foydalanuvchi" - bu Saytdan foydalanuvchi shaxs.</p>
          <p>1.4. Qonun hujjatlari deganda O‘zbekiston Respublikasining amaldagi qonun hujjatlari tushuniladi.</p>
          <p>1.5. "Shaxsiy ma'lumotlar" - Foydalanuvchining Sayt funksiyalaridan foydalanish jarayonida taqdim etadigan shaxsiy ma'lumotlari.</p>
          <p>1.6. "Shaxsiy bo'lmagan ma'lumotlar" - foydalanuvchi tizimning statistik skripti (piksel) o'rnatilgan sahifalarga tashrif buyurganida avtomatik ravishda uzatiladigan ma'lumotlar.</p>
          <p>1.7. Shaxsiy ma'lumotlarni qayta ishlash - avtomatlashtirish vositalaridan foydalangan holda yoki bunday vositalardan foydalanmasdan amalga oshiriladigan har qanday harakat (operatsiya) yoki harakatlar (operatsiyalar) majmui, shu jumladan shaxsiy ma'lumotlarni to'plash, qayd etish, tizimlashtirish, saqlash, aniqlashtirish (yangilash, o'zgartirish); shaxsiy ma'lumotlarni olish, foydalanish, uzatish (tarqatish, ta'minlash, kirish), shaxsiylashtirish, blokirovka qilish, o'chirish, yo'q qilish.</p>
          <p>1.8. Sayt xizmatlari - Saytda mavjud bo'lgan ma'lumotlar to'plami.</p>
          <p>1.9. Shaxsiy ma'lumotlarning maxfiyligi -Operator yoki shaxsiy ma'lumotlar bilan tanishish huquqiga ega bo'lgan boshqa shaxs uchun shaxsiy ma'lumotlar sub'ektining roziligisiz yoki boshqa qonuniy asoslar mavjud bo'lmagan holda ularni tarqatishga yo'l qo'ymaslik to'g'risidagi majburiy talabdir.</p>
          <p>1.10. “Operator” - sayt egasi hisoblanadi.</p>
          <p>1.11. Cookie-fayllar - veb-server tomonidan yuborilgan va Foydalanuvchining kompyuterida saqlanadigan ma'lumotlarning bir qismi bo'lib, veb-mijoz yoki veb-brauzer har safar Sayt sahifasini ochishga urinayotganda HTTP so'rovida veb-serverga yuboradi.</p>
          <p>1.12. IP manzil - IP protokoli yordamida qurilgan kompyuter tarmog'idagi tugunning yagona tarmoq manzili.</p>
          <p>2. Umumiy qoidalar</p>
          <p>2.1. Shaxsiy ma'lumotlarni "Sayt" orqali "Operator" ga o'tkazish orqali "Foydalanuvchi" Maxfiylik siyosatida ko'rsatilgan shartlarda ko'rsatilgan ma'lumotlardan foydalanishga roziligini tasdiqlaydi.</p>
          <p>2.2. Agar "Foydalanuvchi" Maxfiylik siyosati shartlariga rozi bo'lmasa, u "Sayt" dan foydalanishni to'xtatishi shart.</p>
          <p>2.3. "Operator sayti" boshqa veb-saytlarga havolalarni o'z ichiga olishi mumkin. "Operator" "Operator" tomonidan boshqarilmaydigan veb-saytlarning maxfiylik siyosati uchun javobgar emas. Ushbu Maxfiylik siyosati faqat Saytdagi "Operator" tomonidan to'plangan ma'lumotlarga nisbatan qo'llaniladi.</p>
          <p>2.4. "Operator" "Foydalanuvchi" tomonidan taqdim etilgan shaxsiy ma'lumotlarning to'g'riligini tekshirmaydi. Biroq, "Operator" "Foydalanuvchi" ishonchli shaxsiy ma'lumotlarni taqdim etadi va bu ma'lumotlarni yangilab turadi, deb hisoblaydi. "Foydalanuvchi" noto'g'ri yoki ahamiyatsiz shaxsiy ma'lumotlarni taqdim etish uchun barcha javobgarlikni, shuningdek, yuzaga kelishi mumkin bo'lgan oqibatlarni o'z zimmasiga oladi.</p>
          <p>3. Maxfiylik siyosatining predmeti</p>
          <p>3.1. Ushbu Maxfiylik siyosati "Operator" ning har qanday Sayt xizmatlaridan foydalanishda "Foydalanuvchi" taqdim etadigan shaxsiy ma'lumotlarning maxfiyligini himoya qilish rejimini oshkor etmaslik va ta'minlash majburiyatlarini belgilaydi.</p>
          <p>3.2. Ushbu Maxfiylik siyosatiga muvofiq qayta ishlashga ruxsat berilgan "shaxsiy ma'lumotlar" quyidagi ma'lumotlarni o'z ichiga olishi mumkin:</p>
          <p>3.2.1. "Foydalanuvchi" ning familiyasi, ismi, otasining ismi;</p>
          <p>3.2.2. "Foydalanuvchi" ning aloqa raqamlari;</p>
          <p>3.2.3 elektron pochta manzili (elektron pochta);</p>
          <p>3.2.4. "Foydalanuvchi" ning tug'ilgan sanasi.</p>
          <p>"Sayt" "Shaxsiy bo'lmagan ma'lumotlarni" himoya qiladi:</p>
          <p>3.2.1. IP manzili;</p>
          <p>3.2.2. cookie-fayllardan olingan ma'lumotlar;</p>
          <p>3.2.3. brauzer ma'lumotlari;</p>
          <p>3.2.4. kirish vaqti.</p>
          <p>3.5. "Sayt" o'z tashrif buyuruvchilarning IP manzillari haqidagi statistik ma'lumotlarni to'playdi. Ushbu ma'lumotlar texnik muammolarni aniqlash va hal qilish uchun ishlatiladi.</p>
          <p>3.6. Yuqorida ko'rsatilmagan boshqa har qanday shaxsiy ma'lumotlar xavfsiz saqlanishi va tarqatilmasligi kerak, ushbu Maxfiylik siyosatida nazarda tutilgan hollar bundan mustasno.</p>
          <p>4. "Shaxsiy ma'lumotlarni" yig'ish maqsadlari</p>
          <p>4.1. "Operator" faqat Sayt xizmatlari va "Foydalanuvchi" bilan o'zaro munosabatlar uchun zarur bo'lgan "Shaxsiy ma'lumotlar" ni to'playdi va saqlaydi.</p>
          <p>4.2. "Shaxsiy ma'lumotlar" quyidagi maqsadlarda ishlatilishi mumkin:</p>
          <p>4.2.1. "Foydalanuvchi" ga ma'lumot berish;</p>
          <p>4.2.2. "Foydalanuvchi" ning identifikatsiyasi;</p>
          <p>4.2.3. "Foydalanuvchi" bilan o'zaro aloqa;</p>
          <p>4.2.4. "Foydalanuvchi"ga ma'lumotlar va so'rovlarni yuborish;</p>
          <p>4.2.5. statistik va boshqa tadqiqotlarni olib borish.</p>
          <p>5. “Shaxsiy ma’lumotlar”ni qayta ishlash tartibi va shartlari</p>
          <p>5.1. "Foydalanuvchi" shaxsiy ma'lumotlariga ishlov berish muddatsiz, har qanday qonuniy usulda, shu jumladan avtomatlashtirish vositalaridan foydalangan holda shaxsiy ma'lumotlarning axborot tizimlarida yoki bunday vositalardan foydalanmasdan amalga oshiriladi.</p>
          <p>5.2. “Operator” “Shaxsiy ma’lumotlar”dan O‘zbekiston Respublikasining “Shaxsiy ma’lumotlar to‘g‘risida”gi Qonuniga va “Operator”ning ichki hujjatlariga muvofiq foydalanish majburiyatini oladi.</p>
          <p>5.3. "Operator" "Foydalanuvchi" ning roziligisiz "Shaxsiy ma'lumotlar" va "Shaxsiy bo'lmagan ma'lumotlar" ni quyidagi shaxslarga o'tkazish huquqiga ega:</p>
          <p>5.3.1. davlat organlari, shu jumladan huquqni muhofaza qiluvchi organlar va sudlarning asoslantirilgan iltimosiga binoan;</p>
          <p>5.3.2. O‘zbekiston Respublikasining amaldagi qonun hujjatlarida bevosita nazarda tutilgan boshqa hollarda.</p>
          <p>5.4. "Operator" "Shaxsiy ma'lumotlar" ushbu Maxfiylik siyosatini 5.3-bandda ko'rsatilmagan quyidagi hollarda uchinchi shaxslarga o'tkazish huquqiga ega.:</p>
          <p>5.4.1. “Foydalanuvchi” bunday harakatlarga roziligini bildirsa;</p>
          <p>5.4.2. O'tkazish "Foydalanuvchining" "Sayt" dan foydalanishining bir qismi sifatida zarur bo’lsa.</p>
          <p>6. Shaxsiy ma'lumotlarni himoya qilish</p>
          <p>6.1. Operator qonun hujjatlariga muvofiq shaxsiy va boshqa ma'lumotlarning to'g'ri himoyalanishini ta'minlaydi va Shaxsiy ma'lumotlarni himoya qilish uchun zarur va etarli tashkiliy va texnik choralarni ko'radi.</p>
          <p>7. Boshqa qoidalar</p>
          <p>7.1. O‘zbekiston Respublikasi qonunchiligi ushbu Maxfiylik siyosati hamda “Foydalanuvchi” va “Operator” o‘rtasidagi Maxfiylik siyosatini qo‘llash bilan bog‘liq holda yuzaga keladigan munosabatlarda qo‘llanilishi shart.</p>
          <p>7.2. Ushbu Shartnomadan kelib chiqadigan barcha mumkin bo'lgan nizolar "Operator" ro'yxatdan o'tgan joyda amaldagi qonunchilikka muvofiq hal qilinadi. Sudga borishdan oldin "Foydalanuvchi" sudgacha bo'lgan majburiy tartibni bajarishi va "Operator" ga yozma ravishda tegishli talabnomani yuborishi kerak. Talabnomaga javob berish muddati - 30 (o'ttiz) ish kuni.</p>
          <p>7.3. Agar u yoki bu sabablarga ko'ra Maxfiylik siyosatining bir yoki bir nechta qoidalari haqiqiy emas yoki amalga oshirib bo'lmaydigan deb topilsa, bu Maxfiylik siyosatining qolgan qoidalarining haqiqiyligiga yoki bajarilishiga ta'sir qilmaydi.</p>
          <p>7.4. "Operator" Maxfiylik siyosatini (to'liq yoki qisman) istalgan vaqtda "Foydalanuvchi" bilan oldindan kelishilmagan holda bir tomonlama o'zgartirish huquqiga ega. Barcha o'zgarishlar Saytda joylashtirilgan paytdan boshlab kuchga kiradi.</p>
          <p>7.5. "Foydalanuvchi" joriy versiya bilan tanishib, Maxfiylik siyosatidagi o'zgarishlarni mustaqil ravishda kuzatish majburiyatini oladi.</p>
        `
      },
      uz: {
        title: "Конфиденциаллик сиёсати",
        template: /*html*/`
          <p>Ушбу Махфийлик сиёсати “Рақамли ишлаб чиқариш департаменти” МЧЖ – green.tashkent.uz веб-сайти эгаси (юридик манзили: Ўзбекистон, Тошкент ш., Чилонзор тумани, I.Karimov кўчаси, 51-уй), бундан буён матнда «Оператор» деб номланувчи ва «Фойдаланувчи» ўртасида тузилган оммавий шартномадир. Ушбу Махфийлик сиёсати Ўзбекистон Республикасининг 2019 йил 2 июлдаги “Шахсий маълумотлар тўғрисида”ги ЎРҚ-547-сонли Қонунига асосланади ва «Оператор» «Фойдаланувчи» тўғрисида green.tashkent.uz сайти орқали олиши мумкин бўлган барча маълумотларга нисбатан қўлланилади.</p>
          <p>1. Атамалар таърифи</p>
          <p>1.1. «Сайт» – интернетда green.tashkent.uz манзилида жойлашган веб-сайт. Сайтга ва унинг алоҳида элементларига (шу жумладан дастурий таъминот, дизайн) барча эксклюзив ҳуқуқлар тўлиқ ҳажмда Операторга тегишли.</p>
          <p>1.2. "Сайт маъмурияти" - "Рақамли ривожланиш департаменти" МЧЖ номидан иш юритувчи, шахсий маълумотларни тартибга солувчи ва (ёки) қайта ишлайдиган, шунингдек, шахсий маълумотларни қайта ишлаш мақсадларини, қайта ишланадиган шахсий маълумотлар таркибини, шахсий маълумотлар билан амалга оширилган ҳаракатлар (операциялар)ни аниқлайдиган Сайтни бошқариш бўйича ваколатли ходимлар.</p>
          <p>1.3. «Фойдаланувчи» - бу Сайтдан фойдаланувчи шахс.</p>
          <p>1.4. Қонун ҳужжатлари деганда Ўзбекистон Республикасининг амалдаги қонун ҳужжатлари тушунилади.</p>
          <p>1.5. "Шахсий маълумотлар" - Фойдаланувчининг Сайт функцияларидан фойдаланиш жараёнида тақдим этадиган шахсий маълумотлари.</p>
          <p>1.6. "Шахсий бўлмаган маълумотлар" - фойдаланувчи тизимнинг статистик скрипти (пиксел) ўрнатилган саҳифаларга ташриф буюрганида автоматик равишда узатиладиган маълумотлар.</p>
          <p>1.7. Шахсий маълумотларни қайта ишлаш - автоматлаштириш воситаларидан фойдаланган ҳолда ёки бундай воситалардан фойдаланмасдан амалга ошириладиган ҳар қандай ҳаракат (операция) ёки ҳаракатлар (операциялар) мажмуи, шу жумладан шахсий маълумотларни тўплаш, қайд этиш, тизимлаштириш, сақлаш, аниқлаштириш (янгилаш, ўзгартириш); шахсий маълумотларни олиш, фойдаланиш, узатиш (тарқатиш, таъминлаш, кириш), шахсийлаштириш, блокировка қилиш, ўчириш, йўқ қилиш.</p>
          <p>1.8. Сайт хизматлари - Сайтда мавжуд бўлган маълумотлар тўплами.</p>
          <p>1.9. Шахсий маълумотларнинг махфийлиги -Оператор ёки шахсий маълумотлар билан танишиш ҳуқуқига эга бўлган бошқа шахс учун шахсий маълумотлар субъектининг розилигисиз ёки бошқа қонуний асослар мавжуд бўлмаган ҳолда уларни тарқатишга йўл қўймаслик тўғрисидаги мажбурий талабдир.</p>
          <p>1.10. «Оператор» - сайт эгаси ҳисобланади.</p>
          <p>1.11. Соокие-файллар - веб-сервер томонидан юборилган ва Фойдаланувчининг компьютерида сақланадиган маълумотларнинг бир қисми бўлиб, веб-мижоз ёки веб-браузер ҳар сафар Сайт саҳифасини очишга уринаётганда ҲТТП сўровида веб-серверга юборади.</p>
          <p>1.12. ИП манзил - ИП протоколи ёрдамида қурилган компьютер тармоғидаги тугуннинг ягона тармоқ манзили.</p>
          <p>2. Умумий қоидалар</p>
          <p>2.1. Шахсий маълумотларни «Сайт» орқали «Оператор» га ўтказиш орқали «Фойдаланувчи» Махфийлик сиёсатида кўрсатилган шартларда кўрсатилган маълумотлардан фойдаланишга розилигини тасдиқлайди.</p>
          <p>2.2. Агар «Фойдаланувчи» Махфийлик сиёсати шартларига рози бўлмаса, у «Сайт» дан фойдаланишни тўхтатиши шарт.</p>
          <p>2.3. "Оператор сайти" бошқа веб-сайтларга ҳаволаларни ўз ичига олиши мумкин. «Оператор» «Оператор» томонидан бошқарилмайдиган веб-сайтларнинг махфийлик сиёсати учун жавобгар эмас. Ушбу Махфийлик сиёсати фақат Сайтдаги «Оператор» томонидан тўпланган маълумотларга нисбатан қўлланилади.</p>
          <p>2.4. «Оператор» «Фойдаланувчи» томонидан тақдим этилган шахсий маълумотларнинг тўғрилигини текширмайди. Бироқ, «Оператор» «Фойдаланувчи» ишончли шахсий маълумотларни тақдим этади ва бу маълумотларни янгилаб туради, деб ҳисоблайди. «Фойдаланувчи» нотўғри ёки аҳамиятсиз шахсий маълумотларни тақдим этиш учун барча жавобгарликни, шунингдек, юзага келиши мумкин бўлган оқибатларни ўз зиммасига олади.</p>
          <p>3. Махфийлик сиёсатининг предмети</p>
          <p>3.1. Ушбу Махфийлик сиёсати «Оператор» нинг ҳар қандай Сайт хизматларидан фойдаланишда «Фойдаланувчи» тақдим этадиган шахсий маълумотларнинг махфийлигини ҳимоя қилиш режимини ошкор этмаслик ва таъминлаш мажбуриятларини белгилайди.</p>
          <p>3.2. Ушбу Махфийлик сиёсатига мувофиқ қайта ишлашга рухсат берилган "шахсий маълумотлар" қуйидаги маълумотларни ўз ичига олиши мумкин:</p>
          <p>3.2.1. «Фойдаланувчи» нинг фамилияси, исми, отасининг исми;</p>
          <p>3.2.2. «Фойдаланувчи» нинг алоқа рақамлари;</p>
          <p>3.2.3 электрон почта манзили (электрон почта);</p>
          <p>3.2.4. «Фойдаланувчи» нинг туғилган санаси.</p>
          <p>«Сайт» "Шахсий бўлмаган маълумотларни" ҳимоя қилади:</p>
          <p>3.2.1. ИП манзили;</p>
          <p>3.2.2. соокие-файллардан олинган маълумотлар;</p>
          <p>3.2.3. браузер маълумотлари;</p>
          <p>3.2.4. кириш вақти.</p>
          <p>3.5. «Сайт» ўз ташриф буюрувчиларнинг ИП манзиллари ҳақидаги статистик маълумотларни тўплайди. Ушбу маълумотлар техник муаммоларни аниқлаш ва ҳал қилиш учун ишлатилади.</p>
          <p>3.6. Юқорида кўрсатилмаган бошқа ҳар қандай шахсий маълумотлар хавфсиз сақланиши ва тарқатилмаслиги керак, ушбу Махфийлик сиёсатида назарда тутилган ҳоллар бундан мустасно.</p>
          <p>4. "Шахсий маълумотларни" йиғиш мақсадлари</p>
          <p>4.1. «Оператор» фақат Сайт хизматлари ва «Фойдаланувчи» билан ўзаро муносабатлар учун зарур бўлган "Шахсий маълумотлар" ни тўплайди ва сақлайди.</p>
          <p>4.2. "Шахсий маълумотлар" қуйидаги мақсадларда ишлатилиши мумкин:</p>
          <p>4.2.1. «Фойдаланувчи» га маълумот бериш;</p>
          <p>4.2.2. «Фойдаланувчи» нинг идентификацияси;</p>
          <p>4.2.3. «Фойдаланувчи» билан ўзаро алоқа;</p>
          <p>4.2.4. «Фойдаланувчи»га маълумотлар ва сўровларни юбориш;</p>
          <p>4.2.5. статистик ва бошқа тадқиқотларни олиб бориш.</p>
          <p>5. “Шахсий маълумотлар”ни қайта ишлаш тартиби ва шартлари</p>
          <p>5.1. «Фойдаланувчи» шахсий маълумотларига ишлов бериш муддатсиз, ҳар қандай қонуний усулда, шу жумладан автоматлаштириш воситаларидан фойдаланган ҳолда шахсий маълумотларнинг ахборот тизимларида ёки бундай воситалардан фойдаланмасдан амалга оширилади.</p>
          <p>5.2. «Оператор» “Шахсий маълумотлар”дан Ўзбекистон Республикасининг “Шахсий маълумотлар тўғрисида”ги Қонунига ва «Оператор»нинг ички ҳужжатларига мувофиқ фойдаланиш мажбуриятини олади.</p>
          <p>5.3. «Оператор» «Фойдаланувчи» нинг розилигисиз "Шахсий маълумотлар" ва "Шахсий бўлмаган маълумотлар" ни қуйидаги шахсларга ўтказиш ҳуқуқига эга:</p>
          <p>5.3.1. давлат органлари, шу жумладан ҳуқуқни муҳофаза қилувчи органлар ва судларнинг асослантирилган илтимосига биноан;</p>
          <p>5.3.2. Ўзбекистон Республикасининг амалдаги қонун ҳужжатларида бевосита назарда тутилган бошқа ҳолларда.</p>
          <p>5.4. «Оператор» "Шахсий маълумотлар" ушбу Махфийлик сиёсатини 5.3-бандда кўрсатилмаган қуйидаги ҳолларда учинчи шахсларга ўтказиш ҳуқуқига эга.:</p>
          <p>5.4.1. «Фойдаланувчи» бундай ҳаракатларга розилигини билдирса;</p>
          <p>5.4.2. Ўтказиш «Фойдаланувчининг» «Сайт» дан фойдаланишининг бир қисми сифатида зарур бўлса.</p>
          <p>6. Шахсий маълумотларни ҳимоя қилиш</p>
          <p>6.1. Оператор қонун ҳужжатларига мувофиқ шахсий ва бошқа маълумотларнинг тўғри ҳимояланишини таъминлайди ва Шахсий маълумотларни ҳимоя қилиш учун зарур ва этарли ташкилий ва техник чораларни кўради.</p>
          <p>7. Бошқа қоидалар</p>
          <p>7.1. Ўзбекистон Республикаси қонунчилиги ушбу Махфийлик сиёсати ҳамда «Фойдаланувчи» ва «Оператор» ўртасидаги Махфийлик сиёсатини қўллаш билан боғлиқ ҳолда юзага келадиган муносабатларда қўлланилиши шарт.</p>
          <p>7.2. Ушбу Шартномадан келиб чиқадиган барча мумкин бўлган низолар «Оператор» рўйхатдан ўтган жойда амалдаги қонунчиликка мувофиқ ҳал қилинади. Судга боришдан олдин «Фойдаланувчи» судгача бўлган мажбурий тартибни бажариши ва «Оператор» га ёзма равишда тегишли талабномани юбориши керак. Талабномага жавоб бериш муддати - 30 (ўттиз) иш куни.</p>
          <p>7.3. Агар у ёки бу сабабларга кўра Махфийлик сиёсатининг бир ёки бир нечта қоидалари ҳақиқий эмас ёки амалга ошириб бўлмайдиган деб топилса, бу Махфийлик сиёсатининг қолган қоидаларининг ҳақиқийлигига ёки бажарилишига таъсир қилмайди.</p>
          <p>7.4. «Оператор» Махфийлик сиёсатини (тўлиқ ёки қисман) исталган вақтда «Фойдаланувчи» билан олдиндан келишилмаган ҳолда бир томонлама ўзгартириш ҳуқуқига эга. Барча ўзгаришлар Сайтда жойлаштирилган пайтдан бошлаб кучга киради.</p>
          <p>7.5. «Фойдаланувчи» жорий версия билан танишиб, Махфийлик сиёсатидаги ўзгаришларни мустақил равишда кузатиш мажбуриятини олади.</p>
        `
      }
    },
    selectedContent: {}
  }
}
