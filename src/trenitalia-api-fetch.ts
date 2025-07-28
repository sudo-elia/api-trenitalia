import { AccessTokenResponse, QuerySolutions, SolutionsResponse } from "./types";
import { headersGetSolutions, headersLogin, urlLogin, parseBodyRequest, solutionsUrl } from "./utility";
import { BaseTrenitaliaAPI } from "./base-api";
import { ITrenitaliaAPI } from "./types";

export class TrenitaliaAPIFetch extends BaseTrenitaliaAPI implements ITrenitaliaAPI<any> {
  public login(request: {
    userName: string;
    password: string;
    company?: string;
  }): Promise<AccessTokenResponse> {
    return fetch(urlLogin, {
      method: "POST",
      headers: headersLogin,
      body: JSON.stringify(request),
    }).then((response) =>
      response
        .json()
        .then((data: AccessTokenResponse) => {
          this.assignTokens(data);
          return data;
        })
    );
  }

  public getSolutions(bodyRequest: QuerySolutions): Promise<SolutionsResponse> {
    return fetch(solutionsUrl, {
      method: "POST",
      body: JSON.stringify(parseBodyRequest(bodyRequest)),
      headers: headersGetSolutions(this.accessToken),
    })
      .then((response: Response) => response.json())
      .catch((error: unknown) => {
        console.error(error);
        throw error;
      });
  }
}
