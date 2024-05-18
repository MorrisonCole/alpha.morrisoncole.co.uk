import "server-only";

import type { Locale } from "./i18n-config";
import { Dictionary } from "../../types/intl";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("../dictionaries/en.json"),
  ja: () => import("../dictionaries/ja.json"),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();
