import BirthdayProfiles from "@/components/BirthdayProfiles";
import { render } from "@/test";
import mockDataResponse from "@/test/mocks/mockDataResponse.json";
import { fireEvent, screen } from "@testing-library/react";

// Mock useFetchUsersQuery hook
vi.mock("@/hooks/useFetchUsersQuery", () => vi.fn());

describe("BirthdayProfiles component", () => {
  it("should render a grid of profile cards", () => {
    render(
      <BirthdayProfiles />,
      {
        providerProps: {
          value: [
            {
              users: {
                dataCache: mockDataResponse.results,
                displayList: mockDataResponse.results,
                loading: false,
                error: null,
              },
            },
          ],
        },
      } // Pass providerProps via the custom render function
    );

    // Check that profile cards are rendered
    expect(screen.getAllByRole("article")).toHaveLength(12);
  });

  it('should load more profiles when "View More Profiles" button is clicked', () => {
    render(
      <BirthdayProfiles />,
      {
        providerProps: {
          value: [
            {
              users: {
                dataCache: mockDataResponse.results,
                displayList: mockDataResponse.results,
                loading: false,
                error: null,
              },
            },
          ],
        },
      } // Pass providerProps via the custom render function
    );

    // Check initial number of profile cards
    expect(screen.getAllByRole("article")).toHaveLength(12);

    // Click "View More Profiles" button
    fireEvent.click(screen.getByText("View More Profiles"));

    // Check updated number of profile cards
    expect(screen.getAllByRole("article")).toHaveLength(24);
  });
});
