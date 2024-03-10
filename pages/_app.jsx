import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import '../styles/nprogress.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-cmdk/dist/cmdk.css';
import '../components/CookieBanner.css';
import '../styles/globals.scss';
import { GlobalAppProvider } from '~/wrappers';
import React from 'react';
import Script from 'next/script';
import MainApp from '../wrappers/MainApp';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';
import { locales } from '../locales/Locales';
import { ko } from '../locales/ko';
import { en } from '../locales/en';
import { fr } from '../locales/fr';
import { de } from '../locales/de';
import CookieBanner from 'components/CookieBanner';

locales();
i18n.use(initReactI18next).init({
  resources: {
    ko: {
      translation: ko,
    },
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
    de: {
      translation: de,
    },
  },
  lng: Cookies.get('language'), // Set the default language
  fallbackLng: 'en', // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // Allow HTML in translations
  },
});

function RTSNApp(props) {
  return (
    <GlobalAppProvider>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-V8JYQF9K9G"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V8JYQF9K9G');
          `,
        }}
      />

      <MainApp {...props} />
      <CookieBanner />
    </GlobalAppProvider>
  );
}

export default RTSNApp;
