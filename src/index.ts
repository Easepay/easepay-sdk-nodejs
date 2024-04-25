import axios, { AxiosRequestConfig } from "axios";

/**
 * this class is responsible for making the request to the Easepay API
 */

export default class Easepay {
  private readonly publicKey: string;
  private readonly secretKey: string;

  private readonly baseUrl: string = "https://api.easepay.io/v1";

  private readonly urlBuilder: UrlBuilder;

  // the client is an axios instance
  private httpClient = axios;

  constructor(publicKey: string, secretKey: string) {
    this.publicKey = publicKey;
    this.secretKey = secretKey;
    this.urlBuilder = new UrlBuilder(this.baseUrl, publicKey, secretKey);
  }

  // this method is responsible for checking the status of the gateway
  public async checkStatus(): Promise<any> {
    return await this.httpClient.get(this.urlBuilder.buildUrl("health"));
  }

  // this method is responsible for creating a new payment
  public async createPayment(): Promise<any> {
    return await this.httpClient.post(
      this.urlBuilder.buildUrl("payment"), // the request URL
      {} // the request body
    );
  }

  //     this method is responsible for getting the payment details
  public async getPaymentDetails(paymentId: string): Promise<any> {
    return await this.httpClient.get(
      this.urlBuilder.buildUrl(`payment/${paymentId}`)
    );
  }

  // this method is responsible for getting the payment status
  public async getPaymentStatus(paymentId: string): Promise<any> {
    return await this.httpClient.get(
      this.urlBuilder.buildUrl(`payment/${paymentId}/status`)
    );
  }

  // this method is responsible for getting the payment history
  public async getPaymentHistory(): Promise<any> {
    return await this.httpClient.get(
      this.urlBuilder.buildUrl("payment/history")
    );
  }

  // get the store information \
  public async getStoreInfo(): Promise<any> {
    return await this.httpClient.get(this.urlBuilder.buildUrl("store"));
  }

  //   update the store information
  public async updateStoreInfo(storeInfo: any): Promise<any> {
    return await this.httpClient.put(
      this.urlBuilder.buildUrl("store"),
      storeInfo
    );
  }

  // this method is responsible for getting the store transactions
  public async getStoreTransactions(): Promise<any> {
    return await this.httpClient.get(
      this.urlBuilder.buildUrl("store/transactions")
    );
  }

  // get the wallet balance
  public async getWalletBalance(): Promise<any> {
    return await this.httpClient.get(
      this.urlBuilder.buildUrl("wallet/balance")
    );
  }

  // get the users
  public async getUsers(): Promise<any> {
    return await this.httpClient.get(this.urlBuilder.buildUrl("users"));
  }
}

/**
 * the request builder is a class that is responsible for building the request URL path and query parameters
);
 */
class UrlBuilder {
  public buildUrl(requestPath: string): string {
    return `${this.baseUrl}/${requestPath.trim()}?publicKey=${
      this.publicKey
    }&secretKey=${this.secretKey}`;
  }

  public buildUrlWithQuery(
    requestPath: string,
    query: Map<string, string>
  ): string {
    let queryBuilder = "";
    query.forEach((value, key) => {
      queryBuilder += `${key}=${value}&`;
    });
    return `${this.baseUrl}/${requestPath.trim()}?${queryBuilder}publicKey=${
      this.publicKey
    }&secretKey=${this.secretKey}`;
  }

  private readonly baseUrl: string;
  private readonly publicKey: string;
  private readonly secretKey: string;

  constructor(baseUrl: string, publicKey: string, secretKey: string) {
    this.baseUrl = baseUrl;
    this.publicKey = publicKey;
    this.secretKey = secretKey;
  }
}
