import { map, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

export class TrenitaliaAPI {
  #accessToken: string | null = null;
  #refreshToken: string | null = null;

  constructor() {}

  /**
   *
   * @param userName
   * @param password
   * @param company
   * @returns Observable with access and refresh tokens
   */
  public login(
    userName: string,
    password: string,
    company: string = ""
  ): Observable<{ access_token: string; refresh_token: string }> {
    return ajax
      .post(
        `https://www.lefrecce.it/PicoAuth/api/auth/login`,
        { userName, password, company },
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://www.lefrecce.it/Channels.Website.WEB/it/",
        }
      )
      .pipe(
        map((res) => {
          const { access_token, refresh_token } = res.response as {
            access_token: string;
            refresh_token: string;
          };
          this.#accessToken = access_token;
          this.#refreshToken = refresh_token;
          return { access_token, refresh_token };
        })
      );
  }

  public loginWithFetch(
    userName: string,
    password: string,
    company: string = ""
  ) {
    return fetch("https://www.lefrecce.it/PicoAuth/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://www.lefrecce.it/Channels.Website.WEB/it/",
      },
      body: JSON.stringify({ userName, password, company }),
    }).then((response) =>
      response
        .json()
        .then(({ access_token, refresh_token }) => ({
          access_token,
          refresh_token,
        }))
        .then(({ access_token, refresh_token }) => {
          this.#accessToken = access_token;
          this.#refreshToken = refresh_token;
          return { access_token, refresh_token };
        })
    );
  }

  getAccessToken() {
    return this.#accessToken;
  }

  getRefreshToken() {
    return this.#refreshToken;
  }

  getUserTicketsInformation() {
    return fetch(
      "https://www.lefrecce.it/Channels.Website.BFF.WEB/website/travel/next/solutions?travelGroup=TICKET",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.#accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response: Response) => response.json())
      .catch((error: unknown) => console.error(error));
  }
}
