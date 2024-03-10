import { Box, Grid, useTheme } from '@mui/material';
import { Divider } from 'components/Divider';
import { SubHeading, WrapContainer } from './elements';
import { Avatar } from 'components/Avatar';
import { AvatarSampleImage2 } from 'assets/png';
import { useState } from 'react';
import { PrimaryButton } from 'components/Button';
import PlusIcon from 'components/Icons/PlusIcon';
import { useTranslation } from 'react-i18next';
import { UilTimes } from '@iconscout/react-unicons';

export const ContributedProfile = ({
  name,
  role,
  twitter,
  image,
  isCollabAuthor,
  inverse,
  isAddCreatedProfiles,
  addPreviouslyCollaboratedHandler,
  userId,
  deleteHandler,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const { t } = useTranslation();
  return (
    <WrapContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isAddCreatedProfiles ? (
        <Grid
          container
          spacing={1}
          marginBottom={5}
          alignItems={'center'}
          style={{ position: 'relative' }}
        >
          <Grid item lg={3} xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(1),
                flexGrow: '1',
              }}
            >
              <Avatar size={78} avatar={image ? image : AvatarSampleImage2} />
              <SubHeading inverse={inverse}>{name}</SubHeading>
            </Box>
          </Grid>
          <Grid item lg={3} xs={12}>
            <SubHeading inverse={inverse}>@{twitter}</SubHeading>
          </Grid>
          <Grid item lg={4} xs={12}>
            <SubHeading inverse={inverse}>{role}</SubHeading>
          </Grid>
          {isCollabAuthor && (
            <Grid item lg={2} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: theme.spacing(0.5),
                }}
              >
                <Box
                  fontSize={'50px'}
                  color={
                    inverse
                      ? theme.palette.text.primary
                      : theme.palette.text.inverse
                  }
                >
                  •
                </Box>
                <SubHeading marginTop={'.3rem'} inverse={inverse}>
                  Collab Author
                </SubHeading>
              </Box>
            </Grid>
          )}{' '}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '10px',
                cursor: 'pointer',
              }}
              onClick={() => deleteHandler(index)}
            >
              <UilTimes
                size="20"
                color={
                  !inverse
                    ? theme.palette.text.inverse
                    : theme.palette.text.primary
                }
              />
            </div>
          )}
        </Grid>
      ) : (
        <Grid
          container
          spacing={1}
          marginBottom={5}
          alignItems={'center'}
          onClick={() =>
            addPreviouslyCollaboratedHandler({
              name,
              twitter,
              image,
              userId,
            })
          }
        >
          <Grid item lg={3} xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(1),
                flexGrow: '1',
              }}
            >
              <Avatar size={78} avatar={image ? image : AvatarSampleImage2} />
            </Box>
          </Grid>

          <Grid item lg={3} xs={12}>
            <SubHeading inverse={inverse}>{name}</SubHeading>
          </Grid>
          <Grid item lg={3} xs={12}>
            <SubHeading inverse={inverse}>@{twitter}</SubHeading>
          </Grid>

          <Grid item lg={3} xs={12}>
            <PrimaryButton restrictHoverStyles={true} width={120}>
              <Box display="flex" component="span" mr={0.8} mt={0.5}>
                <PlusIcon width={15} height={15} />
              </Box>
              {t('Add')}
            </PrimaryButton>
          </Grid>
        </Grid>
      )}
      <Divider color={theme.palette.borderLightInverse} margin="32px 0" />
    </WrapContainer>
  );
};
