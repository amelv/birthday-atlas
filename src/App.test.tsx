import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const headerElement = screen.getByRole("banner");
  expect(headerElement).toBeInTheDocument();
});

test("renders explore tools", () => {
  render(<App />);
  const exploreToolsElement = screen.getByRole("complementary");
  expect(exploreToolsElement).toBeInTheDocument();
});

test("renders birthday profiles", () => {
  render(<App />);
  const birthdayProfilesElement = screen.getByRole("main");
  expect(birthdayProfilesElement).toBeInTheDocument();
});
