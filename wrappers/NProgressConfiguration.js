import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useSelector } from 'react-redux';

NProgress.setColor = (color) => {
  const style = document.createElement('style')
  style.textContent = `
  #nprogress .bar {
    background: ${color} !important;
  }
  `
  document.body.appendChild(style)
}

export const NProgressConfiguration = () => {
  const { themeMode } = useSelector((state) => state.settings);
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.setColor(themeMode === 'dark' ? "white": 'black');
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, [themeMode]);

};
