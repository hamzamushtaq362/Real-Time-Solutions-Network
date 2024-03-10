import {
  CuratorContainer,
  CuratorLeftSubContainer,
  CuratorRightSubContainer,
  LeftCuratorTextContainer,
  BecomeACuratorText,
  BecomeACuratorSubText,
  UilEditContainer,
  CurationIconContainer,
} from './elements';

import {
  ImageIconElement,
  Spacer,
  PrimaryButton,
  Tooltip,
  BecomeCuratorDialog,
  EditPreferencesCuratorDialog,
  CurationIcon,
} from '~/components';
import { setCurrentDialog } from '~/redux';
import { StarredBadgeSecondaryIcon } from '~/assets';
import { useLocalStorage } from '~/hooks';

import { UilInfoCircle, UilEdit } from '@iconscout/react-unicons';
import { useTheme, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const UserCuratorBanner = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [auth, setAuth] = useLocalStorage('auth');
  const { currentDialog } = useSelector((state) => state.dialog);

  return (<>
    {/* Dialog rendering starts */}
    <BecomeCuratorDialog
      setAuthChanges={setAuth}
      open={currentDialog === 'become-curator-dialog'}
      handleClose={() => dispatch(setCurrentDialog(''))}
    />
    <EditPreferencesCuratorDialog
      open={currentDialog === 'curator-preferences-dialog'}
      handleClose={() => dispatch(setCurrentDialog(''))}
    />
    {/* Dialog rendering End */}
    <CuratorContainer>
      <CuratorLeftSubContainer>
        <ImageIconElement
          src={StarredBadgeSecondaryIcon.src}
          width="100px"
          height="100px"
          marginLeft="20px"
          alignSelf="center"
          opacity={auth?.isCurator ? 1 : 0.4}
        />
        <div>
          <LeftCuratorTextContainer>
            <Spacer value={10} />

            {!auth?.isCurator ? (
              <>
                <BecomeACuratorText>{t('Become a Curator')}</BecomeACuratorText>

                <BecomeACuratorSubText>
                {t('Curate collaborations and earn royalty by being a part of the monetization of the digital assets you help bring to the forefront.')}
                </BecomeACuratorSubText>
              </>
            ) : (
              <>
                {" "}
                <BecomeACuratorText>{t('Status: Curator')}</BecomeACuratorText>
                <BecomeACuratorSubText>
                  {t('You are now a curator. Curate collaborations and earn royalty by being a part of the monetization of the digital assets you help bring to the forefront.')}
                </BecomeACuratorSubText>
              </>
            )}
          </LeftCuratorTextContainer>
          <CuratorRightSubContainer>
            <Tooltip title={t(
              "As a curator, you have the power to bring unique and compelling items to the forefront. Not only do you get the satisfaction of curating a one-of-a-kind piece, but you also earn a royalty on every sale of the item. Imagine being able to share your passion for art, fashion, or collectibles with the world and earn an income from it. Whether you are a seasoned expert or just starting out, curating an item has never."
            )}>
              <Box sx={{ cursor: 'pointer' }}>
                <UilInfoCircle
                  size="22"
                  color={theme.palette.grey.common}
                />
              </Box>
            </Tooltip>

            {!auth?.isCurator ? (
              <PrimaryButton
                width="180px"
                fontWeight={500}
                onClick={() =>
                  dispatch(setCurrentDialog('become-curator-dialog'))
                }
              >
                <CurationIconContainer>
                  <CurationIcon
                    size="22"
                    color={theme.palette.background.paper}
                  />
                  <span>{t('Become curator')}</span>
                </CurationIconContainer>
              </PrimaryButton>
            ) : (
              <PrimaryButton
                width="190px"
                fontWeight={500}
                onClick={() =>
                  dispatch(setCurrentDialog('curator-preferences-dialog'))
                }
              >
                <UilEditContainer>
                  <UilEdit
                    size="18"
                    color={theme.palette.background.paper}
                  />
                  <span>{t('Edit Preferences')}</span>
                </UilEditContainer>
              </PrimaryButton>
            )}
          </CuratorRightSubContainer>
        </div>
      </CuratorLeftSubContainer>
    </CuratorContainer>
  </>);
};
