import BirthdayProfiles from "@/components/BirthdayProfiles";
import { render } from "@/test";
import mockDataResponse from "@/test/mocks/mockDataResponse.json";
import { fireEvent, screen } from "@testing-library/react";

vi.mock("@/hooks/useFetchUsersQuery", () => ({ default: vi.fn() }));

describe("BirthdayProfiles component", () => {
  it("should render a grid of profile cards", () => {
    render(<BirthdayProfiles />, {
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
    });

    expect(screen.getAllByRole("article")).toHaveLength(12);
  });

  it('should load more profiles when "View More Profiles" button is clicked', () => {
    render(<BirthdayProfiles />, {
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
    });

    expect(screen.getAllByRole("article")).toHaveLength(12);

    fireEvent.click(screen.getByText("View More Profiles"));

    expect(screen.getAllByRole("article")).toHaveLength(24);
  });
});
