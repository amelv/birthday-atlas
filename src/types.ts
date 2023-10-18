import { SortOption, SortOrder } from "@/constants";

export type RandomUser = {
  dob: {
    date: string;
    age: number;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

export type RandomUserAPIResponse = {
  results: Array<RandomUser>;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

export type RandomUserAPIError = {
  error: string;
};

export type SortSetting = {
  by: SortOption;
  order: SortOrder;
};

export interface AppUsersState {
  dataCache: RandomUser[];
  displayList: RandomUser[];
  loading: boolean;
  error: string | null;
}

export interface AppExploreState {
  /* query: string; */
  sort: SortSetting;
  /* ageRange: [number, number];
  filterBy: {
    [option in FilterOption]: boolean;
  }; */
}
