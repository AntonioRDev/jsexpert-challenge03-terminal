import http from "http";

const API_BASE_URL = "http://localhost:3000";

class IncomeRepository {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      const fullUrl = API_BASE_URL + url;
      http.get(fullUrl, (response) => {
        response.on("data", (data) => resolve(JSON.parse(data)));
        response.on("error", reject);
      });
    });
  }

  async getConversions() {
    const conversions = await this.makeRequest("/convert");
    return conversions;
  }
}

export default IncomeRepository;
