import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  CollabConnectionDiv,
  CollabMetricText,
  CreatorInfo,
  CreatorInfoData,
  CreatorInfoDataContainer,
  CreatorInfoName,
  DotWrap,
  MetricLabel,
} from 'components/CollabCommon/CollabTile/elements';
import { Box } from '@mui/material';
import { Avatar } from '~/components';
import { truncateString } from '~/utils';

const UserInfo = ({
  creatorImage,
  creatorName,
  totalCollabs,
  connections,
  statusIcon,
  isHovered,
}) => {
  const { t } = useTranslation();

  const formatString = (num) => {
    if (num > 1) {
      return 'Collabs';
    } else {
      return 'Collab';
    }
  };

  return (
    (<Box sx={{ width: '100%', marginLeft: -0.5 }} className="created-by-hover">
      <CreatorInfo p="0 !important">
        <Box sx={{ display: 'flex' }}>
          <Avatar
            size={28}
            showRing={true}
            avatar={creatorImage}
            statusIcon={statusIcon}
          />
          <CreatorInfoData ml={1}>
            <CreatorInfoName hovered={isHovered}>
              {creatorName && creatorName.length > 18
                ? truncateString(creatorName, 18)
                : creatorName}
            </CreatorInfoName>
            <Box
              sx={{
                display: 'flex',
                minWidth: '22rem',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <CreatorInfoDataContainer
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CollabMetricText hovered={isHovered}>
                  {" "}
                  {totalCollabs
                    ? totalCollabs >= 100
                      ? '99+'
                      : totalCollabs
                    : 0}
                  <MetricLabel hovered={isHovered}>
                    {formatString(totalCollabs)}
                  </MetricLabel>
                </CollabMetricText>

                {connections > 0 ? (
                  <>
                    <DotWrap hovered={isHovered}>•</DotWrap>
                    <CollabConnectionDiv>
                      <CollabMetricText hovered={isHovered}>
                        {connections}
                        <MetricLabel hovered={isHovered}>{t("Collaborators")}</MetricLabel>
                      </CollabMetricText>
                    </CollabConnectionDiv>
                  </>
                ) : (
                  <></>
                )}
              </CreatorInfoDataContainer>
            </Box>
          </CreatorInfoData>
        </Box>
      </CreatorInfo>
    </Box>)
  );
};

export default UserInfo;
