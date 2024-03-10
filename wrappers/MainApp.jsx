import React from 'react';

const MainApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default MainApp;
