import {ColorChoice} from "./note";
import {Note} from "./note";

export class UserNotes {
  private userNotes: Note[];
  private userName: string;

  constructor(name: string, notes: Note[] = []) {
    this.userName = name;
    this.userNotes = notes;
  }

  public getUserName(): string {
    return this.userName;
  }

  public getUserNotes(): Note[] {
    return this.userNotes;
  }

  public addNote(newNote: Note): number {
    for (let i = 0; i < this.userNotes.length; i++) {
      if (this.userNotes[i].getTitle() === newNote.getTitle()) {
        return -1;
      }
    }
    this.userNotes.push(newNote);
    return 0;
  }

  public modifyNote(title: string, newTitle: string,
      newBody: string, newColor: ColorChoice): number {
    for (let i = 0; i < this.userNotes.length; i++) {
      if (this.userNotes[i].getTitle() === title) {
        this.userNotes[i].setTitle(newTitle);
        this.userNotes[i].setBody(newBody);
        this.userNotes[i].setColor(newColor);
        return 0;
      }
    }
    return -1;
  }

  public deleteNote(title: string): number {
    for (let i = 0; i < this.userNotes.length; i++) {
      if (this.userNotes[i].getTitle() === title) {
        this.userNotes.splice(i, 1);
        return 0;
      }
    }
    return -1;
  }

  public getNote(title: string): Note | undefined {
    for (let i = 0; i < this.userNotes.length; i++) {
      if (this.userNotes[i].getTitle() === title) {
        return this.userNotes[i];
      }
    }
    return undefined;
  }
}