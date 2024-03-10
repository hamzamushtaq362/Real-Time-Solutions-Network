import {
  HeaderText, SectionContainer, SectionHeaderContainer,
} from '../elements';
import React, { useState } from 'react';
import {
  FAQDescription,
  FAQTitle,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  PlusIconWrap,
  FAQNumber,
} from './elements';
import PlusIcon from '../../Icons/PlusIcon';
import { Box, useTheme } from '@mui/material';
import { useIsMobileView } from '~/utils';
import { useTranslation } from 'react-i18next';

const faqData = [
  {
    id: 'panel1',
    title: 'What kind of experiences can I post a Collaboration request for?',
    description: 'You can post Collaboration requests for AR, VR, XR or Spatial experiences. Simply choose the desired category and platform that you would like to create the experience for, while creating the Collaboration posting.'
  },
  {
    id: 'panel2',
    title: 'Can I invite external creators to become collaborators on the Collabs that I create on RTSN?',
    description: 'Yes, you can send invites to collaborators outside RTSN, either through email or just by sharing your collaboration link.'
  },
  {
    id: 'panel3',
    title: 'Can I add specific target platforms & marketplaces for which I want to create an AR/VR/XR experience for?',
    description: 'Yes, while creating the Collab, simply choose the list of platforms that you intend to launch the created experience on. It’ll then be visible on the created Collab page.'
  },
  {
    id: 'panel4',
    title: 'I want to create experiences but I only want to invite a few selected creators. Can I make the Collaboration private or hidden from other users? ',
    description: 'Absolutely! You can make the Collaboration private either during the creation process or in the Manage tab after you create the collab. This will hide the collaboration from all the users, and only be visible to the creators that you invite.'
  },
  {
    id: 'panel5',
    title: 'What’s the cost of posting a new Collab for which I want to find Collaborators? Are there any hidden pricing?',
    description: 'There is no charge to posting collaborations on RTSN or to accept collaborators. There is also no charge to publishing your final work on RTSN. However, if you would like to publish your work as an NFT, you can publish your NFT directly through RTSN (on Polygon), which will make it visible on marketplaces like Opensea. In case of publishing an NFT, you will need to pay the gas fee as needed by the Polygon blockchain.'
  },
  {
    id: 'panel6',
    title: 'Can I list my previous work & collaborations on RTSN?',
    description: 'Absolutely. You can add your existing collaborations to RTSN through the “Create Collab” button & selecting “List Existing Collab”. You can also invite and add your collaborators to the collaborations.'
  },
  {
    id: 'panel7',
    title: 'I want to start building my portfolio in AR, XR, Spatial and VR experiences. How can I find projects to work on?',
    description: 'You can find collaborations to apply to in the “Explore Collabs” page. Depending on what types of projects you want to work on & which creators you would like to collaborate with, you can then apply to those Collabs. Once your application is accepted by the Collab Author, you can then begin to work on those Collaborations.'
  },
  {
    id: 'panel8',
    title: 'How do I build a portfolio that stands out?',
    description: 'To build a strong portfolio, you can begin by completing your profile information, and also adding any previous projects that you have worked on.'
  },
  {
    id: 'panel9',
    title: 'How does the Revenue Sharing between Collaborators work?',
    description: 'If you publish your final Collaboration work as NFT, the earnings will be split between the Collaborators, based on the percentage sharing that was specified at the time of Collab creation.'
  },
  {
    id: 'panel10',
    title: 'Is it necessary to have a crypto wallet to use RTSN?',
    description: 'Not at all. You can sign up using your email.'
  },
  {
    id: 'panel11',
    title: 'I have a partnership request. How do I contact the RTSN team?',
    description: 'Please send an email to partners@rtsn.xyz with details and our team will get back to you within 48 hours.'
  }
];


export const FaqSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobileView = useIsMobileView();
  const [expanded, setExpanded] = useState('');


  const handleChangeExpanded =
    (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false)

  return (
    <SectionContainer>
      <Box pb={isMobileView ? 10 : 14}>
        <SectionHeaderContainer>
          <HeaderText width='100%' textAlign='center' fontSize={190}>{t('FAQ')}</HeaderText>
        </SectionHeaderContainer>

        <Box borderTop={`1px solid ${theme.palette.border2}`} borderBottom={`1px solid ${theme.palette.border2}`}>
          {faqData.map((faq, index) => (
            <Accordion key={faq.id} expanded={expanded === faq.id} onChange={handleChangeExpanded(faq.id)}>
              <AccordionSummary>
                <Box flex={1} display='flex'>
                  <FAQNumber mr={2}>{index+1}</FAQNumber>
                  <FAQTitle>{t(faq.title)}</FAQTitle>
                </Box>
                <PlusIconWrap mr={2} isRotated={expanded === faq.id}>
                  <PlusIcon width={28} height={28} color={theme.palette.text.primary} />
                </PlusIconWrap>
              </AccordionSummary>
              <AccordionDetails>
                <FAQDescription>{faq.description}</FAQDescription>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </SectionContainer>
  );
};
