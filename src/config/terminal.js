import chalk from 'chalk';

export default {
  table: {
    leftPad: 5,
    columns: [
      { field: "position", name: chalk.red("Position") },
      { field: "expectation", name: chalk.blue("Expectation (BRL)") },
      { field: "conversion01", name: chalk.cyan("USD") },
      { field: "conversion02", name: chalk.greenBright("EUR") },
      { field: "conversion03", name: chalk.yellow("RUB") },
    ],
  },
};
