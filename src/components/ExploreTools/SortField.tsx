import SortAlphaDown from "@/assets/sort-alpha-down.svg";
import SortAlphaUp from "@/assets/sort-alpha-up.svg";
import SortDown from "@/assets/sort-down.svg";
import SortNumericDown from "@/assets/sort-numeric-down.svg";
import SortNumericUp from "@/assets/sort-numeric-up.svg";
import SortUp from "@/assets/sort-up.svg";
import { useAppContext } from "@/context/AppContext";

import { SortOption, SortOrder } from "@/constants";
import { ChangeEvent, MouseEvent } from "react";
import "./SortField.css";

const getSortOrderToggleIcon = (sortBy: SortOption, sortOrder: SortOrder) => {
  switch (sortBy) {
    case SortOption.DEFAULT:
      return SortDown;
    case SortOption.FIRST_NAME:
      return sortOrder === SortOrder.DESC ? SortAlphaDown : SortAlphaUp;
    case SortOption.LAST_NAME:
      return sortOrder === SortOrder.DESC ? SortAlphaDown : SortAlphaUp;
    case SortOption.AGE:
      return sortOrder === SortOrder.DESC ? SortNumericDown : SortNumericUp;
    case SortOption.BIRTHDAY:
      return sortOrder === SortOrder.DESC ? SortDown : SortUp;
    default:
      return SortDown;
  }
};

function SortField() {
  const [
    {
      exploreSettings: { sort },
    },
    dispatch,
  ] = useAppContext();

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    dispatch({
      type: "SET_SORT",
      payload: { ...sort, by: e.target.value as SortOption },
    });
  }

  function handleToggle(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch({
      type: "SET_SORT",
      payload: {
        ...sort,
        order: sort.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC,
      },
    });
  }

  return (
    <div className="explore-tools__form-group">
      <label htmlFor="sort-by" className="explore-tools__form-label">
        Sort By:
      </label>
      <div className="explore-tools__form-field" id="sort-field">
        <select
          name="sort-by"
          id="sort-by"
          className="explore-tools__form-input"
          value={sort.by}
          onChange={handleSelectChange}
        >
          <option value={SortOption.DEFAULT}>{SortOption.DEFAULT}</option>
          <option value={SortOption.FIRST_NAME}>{SortOption.FIRST_NAME}</option>
          <option value={SortOption.LAST_NAME}>{SortOption.LAST_NAME}</option>
          <option value={SortOption.AGE}>{SortOption.AGE}</option>
          <option value={SortOption.BIRTHDAY}>{SortOption.BIRTHDAY}</option>
        </select>
        <button
          className="explore-tools__form-toggle"
          id="sort-order-toggle"
          type="button"
          aria-label={sort.by === SortOption.DEFAULT ? 'Default sort' : `Toggle sort order: ${sort.order}`}
          disabled={sort.by === SortOption.DEFAULT ? true : false}
          onClick={handleToggle}
        >
          <img
            className="explore-tools__form-toggle__icon"
            src={getSortOrderToggleIcon(sort.by, sort.order)}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default SortField;
