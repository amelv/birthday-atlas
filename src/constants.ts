export const API_BASE_URL = "https://randomuser.me/api/";

export const USER_PAGE_SIZE = 10;

export const Countries: Record<string, string> = {
  AU: "Australia",
  BR: "Brazil",
  CA: "Canada",
  CH: "Switzerland",
  DE: "Germany",
  DK: "Denmark",
  ES: "Spain",
  FI: "Finland",
  FR: "France",
  GB: "United Kingdom",
  IE: "Ireland",
  IN: "India",
  IR: "Iran",
  MX: "Mexico",
  NO: "Norway",
  NL: "Netherlands",
  NZ: "New Zealand",
  RS: "Serbia",
  TR: "Turkey",
  UA: "Ukraine",
  US: "United States",
};

export enum SortOption {
  DEFAULT = "",
  FIRST_NAME = "First Name",
  LAST_NAME = "Last Name",
  AGE = "Age",
  COUNTRY = "Country",
  BIRTHDAY = "Birthday",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum FilterOption {
  BIRTHDAYS_TODAY = "birthdays-today",
  UPCOMING_BIRTHDAYS = "upcoming-birthdays",
  PAST_BIRTHDAYS = "past-birthdays",
  ALL = "all",
}
