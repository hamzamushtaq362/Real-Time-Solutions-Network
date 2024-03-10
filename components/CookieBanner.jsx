import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="yes, ok"
      cookieName="rtsnConsent"
      style={{
        background: '#1F1C1F',
        fontSize: '16px',
        width: 600,
        margin: 'auto',
        right: 0,
        borderRadius: 12,
        fontFamily: 'SF Pro Display, Inter',
        color: '#929092'
      }}
      buttonStyle={{
        background: '#434043',
        color: '#fff',
        fontSize: '11px',
        border: '1px solid #4D4D4D',
        borderRadius: 12,
        fontFamily: 'SF Pro Display, Inter',
        height: 29,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 15px'
      }}
      expires={365}
    >
      We use cookies to provide you with a personalised experience.
    </CookieConsent>
  );
};

export default CookieBanner;
