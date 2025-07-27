
export type library = 'rxjs' | 'fetch';

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

/**
 * It includes an array of solutions and an array of favourites.
 */
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
