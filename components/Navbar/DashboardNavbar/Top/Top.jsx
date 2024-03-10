import { useTranslation } from 'react-i18next';
import React from 'react';
import { ConsoleIcon } from '~/assets';
import Image from 'next/image';
import { ConsoleBrandText, TopContainer } from 'components/Navbar/DashboardNavbar/Top/elements';

export const Top = ({ open, setOpen }) => {
  const { t } = useTranslation();

  return (
    (<TopContainer open={open} onClick={() => setOpen(!open)}>
      <Image src={ConsoleIcon} alt={t("RTSN Logo")} />
      {open && <ConsoleBrandText>{t("Console")}</ConsoleBrandText>}
    </TopContainer>)
  );
};
