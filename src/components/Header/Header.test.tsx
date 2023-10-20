import Header from "@/components/Header";
import { render } from "@/test";
import { fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("Header component", () => {
  it("should render the header title", () => {
    const { getByText } = render(<Header />, { providerProps: { value: [] } });
    expect(getByText("The Birthday Atlas")).toBeInTheDocument();
  });

  it("should render settings button and handle click on mobile view", () => {
    vi.mock("@/hooks/useMediaQuery", () => ({ default: vi.fn(() => false) }));
    const mockDispatch = vi.fn();
    const { getByRole } = render(<Header />, {
      providerProps: { value: [, mockDispatch] },
    });

    const toggleButton = getByRole("button", {
      name: "Toggle Search Tools Menu",
    });
    fireEvent.click(toggleButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "TOGGLE_SEARCH_TOOLS" });
  });
});
