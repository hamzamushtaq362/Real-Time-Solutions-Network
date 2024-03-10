import React, { useState } from 'react';
import {
  NFTTileContainer,
  NFTImage,
  NFTTitleText,
  NFTDetailsContainer,
  NFTDescription,
} from './elements';
import { getCorrectImage, truncateString } from '~/utils';
import { NFTTileSkeleton } from './NFTTileSkeleton';
import Link from 'next/link';
import { useEffect } from 'react';

export const NFTCardMain = ({
  imgSrc,
  title,
  description,
  isLoading,
  contractAddress,
  tokenId,
  metadataUri,
  sx,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrcState, setImageSrcState] = useState(imgSrc);

  const updateImageSrc = async () => {
    if (!imgSrc) {
      const correctImage = await getCorrectImage(metadataUri);
      setImageSrcState(correctImage);
    }
  };

  useEffect(() => {
    updateImageSrc();
  }, [contractAddress]);

  return (
    <>
      {!isLoading ? (
        <Link href={`/nft/${contractAddress}/${tokenId || ""}`}>
          <NFTTileContainer
            {...sx}
            // onClick={() => handleClick(title)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            hovered={isHovered}
          >
            <NFTImage src={imgSrc || imageSrcState} alt="nft-image" />
            <NFTDetailsContainer>
              <>
                {title.length > 18 ? (
                  <NFTTitleText hovered={isHovered}>
                    {title
                      ? title.length > 18
                        ? truncateString(title, 18)
                        : title
                      : '-'}
                  </NFTTitleText>
                ) : (
                  <NFTTitleText variant="h3" hovered={isHovered}>
                    {title ? title : '-'}
                  </NFTTitleText>
                )}

                {/* <NFTDataWrap>
                  <CollabMetricText hovered={isHovered}>
                    {getReadableNumbers(itemsCount)}
                    <MetricLabel hovered={isHovered}>
                      Item{itemsCount > 1 && 's'}
                    </MetricLabel>
                  </CollabMetricText>

                  <DotWrap hovered={isHovered}>•</DotWrap>

                  <CollabMetricText hovered={isHovered}>
                    {getReadableNumbers(ownersCount)}
                    <MetricLabel hovered={isHovered}>
                      Owner{ownersCount > 1 && 's'}
                    </MetricLabel>
                  </CollabMetricText>

                  <DotWrap hovered={isHovered}>•</DotWrap>

                  <CollabMetricText hovered={isHovered}>
                    {getReadableNumbers(salesCount)}
                    <MetricLabel hovered={isHovered}>
                      Sale{salesCount > 1 && 's'}
                    </MetricLabel>
                  </CollabMetricText>
                </NFTDataWrap> */}
                {description && (
                  <NFTDescription hovered={isHovered}>
                    {description}
                  </NFTDescription>
                )}
              </>
            </NFTDetailsContainer>
          </NFTTileContainer>
        </Link>
      ) : (
        <NFTTileSkeleton />
      )}
    </>
  );
};
