import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Header from 'components/Landing/Header/Header';
import { Accordion, AccordionSummary, PlusIconWrap } from 'components/Landing/FaqSection/elements';
import PlusIcon from 'components/Icons/PlusIcon';
import { FooterSection, SubscribeSection } from '~/components';
import { HeaderText, PrivacySubHeader, DescriptionText, AccordionDetails, PolicyTitle, StyledList, StyledListItem } from 'components/PrivacyPolicy/elements';

export default function PrivacyPolicy() {
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
      <HeaderText mt={3} mb={2}>{t("Privacy Policy")}</HeaderText>

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
                "At Time Space Ventures Pvt. Ltd., d/b/a RTSN (\"us\", \"we\", \"our\" or the\n                  \"Company\") we value your privacy and the importance of safeguarding your\n                  data. This Privacy Policy (the \"Policy\") describes our privacy practices\n                  for the activities set out below. As per your rights, we inform you how\n                  we collect, store, access, and otherwise process information relating\n                  to individuals. In this Policy, personal data (“Personal Data”) refers to\n                  any information that on its own, or in combination with other available\n                  information, can identify an individual."
              )}</DescriptionText>
              <DescriptionText>{t("The office locations of where Time Space Ventures Pvt. Ltd. can be found")}{" "}
                <a href='https://mca.gov.in'>{t("https://mca.gov.in")}</a>
              </DescriptionText>
              <DescriptionText>{t(
                "We are committed to protecting your privacy in accordance with the\n                  highest level of privacy regulation. As such, we follow the obligations\n                  under the below regulations:"
              )}</DescriptionText>
              <StyledList>
                <StyledListItem>{t(
                  "Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and the\n                    applicable provincial legislations"
                )}</StyledListItem>
                <StyledListItem>{t("the EU's General Protection Data Regulation (GDPR)")}</StyledListItem>
                <StyledListItem>{t("Brazil’s Data Protection Legislation (LGPD)")}</StyledListItem>
                <StyledListItem>{t(
                  "California's Consumer Protection Act (CCPA) / California Privacy Rights Act (CPRA) and\n                    California Online Privacy Protection Act (CalOPPA)"
                )}</StyledListItem>
                <StyledListItem>{t("Colorado Privacy Act (CPA)")}</StyledListItem>
                <StyledListItem>{t("Utah Consumer Privacy Act (UCPA)")}</StyledListItem>
                <StyledListItem>{t("Connecticut Data Privacy Act (CTDPA)")}</StyledListItem>
                <StyledListItem>{t("Virginia Consumer Data Protection Act (VCDPA)")}</StyledListItem>
                <StyledListItem>{t("South Africa’s Protection of Personal Information Act (POPIA)")}</StyledListItem>
              </StyledList>
              <PrivacySubHeader>{t("Scope")}</PrivacySubHeader>
              <DescriptionText>{t(
                "This policy applies to the Time Space Ventures Pvt. Ltd. websites,\n                  domains, applications, services, and products."
              )}</DescriptionText>
              <DescriptionText>{t(
                "This Policy does not apply to third-party applications, websites,\n                  products, services or platforms that may be accessed through (non-)\n                  links that we may provide to you. These sites are owned and operated\n                  independently from us, and they have their own separate privacy and\n                  data collection practices. Any Personal Data that you provide to these\n                  websites will be governed by the third-party’s own privacy policy. We\n                  cannot accept liability for the actions or policies of these independent\n                  sites, and we are not responsible for the content or privacy practices\n                  of such sites."
              )}</DescriptionText>
              <PrivacySubHeader>{t("Processing Activities")}</PrivacySubHeader>
              <DescriptionText>{t(
                "This Policy applies when you interact with us by doing any of the\n                  following:"
              )}</DescriptionText>
              <StyledList>
                <StyledListItem>{t("Make use of our application and services as an authorized user")}</StyledListItem>
                <StyledListItem>{t("Visit any of our websites that link to this Privacy Statement")}</StyledListItem>
              </StyledList>
            </Box>
          </AccordionDetails>
        </Accordion>


        <Accordion key='personal-data' expanded={expanded.includes('personal-data')}
                   onChange={() => handleChangeExpanded('personal-data')}>
          <AccordionSummary>
            <PolicyTitle>{t("2. Personal Data We Collect")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('personal-data')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <PrivacySubHeader>{t("What Personal Data We Collect")}</PrivacySubHeader>
              <DescriptionText>{t(
                "When you make a purchase, or attempt to make a purchase, we collect the following types of Personal Data:"
              )}</DescriptionText>
              <DescriptionText>{t("This includes:")}</DescriptionText>
              <StyledList>
                <StyledListItem>{t("Account Information such as your name, email address, and password")}</StyledListItem>
                <StyledListItem>{t(
                  "Payment Information such as your billing address, phone number, credit card, debit card or other payment method"
                )}</StyledListItem>
                <StyledListItem>{t("Location Data")}</StyledListItem>
              </StyledList>
              <DescriptionText>{t(
                "When you use our products and/or features, we collect the following types of Personal Data:"
              )}</DescriptionText>
              <StyledList>
                <StyledListItem>{t("Account Information such as your name, email address, and password")}</StyledListItem>
                <StyledListItem>{t(
                  "Payment Information such as your billing address, phone number, credit card, debit card or other payment method"
                )}</StyledListItem>
                <StyledListItem>{t("Location Data")}</StyledListItem>
                <StyledListItem>{t("Social Media Information")}</StyledListItem>
              </StyledList>
              <PrivacySubHeader>{t("How We Collect Your Personal Data")}</PrivacySubHeader>
              <DescriptionText>{t("We collect Personal Data from the following sources:")}</DescriptionText>
              <DescriptionText>
                <b>{t("From You.")}</b>{t(
                "You may give us your Account Information, Payment Information, Financial Information, Demographic Data, Purchase Information, Content, Feedback, Product Information, by filling in forms, using our products or services, entering information online or by corresponding with us by post, phone, email or otherwise. This includes Personal Data you provide, for example, when you:"
              )}</DescriptionText>
              <StyledList>
                <StyledListItem>{t("Create an account or purchase products on our website;")}</StyledListItem>
                <StyledListItem>{t("Use our products or services;")}</StyledListItem>
                <StyledListItem>{t("Create content through our products or services;")}</StyledListItem>
                <StyledListItem>{t("Express interest in our products or services;")}</StyledListItem>
                <StyledListItem>{t("Downloading software and/or our mobile application;")}</StyledListItem>
                <StyledListItem>{t("Subscribe to our newsletter;")}</StyledListItem>
                <StyledListItem>{t("Complete a voluntary market research survey;")}</StyledListItem>
                <StyledListItem>{t(
                  "Contact us with an inquiry or to report a problem (by phone, email, social media, or messaging service);"
                )}</StyledListItem>
                <StyledListItem>{t("When you log in to our website via social media;")}</StyledListItem>
              </StyledList>

              <DescriptionText>
                <b>{t("Automated technologies or interactions")}</b>{t(
                ": As you interact with our website, we may automatically collect the following types of data (all as described above): Device Data about your equipment, Usage Data about your browsing actions and patterns, and Contact Data where tasks carried out via our website remain uncompleted, such as incomplete orders or abandoned baskets. We collect this data by using cookies, server logs and other similar technologies. Please see our Cookie section (below) for further details."
              )}</DescriptionText>
              <DescriptionText>
                <b>{t("Third parties")}</b>{t(
                ": We may receive Personal Data about you from various third parties, including:"
              )}</DescriptionText>
              <StyledList>
                <StyledListItem>{t(
                  "Account Information and Payment Information from another individual when they purchase a gift for you on our website;"
                )}</StyledListItem>
                <StyledListItem>{t(
                  "Device and Usage Data from third parties, including analytics providers such as Google;"
                )}</StyledListItem>
                <StyledListItem>{t(
                  "Account Information and Payment Data from social media platforms when you log in to our website using such social media platforms;"
                )}</StyledListItem>
                <StyledListItem>{t(
                  "Content from communication services, including email providers and social networks, when you give us permission to access your data on such third-party services or networks;"
                )}</StyledListItem>
                <StyledListItem>{t(
                  "Account Information and Payment Data from third parties, including organizations (such as law enforcement agencies), associations and groups, who share data for the purposes of fraud prevention and detection and credit risk reduction; and"
                )}</StyledListItem>
                <StyledListItem>{t(
                  "Account Information, Payment Data, and Financial Data from providers of technical, payment and delivery services."
                )}</StyledListItem>
              </StyledList>
              <DescriptionText>{t(
                "If you provide us, or our service providers, with any Personal Data relating to other individuals, you represent that you have the authority to do so and acknowledge that it will be used in accordance with this Policy. If you believe that your Personal Data has been provided to us improperly, or to otherwise exercise your rights relating to your Personal Data, please contact us by using the information set out in the “Contact us” section below."
              )}</DescriptionText>
              <PrivacySubHeader>{t("Device and Usage Data")}</PrivacySubHeader>
              <DescriptionText>{t(
                "Device and Usage Data\n                  When you visit a Time Space Ventures Pvt. Ltd. website, we automatically collect and store information about your visit using browser cookies (files which are sent by us to your computer), or similar technology. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. The Help Feature on most browsers will provide information on how to accept cookies, disable cookies or to notify you when receiving a new cookie. If you do not accept cookies, you may not be able to use some features of our Service and we recommend that you leave them turned on."
              )}</DescriptionText>
              <DescriptionText>{t(
                "We also process information when you use our services and products. This information may include:"
              )}</DescriptionText>
              <StyledList>
                <StyledListItem>{t("Device IDs")}</StyledListItem>
                <StyledListItem>{t("Login information")}</StyledListItem>
                <StyledListItem>{t("IP Address")}</StyledListItem>
                <StyledListItem>{t("Time stamps")}</StyledListItem>
                <StyledListItem>{t("Authentication records")}</StyledListItem>
                <StyledListItem>{t("Web terms or searches that led you to the site")}</StyledListItem>
                <StyledListItem>{t("Time zone")}</StyledListItem>
              </StyledList>

              <PrivacySubHeader>{t("Data we collect from third parties")}</PrivacySubHeader>

              <DescriptionText>{t(
                "We may receive your Personal Data from third parties such as companies subscribing to Time Space Ventures Pvt. Ltd. services, partners and other sources. This Personal Data is not collected by us but by a third party and is subject to the relevant third party’s own separate privacy and data collection policies. We do not have any control or input on how your Personal Data is handled by third parties. As always, you have the right to review and rectify this information. If you have any questions you should first contact the relevant third party for further information about your Personal Data. Where that third party is unresponsive to your rights, you may contact the Data Protection Officer at Time Space Ventures Pvt. Ltd. (contact details below)."
              )}</DescriptionText>

              <DescriptionText>{t(
                "Our websites and services may contain links to other websites, applications and services maintained by third parties. The information practices of such other services, or of social media networks that host our branded social media pages, are governed by third parties’ privacy statements, which you should review to better understand those third parties’ privacy practices."
              )}</DescriptionText>

              <PrivacySubHeader>{t("Purpose and Legal Basis for the Processing of Personal Data")}</PrivacySubHeader>


              <DescriptionText>{t(
                "We collect and use your Personal Data with your consent to provide, maintain, and develop our products and services and understand how to improve them."
              )}<br/> <br/>{t("These purposes include:")}<br/> <br/>
              </DescriptionText>

              <DescriptionText>{t(
                "To deliver your product or service\n                  To fulfill orders including electronic and non-electronic shipment\n                  Building a Safe and Secure Environment\n                  To verify or authenticate your identity; and\n                  Investigate and prevent security incidents such as breaches, attacks and hacks"
              )}</DescriptionText>
              <DescriptionText>{t(
                "Providing, Developing, and Improving our Products and Services\n                  Deliver, maintain, debug and improve our products and services.\n                  Enable you to access Time Space Ventures Pvt. Ltd. services and set up accounts.\n                  Provide you with technical and customer support\n                  Where we process your Personal Data to provide a product or service, we do so because it is necessary to perform contractual obligations. All of the above processing is necessary in our legitimate interests to provide products and services and to maintain our relationship with you and to protect our business for example against fraud. Consent will be required to initiate services with you. New consent will be required if any changes are made to the type of data collected. Within our contract, if you fail to provide consent, some services may not be available to you."
              )}</DescriptionText>
              <PrivacySubHeader>{t("International Data Transfer and Storage")}</PrivacySubHeader>
              <DescriptionText>{t(
                "Where possible, we store and process data on servers within the general geographical region where you reside (note: this may not be within the country in which you reside). Your Personal Data may also be transferred to, and maintained on, servers residing outside of your state, province, country or other governmental jurisdiction where the data laws may differ from those in your jurisdiction. We will take appropriate steps to ensure that your Personal Data is treated securely and in accordance with this Policy as well as applicable data protection law. More information about these clauses can be found here:"
              )}<a href="https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32021D0914">{t("https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32021D0914")}</a>
              </DescriptionText>

              <PrivacySubHeader>{t("Sharing and Disclosure")}</PrivacySubHeader>

              <DescriptionText>{t(
                "We will share your Personal Data with third parties only in the ways set out in this Policy or set out at the point when the Personal Data is collected."
              )}</DescriptionText>
              <DescriptionText>{t(
                "We also use Google Analytics to help us understand how our customers use the site. You can read more about how Google uses your Personal Data here:"
              )}<a href="https://www.google.com/intl/en/policies/privacy/">{t("https://www.google.com/intl/en/policies/privacy/")}</a>
              </DescriptionText>
              <DescriptionText>{t("You can also opt-out of Google Analytics here:")}<a href="https://tools.google.com/dlpage/gaoptout">{t("https://tools.google.com/dlpage/gaoptout")}</a>
              </DescriptionText>
              <DescriptionText>{t(
                "We may also use your Personal Data to provide you with targeted marketing via advertisements or communications (such as newsletters)."
              )}</DescriptionText>
              <DescriptionText>{t(
                "For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at"
              )}<a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work">{t(
                "http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
              )}</a>
              </DescriptionText>
              <DescriptionText>{t(
                "Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at:"
              )}<a href="http://optout.aboutads.info/">{t("http://optout.aboutads.info/")}</a>
              </DescriptionText>

              <PrivacySubHeader>{t("Legal Requirement")}</PrivacySubHeader>
              <DescriptionText>{t(
                "We may use or disclose your Personal Data in order to comply with a legal obligation, in connection with a request from a public or government authority, or in connection with court or tribunal proceedings, to prevent loss of life or injury, or to protect our rights or property. Where possible and practical to do so, we will tell you in advance of such disclosure."
              )}</DescriptionText>
              <PrivacySubHeader>{t("Service Providers and Other Third Parties")}</PrivacySubHeader>
              <DescriptionText>{t(
                "We may use a third party service provider, independent contractors, agencies, or consultants to deliver and help us improve our products and services. We may share your Personal Data with marketing agencies, database service providers, backup and disaster recovery service providers, email service providers and others but only to maintain and improve our products and services. For further information on the recipients of your Personal Data, please contact us by using the information in the “Contacting us” section below."
              )}</DescriptionText>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion key='cookies' expanded={expanded.includes('cookies')} onChange={() => handleChangeExpanded('cookies')}>
          <AccordionSummary>
            <PolicyTitle>{t("3. Cookies")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('cookies')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>
              <PrivacySubHeader>{t("What are Cookies?")}</PrivacySubHeader>{t(
              "A cookie is a small file with information that your browser stores on your device. Information in this file is typically shared with the owner of the site in addition to potential partners and third parties to that business. The collection of this information may be used in the function of the site and/or to improve your experience."
            )}</DescriptionText>
            <DescriptionText>
              <PrivacySubHeader>{t("How we use cookies")}</PrivacySubHeader>{t(
              "To give you the best experience possible, we use the following types of cookies:"
            )}</DescriptionText>
            <StyledList>
              <StyledListItem>{t(
                "Strictly Necessary. As a web application, we require certain necessary cookies to run our service."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Preference. We use preference cookies to help us remember the way you like to use our service."
              )}</StyledListItem>
              <StyledListItem>{t(
                "Personalization. Some cookies are used to personalize content and present you with a tailored experience. For example, location could be used to give you services and offers in your area."
              )}</StyledListItem>
            </StyledList>
            <DescriptionText>
              <PrivacySubHeader>{t("How to control your cookies")}</PrivacySubHeader>{t(
              "So long as the cookie is not strictly necessary, you may opt in or out of cookie use at any time. To alter the way in which we collect information from you, visit our Cookie Manager."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='retention' expanded={expanded.includes('retention')} onChange={() => handleChangeExpanded('retention')}>
          <AccordionSummary>
            <PolicyTitle>{t("4. Retention & Deletion")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('retention')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "We will only retain your Personal Data for as long as necessary for the purpose for which that data was collected and to the extent required by applicable law. When we no longer need Personal Data, we will remove it from our systems and/or take steps to anonymize it."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='merger' expanded={expanded.includes('merger')} onChange={() => handleChangeExpanded('merger')}>
          <AccordionSummary>
            <PolicyTitle>{t("5. Merger or Acquisition")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('merger')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "If we are involved in a merger, acquisition or asset sale, your personal information may be transferred. We will provide notice before your personal information is transferred and becomes subject to a different Privacy Policy. Under certain circumstances, we may be required to disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency)."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='data-safe' expanded={expanded.includes('data-safe')} onChange={() => handleChangeExpanded('data-safe')}>
          <AccordionSummary>
            <PolicyTitle>{t("6. How We Keep Your Data Safe")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('data-safe')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "We have appropriate organizational safeguards and security measures in place to protect your Personal Data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed."
            )}</DescriptionText>
            <DescriptionText>{t(
              "The communication between your browser and our website uses a secure encrypted connection wherever your Personal Data is involved."
            )}</DescriptionText>
            <DescriptionText>{t(
              "We require any third party who is contracted to process your Personal Data on our behalf to have security measures in place to protect your data and to treat such data in accordance with the law."
            )}</DescriptionText>
            <DescriptionText>{t(
              "In the unfortunate event of a Personal Data breach, we will notify you and any applicable regulator when we are legally required to do so."
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='rights-personal-data' expanded={expanded.includes('rights-personal-data')} onChange={() => handleChangeExpanded('rights-personal-data')}>
          <AccordionSummary>
            <PolicyTitle>{t("7. Your Rights For Your Personal Data")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('rights-personal-data')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "Depending on your geographical location and citizenship, your rights are subject to local data privacy regulations. These rights may include:"
            )}</DescriptionText>

            <StyledList>
              <StyledListItem>
                <b>{t(
                  "Right to Access (PIPEDA, GDPR Article 15, CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA, LGPD, POPIA)"
                )}</b> <br/>{t(
                "You have the right to learn whether we are processing your Personal Data and to request a copy of the Personal Data we are processing about you."
              )}</StyledListItem>
              <StyledListItem>
                <b>{t(
                  "Right to Rectification (PIPEDA, GDPR Article 16, CPRA, CPA, VCDPA, CTDPA, LGPD, POPIA)"
                )}</b><br/>{t(
                "You have the right to have incomplete or inaccurate Personal Data that we process about you rectified."
              )}</StyledListItem>
              <StyledListItem>
                <b>{t(
                  "Right to be Forgotten (right to erasure) (GDPR Article 17, CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA, LGPD, POPIA)"
                )}</b><br/>{t(
                "You have the right to request that we delete Personal Data that we process about you, unless we need to retain such data in order to comply with a legal obligation or to establish, exercise or defend legal claims."
              )}</StyledListItem>
              <StyledListItem>
                <b>{t("Right to Restriction of Processing (GDPR Article 18, LGPD)")}</b><br/>{t(
                "You have the right to restrict our processing of your Personal Data under certain circumstances. In this case, we will not process your Data for any purpose other than storing it."
              )}</StyledListItem>
              <StyledListItem>
                <b>{t("Right to Portability (PIPEDA, GDPR Article 20, LGPD)")}</b><br/>{t(
                "You have the right to obtain Personal Data we hold about you, in a structured, electronic format, and to transmit such Personal Data to another data controller, where this is (a) Personal Data which you have provided to us, and (b) if we are processing that data on the basis of your consent or to perform a contract with you or the third party that subscribes to services."
              )}</StyledListItem>
              <StyledListItem>
                <b>{t("Right to Opt Out (CPRA, CPA, VCDPA, CTDPA, UCPA)")}</b><br/>{t(
                "You have the right to opt out of the processing of your Personal Data for purposes of: (1) Targeted advertising; (2) The sale of Personal Data; and/or (3) Profiling in furtherance of decisions that produce legal or similarly significant effects concerning you. Under CPRA, you have the right to opt out of the sharing of your Personal Data to third parties and our use and disclosure of your Sensitive Personal Data to uses necessary to provide the products and services reasonably expected by you."
              )}</StyledListItem>
              <StyledListItem>
                <b>{t("Right to Objection (GDPR Article 21, LGPD, POPIA)")}</b><br/>{t(
                "Where the legal justification for our processing of your Personal Data is our legitimate interest, you have the right to object to such processing on grounds relating to your particular situation. We will abide by your request unless we have compelling legitimate grounds for processing which override your interests and rights, or if we need to continue to process the Personal Data for the establishment, exercise or defense of a legal claim."
              )}</StyledListItem>
              <StyledListItem>
                <b>{t(
                  "Nondiscrimination and nonretaliation (CCPA/CPRA, CPA, VCDPA, CTDPA, UCPA)"
                )}</b><br/>{t(
                "You have the right not to be denied service or have an altered experience for exercising your rights."
              )}</StyledListItem>
              <StyledListItem>
                <b>{t("File an Appeal (CPA, VCDPA, CTDPA)")}</b><br/>{t(
                "You have the right to file an appeal based on our response to you exercising any of these rights. In the event you disagree with how we resolved the appeal, you have the right to contact the attorney general located here:"
              )}<br/>{t("If you are based in Colorado, please visit this")}<a href='https://complaints.coag.gov/s/contact-us'>{t("website")}</a>{t("to file a complaint.")}<br/>{t("If you are based in Virginia, please visit this")}<a href='https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint'>{t("website")}</a>{t("to file a complaint.")}<br/>{t("If you are based in Connecticut, please visit this")}<a href='https://portal.ct.gov/AG/Common/Complaint-Form-Landing-page'>{t("website")}</a>{t("to file a complaint.")}<br/>
              </StyledListItem>
              <StyledListItem>
                <b>{t("File a Complaint (GDPR Article 77, LGPD, POPIA)")}</b><br/>{t(
                "You have the right to bring a claim before their competent data protection authority.\n                  If you are based in the EEA, please visit this website ("
              )}<a href='http://ec.europa.eu/newsroom/article29/document.cfm?action=display&doc_id=50061'>{t(
                "http://ec.europa.eu/newsroom/article29/document.cfm?action=display&doc_id=50061"
              )}</a>{t(") for a list of local data protection authorities.")}</StyledListItem>
            </StyledList>

            <PrivacySubHeader>{t("Withdrawing Consent")}</PrivacySubHeader>
            <DescriptionText>
              <DescriptionText>{t(
                "Depending on your geographical location and citizenship, your rights are subject to local data privacy regulations. These rights may include:"
              )}</DescriptionText>
            </DescriptionText>
            <PrivacySubHeader>{t("How to Exercise Your Rights")}</PrivacySubHeader>
            <DescriptionText>
              <DescriptionText>{t(
                "You can make a request to exercise any of these rights in relation to your Personal Data by sending the request to our privacy team by using the form below."
              )}<br/> <br/>{t(
                "For your own privacy and security, at our discretion, we may require you to prove your identity before providing the requested information."
              )}</DescriptionText>
            </DescriptionText>


          </AccordionDetails>
        </Accordion>

        <Accordion key='changes' expanded={expanded.includes('changes')} onChange={() => handleChangeExpanded('changes')}>
          <AccordionSummary>
            <PolicyTitle>{t("8. Changes")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('changes')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "We may modify this Policy at any time. If we make changes to this Policy then we will post an updated version of this Policy at this website. When using our services, you will be asked to review and accept our Privacy Policy. In this manner, we may record your acceptance and notify you of any future changes to this Policy"
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

        <Accordion key='contact' expanded={expanded.includes('contact')} onChange={() => handleChangeExpanded('contact')}>
          <AccordionSummary>
            <PolicyTitle>{t("9. Contact Us")}</PolicyTitle>
            <PlusIconWrap mr={2} isRotated={expanded.includes('contact')}>
              <PlusIcon width={20} height={20} color={theme.palette.text.primary} />
            </PlusIconWrap>
          </AccordionSummary>
          <AccordionDetails>
            <DescriptionText>{t(
              "To request a copy for your information, unsubscribe from our email list, request for your data to be deleted, or ask a question about your data privacy, we've made the process simple:"
            )}</DescriptionText>

            <DescriptionText>{t("To contact us, please email hi@rtsn.xyz")}</DescriptionText>
            <PrivacySubHeader mb='0 !important'>{t("Write to us at:")}</PrivacySubHeader>
            <DescriptionText>{t(
              "Data Privacy Officer of Time Space Ventures Pvt. Ltd.\n\n                GOODWORKS SPACES PRIVATE LIMITED Akshay Tech Park, 4th Floor, Plot No 72&73, EPIP Zone, Whitefield, Bangalore, Karnataka, 560066"
            )}</DescriptionText>
          </AccordionDetails>
        </Accordion>

      </Box>

    </Box>
    <SubscribeSection />
    <FooterSection />
  </>);
}
