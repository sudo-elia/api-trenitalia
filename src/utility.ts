import { QuerySolutions } from "./types";

export const urlLogin = "https://www.lefrecce.it/PicoAuth/api/auth/login";
export const solutionsUrl = "https://www.lefrecce.it/Channels.Website.BFF.WEB/website/travel/solutions";
export const headersLogin = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Referer: "https://www.lefrecce.it/Channels.Website.WEB/it/",
};

export const parseBodyRequest = (request: QuerySolutions) => {
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

export const headersGetSolutions = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});
