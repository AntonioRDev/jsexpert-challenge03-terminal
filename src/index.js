import CustomTerminal from './terminal.js';
import IncomeService from './service/IncomeService.js';
import chalk from 'chalk';

const VOCABULARY = {
  STOP: ':q',
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  console.info('🚀 Running...\n');
  try {
    const answer = await terminal.question('Qual seu cargo e pretensão salarial em BRL? (position; expectation)\nInsira: ');

    if(answer === VOCABULARY.STOP){
      terminal.close();
      return;
    }

    const income = await service.generateIncomeFromString(answer);
    terminal.addData(income.format());
    
    return mainLoop();
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    return mainLoop();
  }
}

await mainLoop();
