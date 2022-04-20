import * as fs from 'fs';
import * as chalk from 'chalk';
import * as yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {ColorChoice} from "./note";
import {Note} from "./note";
import {UserNotes} from "./userNotes";


// console.log(chalk.blue('This text is blue'));
// console.log(chalk.blue.inverse('This text is over a blue background'));

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
    if (typeof argv.title === 'string') {
      console.log("Añadida nota");
    }
  },
}).parse();


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
}).parse();


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
    if (typeof argv.title === 'string') {
      console.log("Nota eliminada");
    }
  },
}).parse();


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
      console.log("Lista mostrada");
    }
  },
}).parse();


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
}).parse();