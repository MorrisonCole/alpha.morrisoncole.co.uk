export type Theme = "light" | "dark";

export const isValidTheme = (theme?: string): theme is Theme => {
  switch (theme) {
    case "light":
    case "dark":
      return true;
    default:
      return false;
  }
};

export const DEFAULT_THEME: Theme = "light";
