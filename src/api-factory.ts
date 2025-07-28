import { Observable } from "rxjs";
import { TrenitaliaAPIFetch } from "./trenitalia-api-fetch";
import { TrenitaliaAPIRxjs } from "./trenitalia-api-rxjs";
import { ITrenitaliaAPI } from "./types";
import { LibraryType } from "./types";

export function trenitaliaAPI(type: 'fetch'): ITrenitaliaAPI<Promise<any>>;
export function trenitaliaAPI(type: 'rxjs'): ITrenitaliaAPI<Observable<any>>;
export function trenitaliaAPI(type: LibraryType): ITrenitaliaAPI<any> {
  if (type === 'fetch') {
    return new TrenitaliaAPIFetch();
  } else if (type === 'rxjs') {
    return new TrenitaliaAPIRxjs();
  } else {
    throw new Error('Unsupported library type. Use "fetch" or "rxjs".');
  }
}
