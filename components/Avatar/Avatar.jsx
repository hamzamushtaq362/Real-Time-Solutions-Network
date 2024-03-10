import React, { useState } from 'react';
import { Box, Avatar as MuiAvatar, useTheme } from '@mui/material';
import {
  NameAvatarContainer,
  NameAvatarTextContainer,
  AvatarWrapper,
  AvatarNameText,
  AvatarNumberContainer,
  InviteButton,
  AvatarRing,
  TagText,
} from './elements';
import { NameAvatarDescriptionSkeleton } from '~/components';
import { truncateString } from '~/utils';
import { Tooltip } from '~/components';
import { useTranslation } from 'react-i18next';
import { setSelectedUser } from '~/redux';
import { useDispatch } from 'react-redux';
import { UilUserPlus } from '@iconscout/react-unicons';
import {
  CollabConnectionDiv,
  CollabMetricText,
  CreatorInfoData,
  CreatorInfoDataContainer,
  DotWrap,
  MetricLabel,
} from '../CollabCommon/CollabTile/elements';

export const Avatar = ({
  avatar,
  size,
  sx,
  showRing,
  ringColor,
  withBorder,
  borderColor,
  disableHover,
  variant,
  borderSize,
  borderRadius,
  backgroundColor,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  width,
  height,
  objectFit,
  overFlow,
  onClick,
  filledColor,
  ringBorderWidth,
  ringWidth,
  tooltip,
  tooltipPlacement,
}) => {
  const theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip title={tooltip} placement={tooltipPlacement} disabled={!tooltip}>
      <AvatarRing
        showRing={showRing}
        ringColor={ringColor}
        ringSize={parseInt(size) + (ringWidth ?? 12)}
        onMouseEnter={() => !disableHover && setIsHovered(true)}
        onMouseLeave={() => !disableHover && setIsHovered(false)}
        hovered={isHovered}
        filledColor={filledColor}
        ringBorderWidth={ringBorderWidth}
        borderRadius={borderRadius}
      >
        <AvatarWrapper
          size={size}
          sx={sx}
          onClick={onClick}
          {...{ withBorder, borderRadius, borderColor, borderSize }}
        >
          {typeof avatar === 'string' || avatar?.src ? (
            <MuiAvatar
              variant={variant}
              sx={{
                width: width ? width : size ? size : '40px',
                height: height ? height : size ? size : '40px',
                border: withBorder
                  ? `${borderSize ? borderSize : '2px'} solid ${
                      borderColor ? borderColor : theme.palette.primary.main
                    }`
                  : '',
                borderRadius: borderRadius ?? '50%',
                backgroundColor: backgroundColor ? backgroundColor : 'white',
                marginTop,
                marginRight,
                marginBottom,
                marginLeft,
                objectFit: objectFit ? objectFit : 'cover',
                overflow: overFlow ? overFlow : 'hidden',
              }}
              src={avatar?.src ? avatar?.src : avatar}
              alt="Avatar"
            />
          ) : (
            avatar
          )}
        </AvatarWrapper>
      </AvatarRing>
    </Tooltip>
  );
};

export const NameAvatarDescription = ({
  extended,
  avatar,
  statusIcon,
  isInvited,
  name,
  totalCollabs,
  isNew,
  followers,
  sx,
  isLoading,
  onClick,
  onInviteClick,
  id,
  setShowWalletComponent,
  isAdminSelectedWalletForCollab,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onInviteClikHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isAdminSelectedWalletForCollab) {
      onInviteClick();
      dispatch(
        setSelectedUser({
          _id: id,
          label: name,
          value: name,
        }),
        setShowWalletComponent(false),
      );
    } else {
      setShowWalletComponent(true);
    }
  };

  return (
    <>
      {!isLoading ? (
        <NameAvatarContainer sx={sx} extended={extended} onClick={onClick}>
          <Avatar
            size="42px"
            showRing={true}
            avatar={avatar}
            statusIcon={statusIcon}
          />
          <NameAvatarTextContainer>
            <Box display="flex" alignItems="center">
              {name ? (
                <AvatarNameText>
                  {name.length > 18 ? truncateString(name, 18) : name}
                </AvatarNameText>
              ) : (
                'No name found'
              )}
              {isNew && <TagText>{t('New')}</TagText>}
            </Box>

            <CreatorInfoData>
              <Box
                sx={{
                  display: 'flex',
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
                  <CollabMetricText>
                    {' '}
                    {totalCollabs
                      ? totalCollabs >= 100
                        ? '99+'
                        : totalCollabs
                      : 0}
                    <MetricLabel>
                      {t('Collab')}
                      {totalCollabs > 1 && 's'}
                    </MetricLabel>
                  </CollabMetricText>

                  <DotWrap>•</DotWrap>

                  <CollabConnectionDiv>
                    <CollabMetricText>
                      {followers && followers !== 0 ? followers : 0}
                      <MetricLabel>{t('Followers')}</MetricLabel>
                    </CollabMetricText>
                  </CollabConnectionDiv>
                </CreatorInfoDataContainer>
              </Box>
            </CreatorInfoData>
          </NameAvatarTextContainer>

          {extended && (
            <>
              {' '}
              <InviteButton disabled={isInvited} onClick={onInviteClikHandler}>
                {!isInvited ? (
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ margin: '2px', marginBottom: 0 }}>
                      <UilUserPlus size="16" />
                    </Box>
                    <Box>{t('Invite')}</Box>
                  </Box>
                ) : (
                  <>{t('Invited')}</>
                )}
              </InviteButton>{' '}
            </>
          )}
        </NameAvatarContainer>
      ) : (
        <NameAvatarDescriptionSkeleton />
      )}
    </>
  );
};

export const SideBySideAvatars = ({ avatars, limit, size }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {avatars
        .slice(0, limit === 0 ? avatars.length : limit)
        .map(({ image, name }, index) => (
          <Tooltip title={name || 'any'} key={index}>
            <Box>
              <Avatar
                size={size}
                withBorder
                sx={{ marginLeft: index !== 0 ? '-8px' : '0' }}
                avatar={image}
                overflow
              />
            </Box>
          </Tooltip>
        ))}
      {avatars && (
        <>
          {avatars.length - limit > 0 ? (
            <AvatarNumberContainer
              size={size}
              withBorder
              sx={{ marginLeft: '-8px' }}
            >
              +{avatars.length - limit}
            </AvatarNumberContainer>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};
