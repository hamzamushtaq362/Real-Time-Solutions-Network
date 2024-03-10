import { useTranslation } from 'react-i18next';
import {
  BannerContainer,
  BannerLink,
  BannerText,
  BannerTextWrap,
} from 'layouts/AuthLayout/elements';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setCurrentQueryPath } from '~/redux';

const ProfileBanner = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <BannerContainer>
      <BannerTextWrap>
        <BannerText>{t("Setup your profile to create/join Collabs")}</BannerText>

        {router.pathname !== '/settings' ? (
          <BannerLink
            onClick={() => {
              dispatch(setCurrentQueryPath('profile'));
              router.push('/settings');
            }}
          >{t("Go to settings →")}</BannerLink>
        ) : (
          <></>
        )}
      </BannerTextWrap>
    </BannerContainer>
  );
};

export default ProfileBanner;
