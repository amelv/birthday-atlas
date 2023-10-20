import SortField from "@/components/ExploreTools/SortField";
import { SortOption, SortOrder } from "@/constants";
import { render } from "@/test";
import { fireEvent, screen } from "@testing-library/react";

const mockDispatch = vi.fn();

describe("SortField component", () => {
  it("should render the sort dropdown and button", () => {
    render(<SortField />, {
      providerProps: {
        value: [
          {
            exploreSettings: {
              sort: { by: SortOption.DEFAULT, order: SortOrder.DESC },
            },
          },
          mockDispatch,
        ],
      },
    });

    expect(screen.getByLabelText("Sort By:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Default sort" })
    ).toBeInTheDocument();
  });

  it("should dispatch SET_SORT action on dropdown change", () => {
    render(<SortField />, {
      providerProps: {
        value: [
          {
            exploreSettings: {
              sort: { by: SortOption.DEFAULT, order: SortOrder.DESC },
            },
          },
          mockDispatch,
        ],
      },
    });

    fireEvent.change(screen.getByRole("combobox", { name: "Sort By:" }), {
      target: { value: "FIRST_NAME" },
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SORT",
      payload: { by: "FIRST_NAME", order: "ASC" },
    });
  });

  it("should dispatch SET_SORT action on button click", () => {
    render(<SortField />, {
      providerProps: {
        value: [
          {
            exploreSettings: {
              sort: { by: SortOption.DEFAULT, order: SortOrder.DESC },
            },
          },
          mockDispatch,
        ],
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Default sort" }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SORT",
      payload: { by: "DEFAULT", order: "DESC" },
    });
  });
});
