import { AppContextProvider } from "@/context/AppContext";
import { AppContextType, AppState } from "@/types";
import { RenderOptions, render as rtlRender } from "@testing-library/react";

type ProviderProps = {
  value: Partial<[Partial<AppState>, AppContextType[1]]>;
};

function render(
  ui: React.ReactElement,
  {
    providerProps,
    renderOptions,
  }: {
    providerProps: ProviderProps;
    renderOptions?: RenderOptions;
  }
) {
  return rtlRender(
    <AppContextProvider {...providerProps}>{ui}</AppContextProvider>,
    renderOptions
  );
}

export * from "@testing-library/react";

export { render };
