import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  PinterestEmbed,
  TikTokEmbed,
  TwitterEmbed,
  YouTubeEmbed,
} from 'react-social-media-embed';

export const getSocialEmbed = (url) => {
  if (url.includes('instagram')) {
    return <InstagramEmbed key={url} url={url} width={350} maxWidth={350} />;
  }
  if (url.includes('twitter')) {
    return <TwitterEmbed key={url} url={url} width={350} maxWidth={350} />;
  }
  if (url.includes('linkedin')) {
    return <LinkedInEmbed key={url} url={url} width={350} maxWidth={350} />;
  }
  if (url.includes('facebook')) {
    return <FacebookEmbed key={url} url={url} width={350} maxWidth={350} />;
  }
  if (url.includes('pinterest')) {
    return <PinterestEmbed key={url} url={url} width={350} maxWidth={350} />;
  }
  if (url.includes('tiktok')) {
    return <TikTokEmbed key={url} url={url} width={350} maxWidth={350} />;
  }
  if (url.includes('youtube')) {
    return <YouTubeEmbed key={url} url={url} width={350} maxWidth={350} />;
  }
}