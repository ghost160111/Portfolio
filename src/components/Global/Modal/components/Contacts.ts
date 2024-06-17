// @ts-ignore
import sass from "!css-loader!sass-loader!./Contacts.scss";
import { Watcher } from "../../../../plugins/ReactiveElement/Classes/ReactiveElement";
import DefineComponent from "../../../../plugins/ReactiveElement/Decorators/DefineComponent";
import MobileSizeWindow from "./MobileSizeWindow";

const template: string = /*html*/`
  <h2 class="form-title" ref-data="selectedContent.title"></h2>
  <form class="form-contact" method="POST" action="" autocomplete="off">
    <div class="form-item">
      <label class="form-item__label form-item__label--star" for="fullname"><span ref-data="selectedContent.form.fullname.label"></span></label>
      <input class="form-item__input" id="fullname" ref="fullname" type="text" ref-model="fullname" ref-placeholder="selectedContent.form.fullname.inputText" required />
    </div>
    <div class="form-item">
      <label class="form-item__label form-item__label--star" for="email"><span ref-data="selectedContent.form.email.label"></span></label>
      <input class="form-item__input" id="email" ref="email" type="email" ref-model="email" ref-placeholder="selectedContent.form.email.inputText" required />
    </div>
    <div class="form-item">
      <label class="form-item__label" for="phone"><span ref-data="selectedContent.form.phone.label"></span></label>
      <input class="form-item__input" id="phone" ref="phone" type="tel" ref-model="phone" ref-placeholder="selectedContent.form.phone.inputText" />
    </div>
    <div class="form-item">
      <label class="form-item__label form-item__label--star" for="text"><span ref-data="selectedContent.form.text.label"></span></label>
      <textarea class="form-item__textarea" id="text" ref="text" maxlength="1200" ref-model="text" ref-placeholder="selectedContent.form.text.inputText" required></textarea>
      <span ref-data="form.text.warning"></span>
    </div>
    <div class="form-item">
      <label class="form-item__label" for="files" ref-data="selectedContent.form.files.label"></label>
      <div class="form-item__img-container">
        <div class="form-item__add-image">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clip-path="url(#clip0_700_10754)">
              <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_700_10754">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <input class="form-item__input-file" id="files" ref="files" ref-model="files" type="file" accept="png,jpg,jpeg" multiple />
        </div>
        <ul class="form-item__images-list">
        </ul>
      </div>
      <label class="form-item__label form-item__label--grey" ref-data="selectedContent.form.files.labelBottom"></label>
    </div>
    <div class="form-item">
      <button class="form-item__btn" ref="submit-btn" id="submit-form" type="submit" ref-data="selectedContent.form.submit.buttonText"></button>
    </div>
  </form>
`;

@DefineComponent({
  tag: "modal-contacts"
})
export default class ModalContacts extends MobileSizeWindow {
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
    fullname: "",
    email: "",
    phone: "",
    text: "",
    files: null,
    filesForBlob: [],
    filesToSubmit: [],
    contents: {
      ru: {
        title: "Обратная связь",
        form: {
          fullname: {
            label: "Представьтесь пожалуйста",
            inputText: "Имя и фамилия"
          },
          email: {
            label: "Укажите вашу электронную почту",
            inputText: "Электронная почта"
          },
          text: {
            label: "Пожалуйста, напишите, что вы хотели сказать",
            inputText: "Введите текст",
            warning: "Не более 1200 символов"
          },
          files: {
            label: "Если есть чем поделиться, можете прикрепить это здесь",
            labelBottom: "допускается прикреплять не более 5 файлов в формате jpeg и png, каждый файл не более 5 мб."
          },
          phone: {
            label: "При желании можете поделиться номером телефона",
            inputText: "+998"
          },
          submit: {
            buttonText: "Отправить"
          }
        }
      },
      oz: {
        title: "Biz bilan bog‘lanish",
        form: {
          fullname: {
            label: "O'zingizni tanishtiring",
            inputText: "Ism va familiya"
          },
          email: {
            label: "Elektron pochtangizni kiriting",
            inputText: "Elektron pochtangiz"
          },
          text: {
            label: "Iltimos, nima demoqchi bo'lganingizni yozing",
            inputText: "Matn kiriting",
            warning: "1200 ta belgidan oshmasin"
          },
          files: {
            label: "Agar baham ko'rmoqchi bo'lgan narsangiz bo'lsa, uni shu yerga biriktirishingiz mumkin",
            labelBottom: "Jpeg va png formatidagi 5 tadan ko'p bo'lmagan, har bir fayl 5 MB dan ortiq bo'lmagan faylni biriktirishga ruxsat beriladi."
          },
          phone: {
            label: "Agar xohlasangiz, telefon raqamingizni baham ko'rishingiz mumkin",
            inputText: "+998"
          },
          submit: {
            buttonText: "Yuborish"
          }
        }
      },
      uz: {
        title: "Биз билан боғланиш",
        form: {
          fullname: {
            label: "Ўзингизни таништиринг",
            inputText: "Исм ва фамилия"
          },
          email: {
            label: "Электрон почтангизни киритинг",
            inputText: "Электрон почтангиз"
          },
          text: {
            label: "Илтимос, нима демоқчи бўлганингизни ёзинг",
            inputText: "Матн киритинг",
            warning: "1200 та белгидан ошмасин"
          },
          files: {
            label: "Агар баҳам кўрмоқчи бўлган нарсангиз бўлса, уни шу ерга бириктиришингиз мумкин",
            labelBottom: "Jpeg ва png форматдаги 5 та дан кўп бўлмаган, ҳар бир файл 5 MB дан ортиқ бўлмаган файлни бириктиришга рухсат берилади."
          },
          phone: {
            label: "Агар хоҳласангиз, телефон рақамингизни баҳам кўришингиз мумкин",
            inputText: "+998"
          },
          submit: {
            buttonText: "Юбориш"
          }
        }
      }
    },
    selectedContent: {}
  }

  public regexChecker(regex: RegExp, text: string): boolean {
    let isValid: boolean = regex.test(text);
    console.log(isValid);
    return isValid;
  }

  public regexReplacer(regex: RegExp, text: string, textToReplace: string): string {
    return text.replace(regex, textToReplace);
  }

  public watch: Watcher = {
    "selectedContent": (newValue: {}) => {
      console.log("Selected content object: ", newValue);
    },
    "fullname": (newValue: string) => {
      this.refs["fullname"]["value"] = this.regexReplacer(/[^A-Za-z\s]/g, this.refs["fullname"]["value"], "");
      newValue = this.regexReplacer(/[^A-Za-z\s]/g, newValue, "");

      this.refProxy["fullname"] = newValue.trimStart().trimEnd();
    },
    "email": (newValue: string) => {
      console.log("Email: ", newValue);
    },
    "phone": (newValue: string) => {
      this.refs["phone"]["value"] = this.regexReplacer(/[^+\d]/g, this.refs["phone"]["value"], "");
      newValue = this.regexReplacer(/[^+\d]/g, newValue, "");

      if (!newValue.startsWith("+998", 0)) {
        this.refs["phone"]["value"] = this.refs["phone"]["value"].slice(0, 1).replace("", "+998");
      }

      this.refProxy["phone"] = newValue;
      console.log(this.refProxy["phone"]);
    },
    "text": (newValue: string) => {
      console.log("Text: ", newValue);
    },
    "files": (newValue: any) => {
      let files: File[] = [...Array.from(newValue)] as File[];
      this.refProxy["filesForBlob"].push(...files);

      if (this.refProxy["filesForBlob"].length >= 4) {
        while (this.refProxy["filesForBlob"].length >= 4) {
          this.refProxy["filesForBlob"].pop();

          if (this.refProxy["filesForBlob"].length === 5) {
            break;
          }
        }
      }

      for (let i = 0; i < this.refProxy["filesForBlob"].length; ++i) {
        let file: File = this.refProxy["filesForBlob"][i] as File;
        let sizeKB: number = file.size / 1000;
        let sizeMB: number = sizeKB / 1000;
        let fileType: string = file.type;
        let blob: Blob = new Blob([file], { type: fileType });

        if (sizeMB >= 5) {
          if (this.devMode) {
            console.log("File size can't be greater than 5MB: ", sizeMB);
          }
        } else {
          this.refProxy["filesToSubmit"].push(blob);
        }
      }

      // now we just need to update UI, show it to users
    }
  }

  public onConnected(): void {
    this.onConnectedSetSize(500, "98%");
    this.updateLanguage<MobileSizeWindow>(this);
  }

  public override events(): void {
    this.eventHandler.subscribe("submit-btn", "submit-btn-event", "click", this.postForm);
    this.eventHandler.subscribe(window, "window-size-change-event", "resize", this.onResizeHandler);
    this.eventHandler.subscribe("phone", "click-phone-event", "click", this.fillUpPhoneInputHandler);
  }

  public fillUpPhoneInputHandler(event: MouseEvent): void {
    let input: HTMLInputElement = event.target as HTMLInputElement;
    if (!input.value) {
      input.value = "+998";
    }
  }

  public postForm(event: SubmitEvent): void {
    console.group("Form properties: ");
    console.log("Fullname: ", this.refProxy["fullname"]);
    console.log("Email: ", this.refProxy["email"]);
    console.log("Phone: ", this.refProxy["phone"]);
    console.log("Text: ", this.refProxy["text"]);
    console.log("Files: ", this.refProxy["filesToSubmit"]);
    console.groupEnd();

    if (this.refProxy["fullname"] && this.refProxy["email"] && this.refProxy["text"]) {
      event.preventDefault();

      // do POST fetch request by following the API schema you are given by backend developer
    }
  }
}
