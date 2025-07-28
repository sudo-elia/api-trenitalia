import { ajax } from "rxjs/ajax";
import { AccessTokenResponse, QuerySolutions, SolutionsResponse } from "./types";
import { headersGetSolutions, headersLogin, urlLogin, parseBodyRequest, solutionsUrl } from "./utility";
import { map, Observable } from "rxjs";
import { BaseTrenitaliaAPI } from "./base-api";
import { ITrenitaliaAPI } from "./types";

export class TrenitaliaAPIRxjs extends BaseTrenitaliaAPI implements ITrenitaliaAPI<any> {
  public login(request: {
    userName: string;
    password: string;
    company?: string;
  }): Observable<AccessTokenResponse> {
    return ajax.post(urlLogin, request, headersLogin).pipe(
      map((res) => {
        const accessData = res.response as AccessTokenResponse;
        this.assignTokens(accessData);
        return accessData;
      })
    );
  }

  public getSolutions(bodyRequest: QuerySolutions): Observable<SolutionsResponse> {
    return ajax
      .post<SolutionsResponse>(
        solutionsUrl,
        parseBodyRequest(bodyRequest),
        headersGetSolutions(this.accessToken)
      )
      .pipe(map((response) => response.response));
  }
}
