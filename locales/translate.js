import { en } from './en';
import { de } from './de';

const locales = {
  en,
  de,
};

export const getTranslation = (key, locale = 'en') => {
  const curr = locales[locale] ? locales[locale] : en;
  return curr[key] ? curr[key] : en[key] ? en[key] : key;
};
