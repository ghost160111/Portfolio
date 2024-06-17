/**
 * @description
 * This class creates file right in browser and exists only
 * in browser, so you can use it everywhere in your webpage.
 */
export class CSSFileHandler {
  private blob: Blob;
  private fileURL: string;
  private link: HTMLLinkElement;

  constructor(...cssContent: string[]) {
    this.blob = new Blob([...cssContent], { type: "text/css" });
    this.fileURL = URL.createObjectURL(this.blob);

    this.link = document.createElement<"link">("link");
    this.link.rel = "stylesheet";
    this.link.href = this.fileURL;

    document.head.appendChild(this.link);
  }

  public getFileURL(): string {
    return this.fileURL;
  }

  public getLinkElRef(): HTMLLinkElement {
    return this.link;
  }

  public getBlobInstance(): Blob {
    return this.blob;
  }
}
