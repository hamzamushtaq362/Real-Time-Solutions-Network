import {
  FooterMainContainer,
  TradeMarkText,
  FooterWrapper,
  FooterBottom,
  NavigationsContainer,
  NavItem,
} from './elements';
import { useTranslation } from 'react-i18next';

export const FooterBottomSection = ({ backgroundColor }) => {
  const { t } = useTranslation();
  return (
    (<FooterBottom backgroundColor={backgroundColor ? backgroundColor : ''}>
      <TradeMarkText>{t("© 2023 | Time Space Ventures")}</TradeMarkText>
      <NavigationsContainer>
        <NavItem>{t('Privacy Policy')}</NavItem>
        <NavItem>{t('Cookies')}</NavItem>
        <NavItem>{t('Terms')}</NavItem>
      </NavigationsContainer>
    </FooterBottom>)
  );
};

export const FooterSection = () => {
  // const { t } = useTranslation();
  return (
    (<FooterWrapper>
      <FooterMainContainer>
        {/*<LogosContainer>*/}
        {/*  <BrandContainer>*/}
        {/*    <BigHeading>{t("RTSN")}</BigHeading>*/}
        {/*  </BrandContainer>*/}
        {/*</LogosContainer>*/}

        <FooterBottomSection />
      </FooterMainContainer>
    </FooterWrapper>)
  );
};
