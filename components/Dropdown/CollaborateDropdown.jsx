import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
import { Box, Menu, IconButton, useTheme } from '@mui/material';
import { Spacer, NormalInput, Autocomplete, Divider } from '~/components';
import {
  DropdownHeaderText,
  DropdownActionButton,
  InputHeaderText,
  ORText,
} from './elements';
import { useRouter } from 'next/router';
import { BASE_URL } from '~/apis';
import { fetchRefreshToken, reFetchTokenExpire } from '~/redux';
import { collaborateDropdownPaperProps } from './DropdownPaperProps';
import { UilPlusCircle } from '@iconscout/react-unicons';
import { trackMixPanel } from '~/utils';
import axios from 'axios';
import { StyledTooltip } from '../DashboardHome/elements';
import AppContext from 'context/AppContext';

export const CollaborateDropdown = () => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { user } = useContext(AppContext);
  const isProfileComplete = user?.isProfileComplete;

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const collabItems = [
    { label: 'Digi Daigaku Genesis', value: 'Digi Daigaku Genesis' },
    { label: 'Bored Ape Yacht Club', value: 'Bored Ape Yacht Club' },
    { label: 'Planet Apes Official', value: 'Planet Apes Official' },
    { label: 'BBRC OFFICIAL', value: 'BBRC OFFICIAL' },
    {
      label: 'Webaverse Genesis Pass ',
      value: 'Webaverse Genesis Pass',
    },
    { label: 'World Of Women', value: 'World Of Women' },
  ];

  const onInviteClicked = async () => {
    try {
      const f1 = async () => {
        const res = await axios.post(`${BASE_URL}/invitation/sendInvitation`, {
          email: email,
        });
        if (res) return res;
      };
      const res = await reFetchTokenExpire(f1, fetchRefreshToken);

      if (res.data.status === 'success') {
        setEmail('');
      }
    } catch (err) {
      //
    }
  };

  const createCollabHanler = async () => {
    await trackMixPanel('Navbar_collab_Btn');

    router.push('/collab/create');
    setAnchorEl(null);
  };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  return (
    (<React.Fragment>
      <Box
        sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        padding="10px 0"
      >
        <StyledTooltip
          title={
            isProfileComplete
              ? 'Collaborate'
              : 'Complete your profile first to create/join Collabs'
          }
        >
          <span>
            <IconButton
              onClick={createCollabHanler}
              size="large"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              disabled={!isProfileComplete}
            >
              <UilPlusCircle size="22" color={theme.palette.grey.common} />
            </IconButton>
          </span>
        </StyledTooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        disableScrollLock={false}
        onClose={handleClose}
        PaperProps={collaborateDropdownPaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <DropdownHeaderText>{t("Collaborate")}</DropdownHeaderText>

        <Spacer value={24} />
        <Divider width="100%" />

        <Spacer value={32} />

        <InputHeaderText>{t("Email")}</InputHeaderText>
        <Spacer value={2} />
        <NormalInput
          fontWeight={300}
          placeholder={t("Enter email address")}
          borderRadius="11px"
          padding="14px 20px"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Spacer value={64} />

        <InputHeaderText>{t("Invite to Existing Collaboration")}</InputHeaderText>
        <Spacer value={2} />
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Autocomplete
            padding="10px 20px"
            id="autocomplete"
            autoCompleteItems={collabItems}
            onInputChange={() => {
              //
            }}
            onChange={() => {
              //
            }}
            placeholder={t("Select Collab")}
            clearOnBlur
          />
          <Spacer value={10} type="horizontal" />
          <DropdownActionButton
            sx={{ height: '48px', width: '90px' }}
            onClick={() => {
              onInviteClicked();
            }}
          >{t("Invite")}</DropdownActionButton>
        </Box>

        <Spacer value={32} />

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ORText>{t("- or -")}</ORText>
        </Box>

        <Spacer value={32} />

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <StyledTooltip
            title={
              isProfileComplete
                ? null
                : 'Complete your profile first to create/join Collabs'
            }
          >
            <span>
              <DropdownActionButton
                variant="contained"
                onClick={createCollabHanler}
                disabled={!isProfileComplete}
              >{t("Create Collab")}</DropdownActionButton>
            </span>
          </StyledTooltip>
        </Box>
      </Menu>
    </React.Fragment>)
  );
};
