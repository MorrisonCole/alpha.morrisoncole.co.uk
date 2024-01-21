interface IntlMessages {
  default: Record<string, string>;
}

export const loadIntlMessages = async (
  locale?: string,
  defaultLocale = "en",
): Promise<Record<string, string>> => {
  if (locale === undefined || locale === "default") {
    locale = defaultLocale;
  }

  try {
    const messages = (await import(
      `@/compiled-lang/${locale}.json`
    )) as IntlMessages;
    return messages.default;
  } catch (error) {
    throw new Error(
      'Could not load compiled language files. Please run "yarn i18n:compile" first"',
    );
  }
};
