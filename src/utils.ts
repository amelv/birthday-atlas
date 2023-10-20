import { API_BASE_URL, SortOption, SortOrder } from "@/constants";
import { RandomUser, RandomUserAPIError, RandomUserAPIResponse } from "@/types";

import CakeIcon from "@/assets/cake.svg";
import CalendarEventIcon from "@/assets/calendar-event.svg";
import CheckSquareIcon from "@/assets/check-square.svg";
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

function getCurrentYearBirthday(birthday: string) {
  const birthdayDate = new Date(birthday);
  const now = new Date();
  const todayDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const currentYearBirthdayDate = new Date(
    Date.UTC(
      todayDate.getFullYear(),
      birthdayDate.getMonth(),
      birthdayDate.getDate()
    )
  );
  return currentYearBirthdayDate;
}

export function getSortCompareFunction(
  sortOption: SortOption,
  sortOrder: SortOrder
) {
  return (userA: RandomUser, userB: RandomUser) => {
    switch (sortOption) {
      case SortOption.DEFAULT:
        return 0;

      case SortOption.FIRST_NAME:
        return sortOrder === SortOrder.DESC
          ? userA.name.first.localeCompare(userB.name.first)
          : userB.name.first.localeCompare(userA.name.first);

      case SortOption.LAST_NAME:
        return sortOrder === SortOrder.DESC
          ? userA.name.last.localeCompare(userB.name.last)
          : userB.name.last.localeCompare(userA.name.last);

      case SortOption.AGE:
        return sortOrder === SortOrder.DESC
          ? userA.dob.age - userB.dob.age
          : userB.dob.age - userA.dob.age;

      case SortOption.COUNTRY:
        return sortOrder === SortOrder.DESC
          ? userA.nat.localeCompare(userB.nat)
          : userB.nat.localeCompare(userA.nat);

      case SortOption.BIRTHDAY:
        // Create dates for each birthday to be of current year
        // and compare them
        const currentYearBirthdayDateA = getCurrentYearBirthday(userA.dob.date);
        const currentYearBirthdayDateB = getCurrentYearBirthday(userB.dob.date);
        return sortOrder === SortOrder.DESC
          ? currentYearBirthdayDateA.getTime() -
              currentYearBirthdayDateB.getTime()
          : currentYearBirthdayDateB.getTime() -
              currentYearBirthdayDateA.getTime();

      default:
        throw new Error(`Unsupported sort option: ${sortOption}`);
    }
  };
}

export function sortUsers(
  users: RandomUser[],
  sortOption: SortOption,
  sortOrder: SortOrder
) {
  const compareFunction = getSortCompareFunction(sortOption, sortOrder);
  if (sortOption === SortOption.DEFAULT) {
    return users;
  }
  return [...users].sort(compareFunction);
}

export function getOrdinalAge(n: number) {
  // 1st, 2nd, 3rd, 4th, etc.
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
interface BirthdayDetails {
  date: Date;
  icon: string;
  value: string;
  caption: string;
  class: string;
}

export function getBirthdayDetails(user: RandomUser): BirthdayDetails {
  const birthdayDate = new Date(user.dob.date);
  const now = new Date();
  const todayDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const currentYearBirthdayDate = getCurrentYearBirthday(user.dob.date);
  if (currentYearBirthdayDate.getTime() < todayDate.getTime()) {
    const daysPassed =
      (todayDate.getTime() - currentYearBirthdayDate.getTime()) /
      (1000 * 3600 * 24);
    return {
      date: birthdayDate,
      icon: CheckSquareIcon,
      value: "Celebrated",
      caption: `${daysPassed} days ago.`,
      class: "",
    };
  } else if (currentYearBirthdayDate.getTime() === todayDate.getTime()) {
    return {
      date: birthdayDate,
      icon: CakeIcon,
      value: "TODAY!!!",
      caption: `Happy ${getOrdinalAge(user.dob.age)} birthday!`,
      class: "today",
    };
  } else {
    const daysUntil =
      (currentYearBirthdayDate.getTime() - todayDate.getTime()) /
      (1000 * 3600 * 24);
    return {
      date: birthdayDate,
      icon: CalendarEventIcon,
      value: "Upcoming",
      caption: `${daysUntil} days to go.`,
      class: "upcoming",
    };
  }
}

type AnyObject = { [key: string]: any };

export function deepMerge(target: AnyObject, source: AnyObject): AnyObject {
  const isObject = (obj: any): obj is AnyObject => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    throw new Error('Target and source must be objects');
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}