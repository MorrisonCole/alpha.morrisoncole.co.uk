import React, { createContext, useContext } from "react";
import type { Locale } from "./i18n-config";
import type { Dictionary } from "../types/intl";
import enDictionary from "./dictionaries/en.json";
import jaDictionary from "./dictionaries/ja.json";

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  ja: jaDictionary,
};

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries.en;
};

interface LocaleProviderProps {
  locale: Locale;
  children: React.ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  locale,
  children,
}) => {
  const dictionary = getDictionary(locale);

  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
