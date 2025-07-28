import { AccessTokenResponse } from "./types";

export abstract class BaseTrenitaliaAPI {
  #accessToken: string | null = null;
  #refreshToken: string | null = null;

  protected assignTokens(data: AccessTokenResponse) {
    this.#accessToken = data.access_token;
    this.#refreshToken = data.refresh_token;
  }

  protected get accessToken(): string {
    if (!this.#accessToken) {
      throw new Error("Access token is not set. Please login first.");
    }
    return this.#accessToken;
  }

  public getAccessToken(): string | null {
    return this.#accessToken;
  }

  public getRefreshToken(): string | null {
    return this.#refreshToken;
  }
}