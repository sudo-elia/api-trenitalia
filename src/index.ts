import { map, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  AccessTokenResponse,
  library,
  QuerySolutions,
  SolutionsResponse,
} from "./types";

export class TrenitaliaAPI {
  #accessToken: string | null = null;
  #refreshToken: string | null = null;
  #libraryType: library;


  constructor(libraryType: library = "rxjs") {
    if (libraryType !== "rxjs" && libraryType !== "fetch") {
      throw new Error("Invalid library type. Use 'rxjs' or 'fetch'.");
    }
    this.#libraryType = libraryType;
  }

  /**
   * Logs in to the Trenitalia API and retrieves access and refresh tokens.
   *
   * @param library - The library to use for the request, either 'rxjs' or 'fetch'.
   * @param request
   * @returns
   */
  login(
    request: {
      userName: string;
      password: string;
      company: string;
    }
  ): Observable<AccessTokenResponse> | Promise<AccessTokenResponse> {
    const url = "https://www.lefrecce.it/PicoAuth/api/auth/login";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: "https://www.lefrecce.it/Channels.Website.WEB/it/",
    };
    const assignDataAndReturn = (data: AccessTokenResponse) => {
      this.#accessToken = data.access_token;
      this.#refreshToken = data.refresh_token;
      return data;
    };
    if (this.#libraryType === "rxjs") {
      return ajax.post(url, request, headers).pipe(
        map((res) => {
          const accessData = res.response as AccessTokenResponse;
          return assignDataAndReturn(accessData);
        })
      );
    }
    return fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(request),
    }).then((response) =>
      response
        .json()
        .then(({ access_token, refresh_token }) =>
          assignDataAndReturn({ access_token, refresh_token })
        )
    );
  }

  /**
   * Fetches travel solutions based on the provided query.
   *
   * @param library - The library to use for the request, either 'rxjs' or 'fetch'.
   * @param bodyRequest - The query parameters for fetching solutions.
   * @returns An observable or promise of SolutionsResponse.
   */
  getSolutions(
    bodyRequest: QuerySolutions
  ): Observable<SolutionsResponse> | Promise<SolutionsResponse> {
    const parseBodyRequest = (request: QuerySolutions) => {
      const { fromDate, searchType, code, toDate, travelGroup } = request;
      const isValidDate = (date: string) =>
        /^(\d{2})\/(\d{2})\/(\d{4})$/.test(date);

      if (!isValidDate(fromDate) || !isValidDate(toDate)) {
        throw new Error("Invalid date format. Use 'DD/MM/YYYY'.");
      }
      if (
        searchType !== "DEPARTURE_DATE" &&
        searchType !== "PURCHASE_DATE" &&
        searchType !== "PNR"
      ) {
        throw new Error(
          "Invalid search type. Use 'DEPARTURE_DATE', 'PURCHASE_DATE', or 'PNR'."
        );
      }
      if (travelGroup !== "TICKET") {
        throw new Error("Invalid travel group. Use 'TICKET'.");
      }
      if (searchType === "PNR" && !code) {
        throw new Error("Code is required when searchType is 'PNR'.");
      }
      if (searchType !== "PNR" && code) {
        throw new Error(
          "Code should not be provided when searchType is not 'PNR'."
        );
      }

      return {
        fromDate: fromDate,
        searchType: searchType,
        limit: 10,
        offset: 0,
        code: code || "",
        toDate: toDate,
        travelGroup: travelGroup,
      };
    };

    if (this.#libraryType === "rxjs")
      return ajax
        .post<SolutionsResponse>(
          "https://www.lefrecce.it/Channels.Website.BFF.WEB/website/travel/solutions",
          parseBodyRequest(bodyRequest),
          {
            Authorization: `Bearer ${this.#accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        )
        .pipe(map((response) => response.response));

    return fetch(
      "https://www.lefrecce.it/Channels.Website.BFF.WEB/website/travel/solutions",
      {
        method: "POST",
        body: JSON.stringify(parseBodyRequest(bodyRequest)),
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

  /**
   * Returns the access token.
   *
   * @returns The access token.
   */
  getAccessToken(): string | null {
    return this.#accessToken;
  }

  /**
   * Returns the refresh token.
   *
   * @returns The refresh token.
   */
  getRefreshToken() : string | null {
    return this.#refreshToken;
  }
}
