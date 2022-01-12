import IncomeRepository from "./../repository/IncomeRepository.js";
import Income from "./../entity/Income.js";

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  async generateIncomeFromString(incomeString, delimiter = ";") {
    this.validateInput(incomeString, delimiter);
    
    const [position, expectation] = incomeString.split(delimiter);
    const numberExpectation = Number(expectation);

    const { usdIncome, eurIncome, rubIncome } =
      await this.calculateIncomeConversions(Number(numberExpectation));

    const fullExpectation = {
      value: Number(numberExpectation),
      currency: "BRL",
      language: "pt-BR",
    };

    return new Income({
      position,
      expectation: fullExpectation,
      conversion01: usdIncome,
      conversion02: eurIncome,
      conversion03: rubIncome,
    });
  }

  async calculateIncomeConversions(expectation) {
    try {
      const { results } = await this.incomeRepository.getConversions();
      const usdFee = results["USD"];
      const eurFee = results["EUR"];
      const rubFee = results["RUB"];

      return {
        usdIncome: {
          value: expectation * usdFee,
          currency: "USD",
          language: "en-US",
        },
        eurIncome: {
          value: expectation * eurFee,
          currency: "EUR",
          language: "en-GB",
        },
        rubIncome: {
          value: expectation * rubFee,
          currency: "RUB",
          language: "ru-RU",
        },
      };
    } catch (error) {
      throw new Error(
        "Error fetching data for conversion, check if the API is running!"
      );
    }
  }

  validateInput(input, delimiter) {
    const [position, expectation] = input.split(delimiter);

    if (!input) {
      throw new Error(
        "Position is a required field. Please make sure you are providing a position."
      );
    }

    if (!Number(expectation)) {
      throw new Error(
        "A valid Expectation is required. Please note that only numbers are allowed."
      );
    }
  }
}

export default IncomeService;
