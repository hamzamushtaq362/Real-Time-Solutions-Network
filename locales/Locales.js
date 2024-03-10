import Cookies from 'js-cookie';

export const locales = async () => {
  function getLang(lang) {
    return lang === 'English'
      ? 'en'
      : lang === 'French'
      ? 'fr'
      : lang === 'Korean'
      ? 'ko'
      : lang === 'German'
      ? 'de'
      : 'en';
  }

  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    let user = getLang(auth.language_Type);
    Cookies.set('language', user);
  } catch (err) {
    //
  }
};
