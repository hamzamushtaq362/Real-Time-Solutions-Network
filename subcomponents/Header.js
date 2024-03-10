import React from 'react';
import Head from 'next/head';
import config from '~/config';

export default function Header({
  title,
  description,
  favicon,
  keywords,
  image,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={
          keywords ||
          'rtsn, nft, metaverse creators, metaverse opportunity, metaverse community'
        }
      />

      {/* Open graph tags start */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={config.APP_URL} />
      <meta property="og:site_name" content="rtsn." />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:locale" content="en_US" />
      {/* Open graph tags end */}

      {/* Twitter Metatags start */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Twitter Image" />
      {/* Twitter Metatags ends */}

      {/* Favicon */}

      <link rel="icon" href={favicon || '/favicon.ico'} />
    </Head>
  );
}
