import { Observable } from "rxjs";

export type LibraryType = 'fetch' | 'rxjs';

export interface ITrenitaliaAPI<T extends Promise<any> | Observable<any>> {
  login(request: {
    userName: string;
    password: string;
    company?: string;
  }): T extends Promise<any> ? Promise<AccessTokenResponse> : Observable<AccessTokenResponse>;

  getSolutions(bodyRequest: QuerySolutions): T extends Promise<any> ? Promise<SolutionsResponse> : Observable<SolutionsResponse>;

  getAccessToken(): string | null;
  getRefreshToken(): string | null;
}

export interface AccessTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface Solution {
  typeDescription: string;
  description: string;
  resourceId: string;
  departureDate: string;
  arrivalDate: string;
  creationDate: string;
  channel: string;
  expirationDate: string | null;
  pnr: string | null;
  travelName: string;
  addToCalendar: boolean;
  downloadPdf: boolean;
  saveable: boolean;
  closed: boolean;
  hidden: boolean;
  statusDescription: string | null;
  date: string;
}

export interface SolutionsResponse {
  solutions: Solution[];
  favourites: any[];
}

export interface QuerySolutions {
    fromDate: string;
    searchType: "DEPARTURE_DATE" | "PURCHASE_DATE" | "PNR";
    code?: string; 
    toDate: string; 
    travelGroup: "TICKET";
}
