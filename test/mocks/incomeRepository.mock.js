import IncomeRepository from "../../src/repository/IncomeRepository.js";
import sinon from "sinon";
import convertResponseMock from "./convert-response.js";
import validIncomeMock from "./valid-income.js";

const urls = {
  convert: "/convert",
};

const mocks = {
  convertResponse: convertResponseMock,
  validIncome: validIncomeMock,
};

const incomeRepositoryMock = new IncomeRepository();

const stub = sinon.stub(
  incomeRepositoryMock,
  incomeRepositoryMock.makeRequest.name
);

stub.withArgs(urls.convert).resolves(mocks.convertResponse);

export { incomeRepositoryMock, urls, mocks };
