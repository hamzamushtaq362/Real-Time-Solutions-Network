import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { APP_URL, BASE_URL } from '~/apis';

const DribbbleRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      const code = router.query.code;

      // Send 'code' to your backend for token exchange
      axios.post(`${BASE_URL}/api/v1/dribbble/callback`, { code })
      .then(() => {
        window.opener.postMessage(
          {
            status: 'success',
            message: 'Authorization Successful!',
          },
          APP_URL
        );
        window.close();
      })
      .catch(error => {
        console.error("Error exchanging token:", error);
      });
    }
  }, [router.query]);

  return (
    <div>
      Authenticating...
    </div>
  );
}
export default DribbbleRedirect;
