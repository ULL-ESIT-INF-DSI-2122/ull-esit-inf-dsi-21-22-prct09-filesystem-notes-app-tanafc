import * as fs from 'fs';
import {UserNotes} from './userNotes';
import {Note} from './note';

export class NotesFileSystem {
  private usersNotes: UserNotes[] = [];

  constructor() {
    this.loadUsersData();
  }

  public getUsersNotes(): UserNotes[] {
    return this.usersNotes;
  }


  public getUserNotes(name: string): UserNotes | undefined {
    for (let i = 0; i < this.usersNotes.length; i++) {
      if (this.usersNotes[i].getUserName() === name) {
        return this.usersNotes[i];
      }
    }
    return undefined;
  }

  /**
   * Reads the notes of the users under ./notes directory
   * and loads them into usersNotes.
   */
  public loadUsersData(): void {
    const usersFolders = fs.readdirSync('./notes/');
    if (usersFolders.length !== 0) {
      usersFolders.forEach((user) => {
        let notesOfUser = new UserNotes(user);
        const readNotes = fs.readdirSync(`./notes/${user}`);
        if (readNotes.length !== 0) {
          readNotes.forEach((note) => {
            const stringJSON = fs.readFileSync(`./notes/${user}/${note}`).toString();
            const noteObject = JSON.parse(stringJSON);
            notesOfUser.addNote(new Note(noteObject.title, noteObject.body, noteObject.color));
          });
        }
        this.usersNotes.push(notesOfUser);
      });
    }
  }

  /**
   * Writes a new note under the user`s directory. If the user has no directory,
   * it creates a new one with the user´s name.
   * @param user user´s directory to check.
   * @param note note to write in the file of the directory.
   */
  public writeUserData(user: string, note: Note): void {
    if (!fs.existsSync(`./notes/${user}`)) {
      fs.mkdirSync(`./notes/${user}`);
    }
    const noteObject = {
      "title": note.getTitle(),
      "body": note.getBody(),
      "color": note.getColor(),
    };
    fs.writeFileSync(`./notes/${user}/${noteObject.title}.json`, JSON.stringify(noteObject, null, "\t"));
  }

  /**
   * Deletes a user`s note given the title of the note.
   * @param user user`s note to delete.
   * @param title title of the note to delete.
   */
  public deleteUserData(user: string, title: string): void {
    if (fs.existsSync(`./notes/${user}`)) {
      fs.rmSync(`./notes/${user}/${title}.json`);
    }
  }


  public addNewNote(user: string, newNote: Note): number {
    let userNotes = this.getUserNotes(user);
    if (typeof userNotes === "undefined") {
      userNotes = new UserNotes(user);
    }
    if (userNotes.addNote(newNote) !== -1) {
      this.writeUserData(user, newNote);
      return 0;
    } else {
      return -1;
    }
  }


  public deleteNote(user: string, titleOfNote: string): number {
    let userNotes = this.getUserNotes(user);
    if (typeof userNotes === "undefined") {
      return -1;
    }
    if (userNotes.deleteNote(titleOfNote) !== -1) {
      this.deleteUserData(user, titleOfNote);
      return 0;
    } else {
      return -1;
    }
  }
}