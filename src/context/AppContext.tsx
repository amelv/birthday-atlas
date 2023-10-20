import { SortOption, SortOrder } from "@/constants";
import {
  AppAction,
  AppContextType,
  AppState,
} from "@/types";
import { sortUsers } from "@/utils";
import { ReactNode, createContext, useContext, useReducer } from "react";


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
          dataCache: action.payload,
          displayList: action.payload,
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

    case "SET_SORT":
      const sort = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          displayList:
            sort.by === SortOption.DEFAULT
              ? state.users.dataCache
              : sortUsers(state.users.dataCache ?? [], sort.by, sort.order),
        },
        exploreSettings: {
          ...state.exploreSettings,
          sort: sort,
        },
      };

    /*
      case "SET_QUERY":
        return {
          ...state,
          exploreSettings: {
            ...state.exploreSettings,
            query: action.payload,
          },
        };

    case "SET_AGE_RANGE":
      return {
        ...state,
        exploreSettings: {
          ...state.exploreSettings,
          ageRange: action.payload,
        },
      };

    case "TOGGLE_FILTER":
      return {
        ...state,
        exploreSettings: {
          ...state.exploreSettings,
          filterBy: {
            ...state.exploreSettings.filterBy,
            [action.payload]: !state.exploreSettings.filterBy[action.payload],
          },
        },
      };
      */
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
    dataCache: [],
    displayList: [],
    loading: false,
    error: null,
  },
  exploreSettings: {
    sort: {
      by: SortOption.DEFAULT,
      order: SortOrder.DESC,
    },
  },
  isSearchToolsOpen: false,
};


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
