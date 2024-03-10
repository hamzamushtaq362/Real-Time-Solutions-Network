import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Header from 'components/Landing/Header/Header';
import { Accordion, AccordionSummary, PlusIconWrap } from 'components/Landing/FaqSection/elements';
import PlusIcon from 'components/Icons/PlusIcon';
import {
  HeaderText,
  PrivacySubHeader,
  DescriptionText,
  AccordionDetails,
  PolicyTitle,
  StyledList,
  StyledListItem,
  UppercaseDescription,
} from 'components/PrivacyPolicy/elements';

export default function Terms() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState([]);
  const { t } = useTranslation();


  const handleChangeExpanded = (panel) => {
    if (expanded.includes(panel)){
      setExpanded(expanded.filter(p => p !== panel));
    }else {
      setExpanded([...expanded, panel]);
    }
  };

  return (<>
    <Header />
    <Box
      px={2}
      pt={12}
      pb={8}
      sx={{
        backgroundColor: theme.palette.background.paperLanding,
        border: `1px solid ${theme.palette.border}`,
      }}
    >
      <HeaderText mt={3} mb={2}>{t("Terms of Service")}</HeaderText>

      <Box pb={10}>
        <Accordion key='introduction' expanded={expanded.includes('introduction')} onChange={() => handleChangeExpanded('introduction')}>
          <AccordionSummary>
            <PolicyTitle>{t("1. Introduction")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('introduction')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <DescriptionText>{t(
                "Our aim is to keep this Agreement as readable as possible, but in some cases for legal reasons, some of the language is required \"legalese\"."
              )}</DescriptionText>
            </Box>
          </AccordionDetails>
        </Accordion>


        <Accordion key='acceptance-of-agreement' expanded={expanded.includes('acceptance-of-agreement')} onChange={() => handleChangeExpanded('acceptance-of-agreement')}>
          <AccordionSummary>
            <PolicyTitle>{t("2. Your Acceptance of this Agreement")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('acceptance-of-agreement')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <DescriptionText>{t(
                "These terms of service are entered into by and between You and Time Space Ventures Pvt. Ltd., d/b/a RTSN (\"Company,\" \"we,\" \"our,\" or \"us\"). The following terms and conditions, together with any documents they expressly incorporate by reference (collectively \"Terms of Service\"), govern your access to and use of rtsn.xyz, including any content, functionality, and services offered on or through rtsn.xyz (the \"Website\"), whether as a guest or a registered user."
              )}</DescriptionText>
              <DescriptionText>{t(
                "Please read the Terms of Service carefully before you start to use the Website."
              )}</DescriptionText>
              <DescriptionText>{t(
                "By using the Website [or by clicking to accept or agree to the Terms of Service when this option is made available to you], you accept and agree to be bound and abide by these Terms of Service and our Privacy Policy, found at /privacy-policy, incorporated herein by reference. If you do not want to agree to these Terms of Service, you must not access or use the Website."
              )}</DescriptionText>
              <UppercaseDescription>{t("BY ACCESSING AND USING THIS WEBSITE, YOU:")}</UppercaseDescription>
              <UppercaseDescription>{t(
                "ACCEPT AND AGREE TO BE BOUND AND COMPLY WITH THESE TERMS OF SERVICE;\n                  YOU REPRESENT AND WARRANT THAT YOU ARE THE LEGAL AGE OF MAJORITY UNDER APPLICABLE LAW TO FORM A BINDING CONTRACT WITH US; AND,\n                  YOU AGREE IF YOU ACCESS THE WEBSITE FROM A JURISDICTION WHERE IT IS NOT PERMITTED, YOU DO SO AT YOUR OWN RISK."
              )}</UppercaseDescription>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion key='updates-of-terms' expanded={expanded.includes('updates-of-terms')} onChange={() => handleChangeExpanded('updates-of-terms')}>
          <AccordionSummary>
            <PolicyTitle>{t("3. Updates to Terms of Service")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('updates-of-terms')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "We may revise and update these Terms of Service from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Website thereafter."
            )}</DescriptionText>
            <DescriptionText>{t(
              "Continuing to use the Website or making subsequent purchases following the posting of revised Terms of Service means that you accept and agree to the changes. You are expected to check this page each time you access this Website so you are aware of any changes, as they are binding on you."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='responsibilities' expanded={expanded.includes('responsibilities')} onChange={() => handleChangeExpanded('responsibilities')}>
          <AccordionSummary>
            <PolicyTitle>{t("4. Your Responsibilities")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('responsibilities')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "You are required to ensure that all persons who access the Website are aware of this Agreement and comply with it. The Website, including content or areas of the Website, may require user registration. It is a condition of your use of the Website that all the information you provide on the Website is correct, current, and complete."
            )}</DescriptionText>
            <DescriptionText>{t(
              "Any username, password, or any other piece of information chosen by you, or provided to you as part of our security procedures, must be treated as confidential, and you must not disclose it to any other person or entity. You agree to notify us immediately of any unauthorized access to or use of your username or password or any other breach of security. You also agree to ensure that you log out from your account at the end of each session. You are responsible for any password misuse or any unauthorized access."
            )}</DescriptionText>
            <DescriptionText>{t(
              "YOU ARE SOLELY AND ENTIRELY RESPONSIBLE FOR YOUR USE OF THE WEBSITE AND YOUR COMPUTER, INTERNET AND DATA SECURITY."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='prohibited-activities' expanded={expanded.includes('prohibited-activities')} onChange={() => handleChangeExpanded('prohibited-activities')}>
          <AccordionSummary>
            <PolicyTitle>{t("5. Prohibited Activities")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('prohibited-activities')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "You may use the Website only for lawful purposes and in accordance with these Terms of Service. You agree not to use the Website:"
            )}</DescriptionText>
            <StyledList>
              <StyledListItem>{t(
                "In any way that violates any applicable federal, state, local or international law or regulation (including, without limitation, any laws regarding the exports of data software to and from the U.S. or other countries)."
              )}</StyledListItem>
              <StyledListItem>{t(
                "For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information or otherwise."
              )}</StyledListItem>
              <StyledListItem>{t(
                "To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the Submission Standards set out in these Terms of Service."
              )}</StyledListItem>
              <StyledListItem>{t(
                "To transmit, or procure the sending of, any advertising or promotional material, including any \"junk mail,\" \"chain letter,\" \"spam,\" or any other similar solicitation."
              )}</StyledListItem>
              <StyledListItem>{t(
                "To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other persona or entity (including, without limitation, by using email addresses associated with any of the foregoing)."
              )}</StyledListItem>
              <StyledListItem>{t(
                "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which as determined by us, may harm the Company or users of the website, or expose them to liability."
              )}</StyledListItem>
              <StyledListItem>
              </StyledListItem>
            </StyledList>
            <DescriptionText>{t("Additionally, you agree not to:")}</DescriptionText>
            <StyledList>
              <StyledListItem>{t(
                "Use the Website in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Website, including their ability to engage in real-time activities through the Website."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Use any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying any of the material on the Website."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Use any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying any of the material on the Website."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Use any device, software, or routine that interferes with the proper working of the Website."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Attack the Website via a denial-of-service attack or a distributed denial-of-service attack."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Otherwise attempting to interfere with the proper working of the Website."
              )}</StyledListItem>
            </StyledList>
          </AccordionDetails>
        </Accordion>

        <Accordion key='property-rights' expanded={expanded.includes('property-rights')} onChange={() => handleChangeExpanded('property-rights')}>
          <AccordionSummary>
            <PolicyTitle>{t("6. Intellectual Property Rights")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('property-rights')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws."
            )}</DescriptionText>
            <DescriptionText>{t(
              "These Terms of Service permit you to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website, except as follows:"
            )}</DescriptionText>
            <StyledList>
              <StyledListItem>{t(
                "Your computer may temporarily store copies of such material in RAM incidental to your accessing and viewing those materials."
              )}</StyledListItem>
              <StyledListItem>{t(
                "You may store files that are automatically cached by your Web browser for display enhancement purposes."
              )}</StyledListItem>
              <StyledListItem>{t(
                "You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication or distribution."
              )}</StyledListItem>
              <StyledListItem>{t(
                "If we provide social media features with certain content, you may take such actions as are enabled by such features."
              )}</StyledListItem>
            </StyledList>

            <DescriptionText>{t("You must not:")}</DescriptionText>

            <StyledList>
              <StyledListItem>{t("Modify copies of any materials from this site.")}</StyledListItem>
              <StyledListItem>{t(
                "Delete or alter any of the copyright, trademark, or other proprietary rights notices from copies of materials from this site."
              )}</StyledListItem>
            </StyledList>
            <DescriptionText>{t(
              "You must not access or use for any commercial purposes any part of the website or any services or materials available through the Website."
            )}</DescriptionText>

            <DescriptionText>{t(
              "If you print, copy, modify, download, or otherwise use or provide any other person with access to any part of the Website in breach of the Terms of Service, your right to use the Website will stop immediately and you must, at our option, return or destroy any copies of the materials you have made. No right, title, or interest in or to the Website or any content on the Website is transferred to you, and all rights not expressly granted are reserved by the Company. Any use of the Website not expressly permitted by these Terms of Service is a breach of these Terms of Service and may violate copyright, trademark, and other laws."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='submission-standards' expanded={expanded.includes('submission-standards')} onChange={() => handleChangeExpanded('submission-standards')}>
          <AccordionSummary>
            <PolicyTitle>{t("7. User Submissions and Submission Standards")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('submission-standards')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "The Website may provide you with the opportunity to create, submit, post, display, transmit, public, distribute, or broadcast content and materials to us or in the Website, including but not limited to text, writings, video, audio, photographs, graphics, comments, ratings, reviews, feedback, or personal information or other material (collectively, \"Content\"). You are responsible for your use of the Website and for any content you provide, including compliance with applicable laws, rules, and regulations."
            )}</DescriptionText>
            <DescriptionText>{t(
              "All User Submissions must comply with the Submission Standards and Prohibited Activities set out in these Terms of Service."
            )}</DescriptionText>
            <DescriptionText>{t(
              "Any User Submissions you post to the Website will be considered non-confidential and non-proprietary. By submitting, posting, or displaying content on or through the Website, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, disclose, adapt, modify, publish, transmit, display and distribute such Content for any purpose, commercial advertising, or otherwise, and to prepare derivative works of, or incorporate in other works, such as Content, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media format and through any media channels."
            )}</DescriptionText>
            <DescriptionText>{t("You represent and warrant that:")}</DescriptionText>
            <StyledList>
              <StyledListItem>{t(
                "You own or control all rights in and to the User Submissions and have the right to grant the license granted above to us and our affiliates and service providers, and each of their and our respective licensees, successors, and assigns."
              )}</StyledListItem>
              <StyledListItem>{t("All of your User Submissions comply with these Terms of Service.")}</StyledListItem>
            </StyledList>
            <DescriptionText>{t(
              "We do not assert any ownership over your Content. You retain full ownership of all of your Content and any intellectual property rights or other proprietary rights associated with your Content. We are not liable for any statement or representations in your Content provided by you in any area in the Website. You are solely responsible for your Content related to the Website and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Content. We are not responsible or liable to any third party for the content or accuracy of any User Submissions posted by you or any other user of the Website. User Submissions are not endorsed by us and do not necessarily represent our opinions or the view of any of our affiliates or partners. We do not assume liability for any User Submission or for any claims, liabilities, or losses resulting from any review."
            )}</DescriptionText>

            <DescriptionText>{t(
              "We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Content; (2) to recategorize any Content to place them in more appropriate locations in the Website; and (3) to prescreen or delete any Content at any time and for any reason, without notice. We have no obligation to monitor your Content. Any use of the Website in violation of these Terms of Service may result in, among other things, termination or suspension of your right to use the Website."
            )}</DescriptionText>
            <DescriptionText>{t(
              "These Submission Standards apply to any and all User Submissions. User Submissions must in their entirety comply with all the applicable federal, state, local, and international laws and regulations. Without limiting the foregoing, User Submissions must not:"
            )}</DescriptionText>

            <StyledList>
              <StyledListItem>{t(
                "Contain any material that is defamatory, obscene, indecent, abusive, offensive, misleading, harassing, violent, hateful, inflammatory, or otherwise objectionable."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Promote sexually explicit or pornographic material, violence, or discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Infringe any patent, trademark, trade secret, copyright, or other intellectual property or other rights of any other person."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Violate the legal rights of others or contain any material that could give rise to any civil or criminal liability under applicable laws or regulations or that otherwise may be in conflict with these terms of service and our Privacy Policy."
              )}</StyledListItem>
              <StyledListItem>{t("Be likely to deceive any person.")}</StyledListItem>
              <StyledListItem>{t(
                "Promote any illegal activity, or advocate, promote, or assist in any unlawful act."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Cause annoyance, inconvenience, or needless anxiety or be likely to upset, embarrass, alarm, or annoy any other person."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Impersonate any person, or misrepresent your identity or affiliation with any person or organization."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Involve commercial activities or sales, such as contests, sweepstakes, and other sales promotions, barter, or advertising."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Give the impression that they emanate from or are endorsed by us or any other person or entity, if this is not the case."
              )}</StyledListItem>
            </StyledList>
          </AccordionDetails>
        </Accordion>

        <Accordion key='our-rights' expanded={expanded.includes('our-rights')} onChange={() => handleChangeExpanded('our-rights')}>
          <AccordionSummary>
            <PolicyTitle>{t("8. Our Rights")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('our-rights')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t("We have the right, without provision of notice to:")}</DescriptionText>

            <StyledList>
              <StyledListItem>{t(
                "Remove or refuse to post any User Submission for any or no reason in our sole discretion;"
              )}</StyledListItem>
              <StyledListItem>{t(
                "Take any action with respect to any User Submission that we deem necessary or appropriate in our sole discretion, including if we believe that such User Submission violates the Terms of Service, including the Submission Standards, infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Website or the public, or could create liability for the Company;"
              )}</StyledListItem>
              <StyledListItem>{t(
                "Take appropriate legal action, including, without limitation, referral to or cooperation with law enforcement or regulatory authorities, or notifying the harmed party of any illegal or unauthorized use of the Website; and"
              )}</StyledListItem>
              <StyledListItem>{t(
                "Terminate or suspend your access to all or part of the Website for any or no reason, including, without limitation, any violation of these Terms of Service."
              )}</StyledListItem>
            </StyledList>

            <DescriptionText>{t(
              "YOU WAIVE AND HOLD HARMLESS COMPANY AND ITS PARENT, SUBSIDIARIES, AFFILIATES, AND THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, AND SUCCESSORS FROM ANY AND ALL CLAIMS RESULTING FROM ANY ACTION TAKEN BY THE COMPANY AND ANY OF THE FOREGOING PARTIES RELATING TO ANY, INVESTIGATIONS BY EITHER THE COMPANY OR BY LAW ENFORCEMENT AUTHORITIES."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='third-party-links' expanded={expanded.includes('third-party-links')} onChange={() => handleChangeExpanded('third-party-links')}>
          <AccordionSummary>
            <PolicyTitle>{t("9. Third-Party Links and Content")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('third-party-links')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "For your convenience, this Website may provide links or pointers to third-party sites or third-party content. We make no representations about any other websites or third-party content that may be accessed from this Website. If you choose to access any such sites, you do so at your own risk. We have no control over the third-party content or any such third-party sites and accept no responsibility for such sites or for any loss or damage that may arise from your use of them. You are subject to any terms and conditions of such third-party sites."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='social-media' expanded={expanded.includes('social-media')} onChange={() => handleChangeExpanded('social-media')}>
          <AccordionSummary>
            <PolicyTitle>{t("10. Social Media Features")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('social-media')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "This Website may provide certain social media features that enable you to:"
            )}</DescriptionText>

            <StyledList>
              <StyledListItem>{t(
                "Link from your own or certain third-party websites to certain content on this Website."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Send emails or other communications with certain content, or links to certain content, on this Website."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Cause limited portions of content on this Website to be displayed or appear to be displayed on your own or certain third-party websites."
              )}</StyledListItem>
            </StyledList>

            <DescriptionText>{t(
              "You may use these features solely as they are provided by us and solely with respect to the content they are displayed with. Subject to the foregoing, you must not:"
            )}</DescriptionText>

            <StyledList>
              <StyledListItem>{t("Establish a link from any website that is not owned by you.")}</StyledListItem>
              <StyledListItem>{t(
                "Cause the Website or portions of it to be displayed on, or appear to be displayed by, any other site, for example, framing, deep linking, or in-line linking."
              )}</StyledListItem>
              <StyledListItem>{t("Link to any part of the Website other than the homepage.")}</StyledListItem>
              <StyledListItem>{t(
                "Otherwise take any action with respect to the materials on this Website that is inconsistent with any other provision of these Terms of Use."
              )}</StyledListItem>
            </StyledList>

            <DescriptionText>{t(
              "The Website from which you are linking, or on which you make certain content accessible, must comply in all respects with the Submission Standards set out in these Terms of Service."
            )}</DescriptionText>
            <DescriptionText>{t(
              "You agree to cooperate with us in causing any unauthorized framing or linking immediately to stop."
            )}</DescriptionText>
            <DescriptionText>{t("We reserve the right to withdraw linking permission without notice.")}</DescriptionText>
            <DescriptionText>{t(
              "We may disable all or any social media features and any links at any time without notice in our discretion."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='online-orders' expanded={expanded.includes('online-orders')} onChange={() => handleChangeExpanded('online-orders')}>
          <AccordionSummary>
            <PolicyTitle>{t("11. Online Orders")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('online-orders')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t("(a). Where an order indicates a license is being purchased:")}</DescriptionText>

            <Box ml={3}>
              <DescriptionText>{t(
                "1. All uses on this Website of the terms \"sell\", \"sale\", \"resell\", \"resale\", \"purchase\", \"price\", and the like mean the purchase or sale of a license;"
              )}</DescriptionText>
              <DescriptionText>{t(
                "2. You will comply with all terms and conditions of the applicable license Terms of Service for any goods, digital products or information you obtain through this Website, and you will not cause, induce, or permit others' non-compliance with the terms and conditions of any of license Terms of Services for the goods, digital products or information; and"
              )}</DescriptionText>
              <DescriptionText>{t(
                "3. Except for the limited license granted under the relevant license Terms of Service, nothing in these Terms of Service grants any right, title, or interest in or to (including any license under) any intellectual property rights in or relating to, the good, digital product or information, whether expressly, by implication, estoppel, or otherwise. All right, title, and interest in and to the good, digital product or information are and will remain with Company or its licensors, as applicable."
              )}</DescriptionText>
            </Box>

          </AccordionDetails>
        </Accordion>

        <Accordion key='payment-fees' expanded={expanded.includes('payment-fees')} onChange={() => handleChangeExpanded('payment-fees')}>
          <AccordionSummary>
            <PolicyTitle>{t("12. Payment and Fees")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('payment-fees')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "You may be required to purchase or pay a fee to access our services. We accept Stripe for all purchases. However, Company does not guarantee the availability of any payment method at any moment and Company may add, remove or suspend any payment method temporarily or permanently at Company's sole discretion. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Website and to promptly update account and payment information, including email address, payment method, and payment card expiration date, in order to complete your purchases and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in USD."
            )}</DescriptionText>
            <DescriptionText>{t(
              "You agree to pay all charges or fees at the prices then in effect for your purchases, and you authorize us to charge your chosen payment provider for any such amounts upon making your purchase."
            )}</DescriptionText>
            <DescriptionText>{t(
              "If your purchase is subject to recurring charges, you must keep a valid payment method on file with Company to pay for all incurred and recurring fees. Company will charge applicable fees to any valid payment method that you have provided and you will be invoiced automatically as outlined in the order. You authorize such payment of recurring fees without requiring your prior approval for each recurring charge, until you notify us of your cancellation, or the Company terminates in writing in accordance with these Terms of Service, or until the recurring contract ends, and any and all outstanding fees and charges have been paid in full."
            )}</DescriptionText>
            <DescriptionText>{t(
              "We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment. We also reserve the right to refuse any order placed through the Website."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='cancellation' expanded={expanded.includes('cancellation')} onChange={() => handleChangeExpanded('cancellation')}>
          <AccordionSummary>
            <PolicyTitle>{t("13. Cancellation")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('cancellation')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "You can cancel your subscription at any time by logging into your account or contacting us using the contact information provided below. Your cancellation will take effect at the end of the current billing period."
            )}</DescriptionText>
            <DescriptionText>{t(
              "Subscription purchases are non-refundable, have no monetary value (for example, they are not a cash account or equivalent), and are purchases of only a non-exclusive, revocable, non-assignable and non-transferable right to use the subscription."
            )}</DescriptionText>
            <DescriptionText>{t(
              "You may not transfer, sell, purchase, barter, or trade your subscriptions or attempt or offer to do so. Any attempted transfer will be null and void. Except as required by applicable law, we are not responsible for any refunds or credits in connection with any modified, suspended or terminated subscriptions."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='disclaimers' expanded={expanded.includes('disclaimers')} onChange={() => handleChangeExpanded('disclaimers')}>
          <AccordionSummary>
            <PolicyTitle>{t("14. Disclaimers, Liability and Indemnification")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('disclaimers')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "YOU UNDERSTAND AND AGREE THAT YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY GOODS, DIGITAL PRODUCTS, SERVICES, INFORMATION OR ITEMS FOUND OR ATTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY GOODS, SERVICES, DIGITAL PRODUCTS, INFORMATION OR ITEMS FOUND OR ATTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS, WITHOUT ANY WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW."
            )}</DescriptionText>
            <DescriptionText>{t(
              "YOU ACKNOWLEDGE AND AGREE THAT COMPANY OR ITS RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, OR SUCCESSORS MAKE NO WARRANTY, REPRESENTATION, OR ENDORSEMENT WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, SUITABILITY, ACCURACY, CURRENCY, OR AVAILABILITY OF THE WEBSITE OR ITS CONTENTS OR THAT ANY GOODS, SERVICES, DIGITAL PRODUCTS, INFORMATION OR ITEMS FOUND OR ATTAINED THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR WEBSITE OR THE SERVER THAT MAKES IT AVAILABLE OR CONTENT ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR DESTRUCTIVE CODE."
            )}</DescriptionText>
            <PrivacySubHeader>{t("How We Limit Our Liability to You")}</PrivacySubHeader>
            <DescriptionText>{t(
              "EXCEPT WHERE SUCH EXCLUSIONS ARE PROHIBITED BY LAW, IN NO EVENT SHALL THE COMPANY NOR ITS RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, OR SUCCESSORS BE LIABLE UNDER THESE TERMS OF SERVICE TO YOU OR ANY THIRD-PARTY FOR ANY CONSEQUENTIAL, INDIRECT, INCIDENTAL, EXEMPLARY, SPECIAL, OR PUNITIVE DAMAGES WHATSOEVER, INCLUDING ANY DAMAGES FOR BUSINESS INTERRUPTION, LOSS OF USE, DATA, REVENUE OR PROFIT, COST OF CAPITAL, LOSS OF BUSINESS OPPORTUNITY, LOSS OF GOODWILL, WHETHER ARISING OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), ANY OTHER THEORY OF LIABILITY, OR OTHERWISE, REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE AND WHETHER OR NOT THE COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."
            )}</DescriptionText>
            <PrivacySubHeader>{t("Indemnification")}</PrivacySubHeader>
            <DescriptionText>{t(
              "To the maximum extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Company, its parent, subsidiaries, affiliates, and their respective directors, officers, employees, agents, service providers, contractors, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your breach of these Terms of Service or your use of the Website including, but not limited to, third-party sites and content, any use of the Website's content and services other than as expressly authorized in these Terms of Service or any use of any goods, digital products and information purchased from this Website."
            )}</DescriptionText>

          </AccordionDetails>
        </Accordion>
        <Accordion key='privacy-policy' expanded={expanded.includes('privacy-policy')} onChange={() => handleChangeExpanded('privacy-policy')}>
          <AccordionSummary>
            <PolicyTitle>{t("15. Privacy Policy")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('privacy-policy')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "Your provision of personal information through the Website is governed by our privacy policy located at"
            )}<a href='/privacy-policy'>/privacy-policy</a>the <b>{t("Privacy Policy")}</b>).
            </DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='governing' expanded={expanded.includes('governing')} onChange={() => handleChangeExpanded('governing')}>
          <AccordionSummary>
            <PolicyTitle>{t("16. Governing Law")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('governing')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "The Website and these Terms of Service will be governed by and construed in accordance with the laws of India and any applicable federal laws applicable therein, without giving effect to any choice or conflict of law provision, principle, or rule and notwithstanding your domicile, residence, or physical location. Any action or proceeding arising out of or relating to this Website and/or under these Terms of Service will be instituted in the courts of the Country of India, and each party irrevocably submits to the exclusive jurisdiction of such courts in any such action or proceeding. You waive any and all objections to the exercise of jurisdiction over you by such courts and to the venue of such courts."
            )}</DescriptionText>
            <DescriptionText>{t(
              "If you are a citizen of any European Union country or Switzerland, Norway or Iceland, the governing law and forum shall be the laws and courts of your usual place of residence."
            )}</DescriptionText>
            <DescriptionText>{t(
              "The parties agree that the United Nations Convention on Contracts for the International Sale of Goods will not govern these Terms of Service or the rights and obligations of the parties under these Terms of Service."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='severability' expanded={expanded.includes('severability')} onChange={() => handleChangeExpanded('severability')}>
          <AccordionSummary>
            <PolicyTitle>{t("17. Severability")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('severability')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "If any provision of these Terms of Service is illegal or unenforceable under applicable law, the remainder of the provision will be amended to achieve as closely as possible the effect of the original term and all other provisions of these Terms of Service will continue in full force and effect."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='entire-terms' expanded={expanded.includes('entire-terms')} onChange={() => handleChangeExpanded('entire-terms')}>
          <AccordionSummary>
            <PolicyTitle>{t("18. Entire Terms of Service")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('entire-terms')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "These Terms of Service constitute the entire and only Terms of Service between the parties in relation to its subject matter and replaces and extinguishes all prior or simultaneous Terms of Services, undertakings, arrangements, understandings or statements of any nature made by the parties or any of them whether oral or written (and, if written, whether or not in draft form) with respect to such subject matter. Each of the parties acknowledges that they are not relying on any statements, warranties or representations given or made by any of them in relation to the subject matter of these Terms of Service, save those expressly set out in these Terms of Service, and that they shall have no rights or remedies with respect to such subject matter otherwise than under these Terms of Service save to the extent that they arise out of the fraud or fraudulent misrepresentation of another party. No variation of these Terms of Service shall be effective unless it is in writing and signed by or on behalf of Company."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='waiver' expanded={expanded.includes('waiver')} onChange={() => handleChangeExpanded('waiver')}>
          <AccordionSummary>
            <PolicyTitle>{t("19. Waiver")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('waiver')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "No failure to exercise, and no delay in exercising, on the part of either party, any right or any power hereunder shall operate as a waiver thereof, nor shall any single or partial exercise of any right or power hereunder preclude further exercise of that or any other right hereunder."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='notice' expanded={expanded.includes('notice')} onChange={() => handleChangeExpanded('notice')}>
          <AccordionSummary>
            <PolicyTitle>{t("20. Notice")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('notice')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "We may provide any notice to you under these Terms of Service by: (i) sending a message to the email address you provide to us and consent to us using; or (ii) by posting to the Website. Notices sent by email will be effective when we send the email and notices we provide by posting will be effective upon posting. It is your responsibility to keep your email address current."
            )}</DescriptionText>
            <DescriptionText>{t(
              "To give us notice under these Terms of Service, you must contact us as follows: (i) by personal delivery, overnight courier or registered or certified mail to Time Space Ventures Pvt. Ltd., GOODWORKS SPACES PRIVATE LIMITED Akshay Tech Park, 4th Floor, Plot No 72&73, EPIP Zone, Whitefield, Bangalore, Karnataka, 560066. We may update the address for notices to us by posting a notice on this Website. Notices provided by personal delivery will be effective immediately once personally received by an authorized representative of Company. Notices provided by overnight courier or registered or certified mail will be effective once received and where confirmation has been provided to evidence the receipt of the notice."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

      </Box>

    </Box>
  </>);
}
