import * as chalk from 'chalk';
import * as yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {ColorChoice} from "./note";
import {Note} from "./note";
import {UserNotes} from "./userNotes";
import {NotesFileSystem} from "./notesFileSystem";


// console.log(chalk.blue('This text is blue'));
// console.log(chalk.blue.inverse('This text is over a blue background'));

let notesDataBase = new NotesFileSystem();

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.body === 'string') &&
        (typeof argv.color === 'string' && (typeof argv.user === 'string'))) {
      const noteToAdd = new Note(argv.title, argv.body, argv.color as ColorChoice);
      if (notesDataBase.addNewNote(argv.user, noteToAdd) === -1) {
        console.log(`Error: el usuario ${argv.user} ya tiene una nota con el mismo título`);
      } else {
        console.log(`Nota añadida con éxito`);
      }
    }
  },
}).parseSync();


yargs.command({
  command: 'modify',
  describe: 'Modify an existing note',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title of the note to modify',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'New note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'New note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string') {
      console.log("Nota modificada");
    }
  },
}).parseSync();


yargs.command({
  command: 'delete',
  describe: 'Delete an existing note',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title of the note to delete',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
      if (notesDataBase.deleteNote(argv.user, argv.title) === -1) {
        console.log(`Error: no existe ninguna nota con título ${argv.title}`);
      } else {
        console.log(`Nota eliminada con éxito`);
      }
    }
  },
}).parseSync();


yargs.command({
  command: 'list',
  describe: 'Lists all the existing notes of the user',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const notesToList = notesDataBase.getUserNotes(argv.user);
      if (typeof notesToList !== "undefined") {
        notesToList.getUserNotes().forEach((note) => {
          const colorToPrint = note.getColor();
          switch (colorToPrint) {
            case "blue":
              console.log(chalk.blue(`${note.getTitle()}`));
              break;
            case "red":
              console.log(chalk.red(`${note.getTitle()}`));
              break;
            case "green":
              console.log(chalk.green(`${note.getTitle()}`));
              break;
            case "yellow":
              console.log(chalk.yellow(`${note.getTitle()}`));
              break;
          }
        });
      } else {
        console.log(chalk.red(`Error: no se encuentra el usuario ${argv.user}`));
      }
    }
  },
}).parseSync();


yargs.command({
  command: 'read',
  describe: 'Read an existing note of the user',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title of the note to read',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string') {
      console.log("Nota mostrada");
    }
  },
}).parseSync();