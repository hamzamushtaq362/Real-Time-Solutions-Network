import React, { useState } from 'react';
import {
  NFTTileContainer,
  NFTImage,
  NFTTitleText,
  NFTDetailsContainer,
  NFTDataWrap,
  NFTDescription,
} from './elements';
import { getReadableNumbers, truncateString } from '~/utils';
import { useRouter } from 'next/router';
import {
  CollabMetricText,
  DotWrap,
  MetricLabel,
} from '../CollabCommon/CollabTile/elements';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const NFTTile = ({
  image,
  title,
  description,
  contractAddress,
  ownersCount,
  salesCount,
  itemsCount,
  sx,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const handleClick = async () => {
    router.push(`/nft/${contractAddress}`);
  };

  return (
    <>
      <Link href={`/nft/${contractAddress}`}>
        <NFTTileContainer
          {...sx}
          onClick={() => handleClick(title)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          hovered={isHovered}
        >
          <NFTImage src={image} alt="nft-image" />
          <NFTDetailsContainer>
            <>
              {title.length > 18 ? (
                <NFTTitleText>
                  {title
                    ? title.length > 18
                      ? truncateString(title, 18)
                      : title
                    : 'No Title Found'}
                </NFTTitleText>
              ) : (
                <NFTTitleText variant="h3" hovered={isHovered}>
                  {title ? title : 'No Title Found'}
                </NFTTitleText>
              )}

              <NFTDataWrap>
                <CollabMetricText>
                  {getReadableNumbers(itemsCount)}
                  <MetricLabel>
                    {t('Item')}{itemsCount > 1 && 's'}
                  </MetricLabel>
                </CollabMetricText>

                <DotWrap hovered={isHovered}>•</DotWrap>

                <CollabMetricText>
                  {getReadableNumbers(ownersCount)}
                  <MetricLabel>
                    {t('Owner')}{ownersCount > 1 && 's'}
                  </MetricLabel>
                </CollabMetricText>

                <DotWrap hovered={isHovered}>•</DotWrap>

                <CollabMetricText>
                  {getReadableNumbers(salesCount)}
                  <MetricLabel>
                    {t('Sale')}{salesCount > 1 && 's'}
                  </MetricLabel>
                </CollabMetricText>
              </NFTDataWrap>
              <NFTDescription>
                {description}
              </NFTDescription>

              {/*<CreatorInfo mt={3} p='0 !important' mb={1}>*/}
              {/*  <Box sx={{ display: 'flex' }}>*/}
              {/*    <Avatar*/}
              {/*      size="32px"*/}
              {/*      showRing={true}*/}
              {/*      avatar={'creatorImage'}*/}
              {/*      // statusIcon={statusIcon}*/}
              {/*    />*/}
              {/*    <CreatorInfoData ml={1}>*/}
              {/*      <CreatorInfoName>*/}
              {/*        Apus Vagner*/}
              {/*      </CreatorInfoName>*/}
              {/*      <Box*/}
              {/*        sx={{*/}
              {/*          display: 'flex',*/}
              {/*          alignItems: 'center',*/}
              {/*          justifyContent: 'flex-start',*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        <CreatorInfoDataContainer*/}
              {/*          sx={{*/}
              {/*            display: 'flex',*/}
              {/*            alignItems: 'center',*/}
              {/*          }}*/}
              {/*        >*/}
              {/*          <CollabMetricText>*/}
              {/*            +3*/}
              {/*            <MetricLabel>*/}
              {/*              co-creators*/}
              {/*            </MetricLabel>*/}
              {/*          </CollabMetricText>*/}
              {/*        </CreatorInfoDataContainer>*/}
              {/*      </Box>*/}
              {/*    </CreatorInfoData>*/}
              {/*  </Box>*/}
              {/*</CreatorInfo>*/}
            </>
          </NFTDetailsContainer>
        </NFTTileContainer>
      </Link>
    </>
  );
};
