import { API_BASE_URL } from "@/constants";
import { RandomUserAPIError, RandomUserAPIResponse } from "@/types";

const MAX_USERS = 100;
// Include only the fields we need to reduce the payload size:
// Name, nationality, date of birth, and picture
const INCLUDE_OPTIONS = "inc=name,nat,dob,picture";

// Generate a random seed for the API
const API_SEED = crypto.getRandomValues(new Uint32Array(1))[0];

export async function fetchUsers() {
  try {
    const response = await fetch(
      `${API_BASE_URL}?results=${MAX_USERS}&${INCLUDE_OPTIONS}&seed=${API_SEED}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = (await response.json()) as RandomUserAPIResponse;
    return data.results ?? [];
  } catch (error: unknown) {
    console.error(error);
    throw error as RandomUserAPIError;
  }
}
