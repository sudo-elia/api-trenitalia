import { Observable } from 'rxjs';

interface ITrenitaliaAPI<T extends Promise<any> | Observable<any>> {
    login(request: {
        userName: string;
        password: string;
        company?: string;
    }): T extends Promise<any> ? Promise<AccessTokenResponse> : Observable<AccessTokenResponse>;
    getSolutions(bodyRequest: QuerySolutions): T extends Promise<any> ? Promise<SolutionsResponse> : Observable<SolutionsResponse>;
    getAccessToken(): string | null;
    getRefreshToken(): string | null;
}
interface AccessTokenResponse {
    access_token: string;
    refresh_token: string;
}
interface Solution {
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
interface SolutionsResponse {
    solutions: Solution[];
    favourites: any[];
}
interface QuerySolutions {
    fromDate: string;
    searchType: "DEPARTURE_DATE" | "PURCHASE_DATE" | "PNR";
    code?: string;
    toDate: string;
    travelGroup: "TICKET";
}

declare function trenitaliaAPI(type: 'fetch'): ITrenitaliaAPI<Promise<any>>;
declare function trenitaliaAPI(type: 'rxjs'): ITrenitaliaAPI<Observable<any>>;

export { trenitaliaAPI };
