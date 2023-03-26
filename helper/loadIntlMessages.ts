export type MessageConfig = Record<string, string>;

export default async function loadI18nMessages(
  locale: string,
  defaultLocale = "en"
) {
  if (locale === defaultLocale) {
    return {};
  }

  try {
    return import(`../compiled-lang/${locale}.json`).then(
      (module) => module.default
    );
  } catch (error) {
    throw new Error(
      'Could not load compiled language files. Please run "yarn i18n:compile" first"'
    );
  }
}
