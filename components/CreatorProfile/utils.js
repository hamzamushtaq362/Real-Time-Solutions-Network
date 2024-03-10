import Image from 'next/image';
import { FacebookIconColored, InstagramIconColored, TwitterIconColored, YoutubeIcon, BehanceIcon, SketchFabIcon, ArtStationIcon, DribbbleIcon, VimeoIcon } from '~/assets';
import React from 'react';


export const socialsLinks = ['facebook', 'twitter', 'instagram', 'linkedin', 'behance', 'artstation', 'dribbble', 'sketchfab', 'youtube', 'vimeo'];

export const getSocialIcon = (link) => {
  if (link?.toLowerCase()?.includes('facebook')) {
    return <Image
      width={22}
      height={22}
      alt="Facebook"
      src={FacebookIconColored.src}
    />
  }
  if (link?.toLowerCase()?.includes('twitter')) {
    return <Image
      width={22}
      height={22}
      alt="Twitter"
      src={TwitterIconColored.src}
    />
  }
  if (link?.toLowerCase()?.includes('instagram')) {
    return <Image
      width={22}
      height={22}
      alt="Instagram"
      src={InstagramIconColored.src}
    />
  }
  if (link?.toLowerCase()?.includes('artstation')) {
    return <Image
      width={22}
      height={22}
      alt="Instagram"
      src={ArtStationIcon.src}
    />
  }
  if (link?.toLowerCase()?.includes('dribbble')) {
    return <Image
      width={22}
      height={22}
      alt="Instagram"
      src={DribbbleIcon.src}
    />
  }
  if (link?.toLowerCase()?.includes('sketchfab')) {
    return <Image
      width={22}
      height={22}
      alt="Instagram"
      src={SketchFabIcon.src}
    />
  }
  if (link?.toLowerCase()?.includes('behance')) {
    return <Image
      width={22}
      height={22}
      alt="Instagram"
      src={BehanceIcon.src}
    />
  }
  if (link?.toLowerCase()?.includes('youtube')) {
    return <Image
      width={22}
      height={22}
      alt="Instagram"
      src={YoutubeIcon.src}
    />
  }
  if (link?.toLowerCase()?.includes('vimeo')) {
    return <Image
      width={22}
      height={22}
      alt="Instagram"
      src={VimeoIcon.src}
    />
  }
};