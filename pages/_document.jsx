import Document, { Html, Head, Main, NextScript } from 'next/document';

class RTSNDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_GOOGLE_MAPS_API_KEY}&libraries=places`}
          />
          <link rel="stylesheet" href="https://use.typekit.net/uyt6som.css" />
          <link rel="stylesheet" href="https://use.typekit.net/jow6kmj.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RTSNDocument;
