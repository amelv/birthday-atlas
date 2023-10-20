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

export interface AppState {
  users: AppUsersState;
  exploreSettings: AppExploreState;
  isSearchToolsOpen: boolean;
}

export type AppAction =
  | { type: "SET_USERS_LOADING" }
  | { type: "SET_USERS_LOADED"; payload: RandomUser[] }
  | { type: "SET_USERS_ERROR"; payload: string }
  | { type: "SET_SORT"; payload: SortSetting }
  /*
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_AGE_RANGE"; payload: [number, number] }
  | { type: "TOGGLE_FILTER"; payload: FilterOption }
  */
  | { type: "TOGGLE_SEARCH_TOOLS" };

  export type AppContextType = [AppState, React.Dispatch<AppAction>];
