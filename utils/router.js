export const postAuthRedirector = (router) => {
  if (router.pathname === '/') {
    router.push('/dashboard');
  } else {
    const url = new URL(router.asPath, 'http://dummyurl.com');
    const params = new URLSearchParams(url.search);
    params.delete('signup');
    params.delete('invite');

    window.location.href = `${url.pathname}?${params.toString()}`;
  }
};
