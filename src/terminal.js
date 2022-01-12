import DraftLog from "draftlog";
import chalk from 'chalk';
import chalkTable from "chalk-table";
import readline from "readline";
import terminalConfig from "./config/terminal.js";

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.interface = {};
    this.data = [];
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);

    const table = chalkTable(TABLE_OPTIONS, this.data);
    this.print = console.draft(table);

    this.interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  question(msg) {
    return new Promise((resolve) => this.interface.question(msg, resolve));
  }

  addData(data) {
    this.data.push(data);    
    console.log(chalk.green("Register sucessfully inserted"));
    this.print(chalkTable(TABLE_OPTIONS, this.data));
  }

  close() {
    this.interface.close();
  }
}

export default CustomTerminal;
