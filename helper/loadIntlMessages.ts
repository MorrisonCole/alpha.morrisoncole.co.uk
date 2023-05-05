export type MessageConfig = Record<string, string>;

interface CompiledLangModule {
  default: MessageConfig;
}

export default async function loadI18nMessages(
  locale?: string,
  defaultLocale = "en"
): Promise<MessageConfig> {
  if (
    locale === undefined ||
    locale === defaultLocale ||
    locale === "default"
  ) {
    return {};
  }

  try {
    const importedModule = (await import(
      `../compiled-lang/${locale}.json`
    )) as CompiledLangModule;
    return importedModule.default;
  } catch (error) {
    throw new Error(
      'Could not load compiled language files. Please run "yarn i18n:compile" first"'
    );
  }
}
