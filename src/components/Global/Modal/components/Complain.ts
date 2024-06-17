// @ts-ignore
import sass from "!css-loader!sass-loader!./Complain.scss";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import NavLang from "../../../Header/components/NavLang";
import MobileSizeWindow from "./MobileSizeWindow";

const template: string = /*html*/`
  <h1 ref-data="selectedContent.title">Write HTML for your ModalComplain component right here!!!</h1>
`;

@DefineComponent({
  tag: "modal-complain"
})
export default class ModalComplain extends MobileSizeWindow {
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
        title: "Обратная связь",
        form: {
          item1: {
            label: "Представьтесь пожалуйста",
            inputText: "Имя и фамилия"
          },
          item2: {
            label: "Укажите вашу электронную почту",
            inputText: "Электронная почта"
          },
          item3: {
            label: "Пожалуйста, напишите, что вы хотели сказать",
            inputText: "Введите текст",
            warning: "Не более 1200 символов"
          },
          item4: {
            label: "Если есть чем поделиться, можете прикрепить это здесь",
            labelBottom: "допускается прикреплять не более 5 файлов в формате jpeg и png, каждый файл не более 5 мб."
          },
          item5: {
            label: "При желании можете поделиться номером телефона",
            inputText: "+998"
          },
          item6: {
            buttonText: "Отправить"
          }
        }
      },
      oz: {
        title: "Kontakt",
        form: {
          item1: {
            label: "O'zingizni tanishtiring",
            inputText: "Ism va familiya"
          },
          item2: {
            label: "Elektron pochtangizni kiriting",
            inputText: "Elektron pochtangiz"
          },
          item3: {
            label: "Iltimos, nima demoqchi bo'lganingizni yozing",
            inputText: "Matn kiriting",
            warning: "1200 ta belgidan oshmasin"
          },
          item4: {
            label: "Agar baham ko'rmoqchi bo'lgan narsangiz bo'lsa, uni shu yerga biriktirishingiz mumkin",
            labelBottom: "Jpeg va png formatidagi 5 tadan ko'p bo'lmagan, har bir fayl 5 MB dan ortiq bo'lmagan faylni biriktirishga ruxsat beriladi."
          },
          item5: {
            label: "Agar xohlasangiz, telefon raqamingizni baham ko'rishingiz mumkin",
            inputText: "+998"
          },
          item6: {
            buttonText: "Yuborish"
          }
        }
      },
      uz: {
        title: "Контакт",
        form: {
          item1: {
            label: "Ўзингизни таништиринг",
            inputText: "Исм ва фамилия"
          },
          item2: {
            label: "Электрон почтангизни киритинг",
            inputText: "Электрон почтангиз"
          },
          item3: {
            label: "Илтимос, нима демоқчи бўлганингизни ёзинг",
            inputText: "Матн киритинг",
            warning: "1200 та белгидан ошмасин"
          },
          item4: {
            label: "Агар баҳам кўрмоқчи бўлган нарсангиз бўлса, уни шу ерга бириктиришингиз мумкин",
            labelBottom: "Jpeg ва png форматдаги 5 та дан кўп бўлмаган, ҳар бир файл 5 MB дан ортиқ бўлмаган файлни бириктиришга рухсат берилади."
          },
          item5: {
            label: "Агар хоҳласангиз, телефон рақамингизни баҳам кўришингиз мумкин",
            inputText: "+998"
          },
          item6: {
            buttonText: "Юбориш"
          }
        }
      }
    },
    selectedContent: {}
  }

  public override onConnected(): void {
    this.onConnectedSetSize(500, "98%");
    this.updateLanguage<ModalComplain>(this);
  }

  // write the rest logic for complain component, where user posts complain form
}
