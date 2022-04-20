export type ColorChoice = "yellow" | "red" | "blue" | "green";

export class Note {
  constructor(private title: string, private body: string,
    private color: ColorChoice) {}

  public getTitle(): string {
    return this.title;
  }

  public getBody(): string {
    return this.body;
  }

  public getColor(): ColorChoice {
    return this.color;
  }

  public setTitle(newTitle: string): void {
    this.title = newTitle;
  }

  public setBody(newBody: string): void {
    this.body = newBody;
  }

  public setColor(newColor: ColorChoice): void {
    this.color = newColor;
  }
}