import { FilterOption, SortOrder } from "@/constants";
import {
  AppSettingsState,
  AppUsersState,
  RandomUser,
  SortSetting,
} from "@/types";
import { ReactNode, createContext, useContext, useReducer } from "react";

interface AppState {
  users: AppUsersState;
  searchSettings: AppSettingsState;
  isSearchToolsOpen: boolean;
}

type AppAction =
  | { type: "SET_USERS_LOADING" }
  | { type: "SET_USERS_LOADED"; payload: RandomUser[] }
  | { type: "SET_USERS_ERROR"; payload: string }
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_SORT"; payload: SortSetting }
  | { type: "SET_AGE_RANGE"; payload: [number, number] }
  | { type: "TOGGLE_FILTER"; payload: FilterOption }
  | { type: "TOGGLE_SEARCH_TOOLS" };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USERS_LOADING":
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          error: null,
        },
      };

    case "SET_USERS_LOADED":
      return {
        ...state,
        users: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };

    case "SET_USERS_ERROR":
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          error: action.payload,
        },
      };

    case "SET_QUERY":
      return {
        ...state,
        searchSettings: {
          ...state.searchSettings,
          query: action.payload,
        },
      };

    case "SET_SORT":
      return {
        ...state,
        searchSettings: {
          ...state.searchSettings,
          sort: action.payload,
        },
      };

    case "SET_AGE_RANGE":
      return {
        ...state,
        searchSettings: {
          ...state.searchSettings,
          ageRange: action.payload,
        },
      };

    case "TOGGLE_FILTER":
      return {
        ...state,
        searchSettings: {
          ...state.searchSettings,
          filterBy: {
            ...state.searchSettings.filterBy,
            [action.payload]: !state.searchSettings.filterBy[action.payload],
          },
        },
      };

    case "TOGGLE_SEARCH_TOOLS":
      return {
        ...state,
        isSearchToolsOpen: !state.isSearchToolsOpen,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const initialAppState: AppState = {
  users: {
    data: [],
    loading: false,
    error: null,
  },
  searchSettings: {
    query: "",
    sort: {
      by: null,
      order: SortOrder.ASC,
    },
    ageRange: [0, 100],
    filterBy: {
      [FilterOption.BIRTHDAYS_TODAY]: false,
      [FilterOption.UPCOMING_BIRTHDAYS]: false,
      [FilterOption.PAST_BIRTHDAYS]: false,
      [FilterOption.ALL]: true,
    },
  },
  isSearchToolsOpen: false,
};

type AppContextType = [AppState, React.Dispatch<AppAction>];

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

export default appReducer;
