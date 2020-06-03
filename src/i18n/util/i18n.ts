import de from "../../i18n/messages/DE-de.json";
import en from "../../i18n/messages/EN-en.json";

const messages = { "DE-de": de, "EN-us": en };
export function getDefaultLocale(): keyof typeof messages {
  const localeMap = {
    de: "DE-de",
    "de-de": "DE-de",
    en: "EN-us",
    "en-us": "EN-us",
  };

  let browserLang = navigator.language.toLowerCase() as keyof typeof localeMap;
  browserLang = Object.keys(localeMap).includes(browserLang)
    ? browserLang
    : "de-de";

  return localeMap[browserLang] as keyof typeof messages;
}

export function getMessagesForLocale(locale: keyof typeof messages) {
  return messages[locale];
}
