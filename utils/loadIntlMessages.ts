export type MessageConfig = Record<string, string>;

interface CompiledLangModule {
  default: MessageConfig;
}

const loadI18nMessages = async (
  locale?: string,
  defaultLocale = "en"
): Promise<MessageConfig> => {
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
};

export default loadI18nMessages;
