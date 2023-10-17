import { useAppContext } from "@/context/AppContext";
import { RandomUserAPIError } from "@/types";
import { fetchUsers } from "@/utils";
import { useEffect } from "react";

function useFetchUsersQuery() {
  const [, dispatch] = useAppContext();

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        dispatch({ type: "SET_USERS_LOADING" });
        const results = await fetchUsers();
        if (!ignore) {
          dispatch({ type: "SET_USERS_LOADED", payload: results });
        }
      } catch (error) {
        dispatch({
          type: "SET_USERS_ERROR",
          payload: (error as RandomUserAPIError)?.error,
        });
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);
}

export default useFetchUsersQuery;
