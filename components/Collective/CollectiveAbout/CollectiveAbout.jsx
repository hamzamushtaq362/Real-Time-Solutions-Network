import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  AboutFooterDiv,
  BorderBox,
  CollectiveAboutMainDiv,
  CreateCollectiveHeader,
  BoxContent,
  CreateCollectiveBackgroundDiv,
} from './elements';

import { PrimaryButton } from 'components/Button';
import { Box } from '@mui/system';
import { CreateCollective, AddMembers, AddProjects, Share } from '~/assets';

import { useRouter } from 'next/router';
import { ImageIcon } from 'components/Iconify';
import { useTheme } from '@mui/material/styles';

export const CollectiveAbout = () => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const boxesArr = [
    {
      icon: 'CreateCollective',
      title: 'Create Teams',
    },
    {
      icon: 'AddMembers',
      title: 'Add Members',
    },
    {
      icon: 'AddProjects',
      title: 'Add Collabs',
    },
    {
      icon: 'Share',
      title: 'Share with other',
    },
  ];

  const getIcon = (icon) => {
    if (icon === 'CreateCollective') {
      return CreateCollective.src;
    }
    if (icon === 'AddMembers') {
      return AddMembers.src;
    }
    if (icon === 'AddProjects') {
      return AddProjects.src;
    }
    if (icon === 'Share') {
      return Share.src;
    }
  };

  return (<>
    <CollectiveAboutMainDiv>
      <CreateCollectiveBackgroundDiv>
        <CreateCollectiveHeader>{t("Create Team")}</CreateCollectiveHeader>
        {/*<CreateCollectivePara>*/}
        {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do*/}
        {/*  eiusmod tempor*/}
        {/*</CreateCollectivePara>*/}
        <PrimaryButton
          height={'5rem'}
          width={'27rem'}
          backgroundColor={theme.palette.primary?.common}
          onClick={() => {
            router.push('/team/create');
          }}
        >{t("CREATE YOUR COLLECTIVE")}</PrimaryButton>
      </CreateCollectiveBackgroundDiv>
      <Box sx={{ marginTop: '5rem' }}>
        <CreateCollectiveHeader>{t("How do Teams Work?")}</CreateCollectiveHeader>
      </Box>

      <AboutFooterDiv>
        {boxesArr.map((box, index) => {


          return (
            <BorderBox
              key={index}
              sx={{ borderRight: index == 3 && '1px solid black' }}
            >
              <ImageIcon size={'50px'} src={getIcon(box.icon)} />
              <BoxContent> {box.title}</BoxContent>
            </BorderBox>
          );
        })}
      </AboutFooterDiv>
    </CollectiveAboutMainDiv>
  </>);
};
