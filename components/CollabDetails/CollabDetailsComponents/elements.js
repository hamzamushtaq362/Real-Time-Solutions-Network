import {
  Box,
  styled,
  Typography,
  Link,
  Avatar,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
} from '@mui/material';
import { PrimaryButton, OpaqueButton } from '../../Button';
import ArrowRightUpIcon from 'components/Icons/ArrowRightUpIcon';
import { ScrollStyles } from 'components/Scroll';

export const CollabTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  fontSize: 72,
  fontWeight: 400,
  letterSpacing: '-2.16px',
}));

export const CollabSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  width: '100%',
  fontSize: 24,
  fontWeight: 400,
  lineHeight: '33.12px',
  letterSpacing: '-0.16px',
  marginTop: theme.spacing(3),
}));
export const CollabDescription = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 24,
  fontWeight: 400,
  lineHeight: '32.12px',
  letterSpacing: '-0.26px',
  whiteSpace: 'pre-wrap',
}));

export const StatsWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

export const StatsLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.label,
  marginRight: theme.spacing(1),
}));

export const StatsValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
}));
export const Circle = styled(Box)(({ theme, width, height, fill }) => ({
  width: width ?? 12,
  height: height ?? 12,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.text.primary}`,
  background: fill,
}));

export const CollabDetailsDescription = styled(Typography)(
  ({ color, theme }) => ({
    ...theme.typography.body4,
    color: color ? color : theme.palette.grey.common,
    width: '80%',
  }),
);

export const CollabSubHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

export const CollabSectionWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
  rowGap: theme.spacing(2),
}));

export const TextBox = styled(Box)(({ theme }) => ({
  ...theme.typography.h9,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.normal4,
  padding: theme.spacing(2, 3.5),
  marginRight: theme.spacing(1),
  borderRadius: 100,
}));

export const RoleLabel = styled(Box)(({ theme, variant }) => ({
  ...theme.typography.h7,
  fontSize: variant === 'small' ? '14px' : '',
  lineHeight: '130%',
  color: theme.palette.text.primary,
}));

export const RoleValue = styled(Box)(({ theme, variant }) => ({
  ...theme.typography.h7,
  fontSize: variant === 'small' ? '14px' : '',
  lineHeight: '130%',
  color: theme.palette.text.label,
}));

export const CollabDetailsImage = styled(Avatar)(() => ({
  width: '100%',
  height: 400,
  borderRadius: 4,
  cursor: 'pointer',
  '@media (min-width: 1700px)': {
    height: '450px',
  },
}));

export const CollabDetailsImageFullRes = styled('img')(({ loading }) => ({
  height: '80vh',
  borderRadius: 0,
  display: loading ? 'none' : 'block',
}));

CollabDetailsImage.defaultProps = {
  variant: 'rounded',
};

export const CollabDetailsHeaderContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  '@media (max-width: 800px)': {
    flexDirection: 'column',
    rowGap: '20px',
  },
}));

export const BackToCollabsLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body5,
  color: theme.palette.grey.common,
  cursor: 'pointer',
}));

BackToCollabsLink.defaultProps = {
  underline: 'none',
};

export const CollabDetailsMemberTileContainer = styled(Box)(
  ({ userType, theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    minWidth: userType === 'applicant' ? '260px' : '238px',
    minHeight: '300px',
    maxWidth: '238px',
    maxHeight: '350px',
    borderRadius: '10px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.background.paper,

    boxShadow: '1px 1px 35px 2px rgba(0,0,0,0.04)',

    '& #message-button': {
      display: 'none',
    },

    '& #applicant-button-group': {
      display: 'none',
    },

    '&:hover': {
      boxShadow: '1px 1px 35px 2px rgba(0,0,0,0.08)',

      '& #message-button': {
        display: 'block',
      },

      '& #upper-text-container': {
        opacity: 0.4,
      },

      '& #lower-text-container': {
        opacity: 0,
      },

      '& #applicant-button-group': {
        display: 'block',
      },
    },
  }),
);

export const CollabMemberName = styled(Typography)(({ theme }) => ({
  ...theme.typography.body5,
  letterSpacing: '0.1px',
  color: theme.palette.text.primary,
}));

export const CollabMemberSubText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  lineHeight: '18px',
  color: theme.palette.grey.common,
}));

export const CollabMemberSubTextDetails = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  lineHeight: '16px',
  color: theme.palette.text.primary,
}));

export const CollabMemberMessageButton = styled(PrimaryButton)({
  position: 'absolute',
  bottom: 14,
  zIndex: 2,
});

export const ApplicantsButtonGroupContainer = styled(Box)({
  margin: 'auto',
  marginTop: 0,
  marginBottom: 0,
  display: 'inline-flex',
  justifyContent: 'space-between',
  bottom: 14,
  zIndex: 2,
  position: 'absolute',
  width: '90%',
});

export const CollabInviteTileContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '260px',
  minWidth: '255px',
  width: '100%',
  maxHeight: '323px',
  minHeight: '323px',
  height: '100%',
  borderRadius: '10px',
  padding: '20px 18px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: theme.palette.background.paper,

  boxShadow: '1px 1px 35px 2px rgba(0,0,0,0.04)',

  '& #invite-again-button': {
    display: 'none',
  },

  '&:hover': {
    boxShadow: '1px 1px 35px 2px rgba(0,0,0,0.08)',

    '& #invite-again-button': {
      display: 'block',
    },
  },
}));

export const InviteTileSmallText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body8,
  color: theme.palette.grey.common,
}));

export const InviteTileText = styled(Typography)(
  ({ color, fontSize, theme }) => ({
    fontSize: fontSize ? fontSize : '14px',
    fontWeight: 400,
    lineHeight: '21px',
    letterSpacing: '0.1px',
    color: color ? color : theme.palette.text.primary,
  }),
);

export const InviteAgainButton = styled(OpaqueButton)({
  position: 'absolute',
  bottom: 16,
});

// TODO: Refactor Grid Containers

export const CollabMembersGridContainer = styled(Box)(({ columnGap }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  rowGap: '30px',
  columnGap: columnGap ? columnGap : '30px',

  '@media (max-width: 800px)': {
    marginLeft: '50px',
  },
}));

export const PlusMoreText = styled(Box)(({ theme }) => ({
  ...theme.typography.h7,
  marginLeft: '4px',
  color: theme.palette.grey.commonSecondary,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
}));

export const CollabDetailsMainContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginTop: theme.spacing(0),

  borderBottom: `1px solid ${theme.palette.text.primary}`,

  '@media (max-width : 800px)': {
    flexDirection: 'column',
  },
}));

export const CollabDetailsLeftContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRight: `1px solid ${theme.palette.text.primary}`,
  paddingRight: theme.spacing(4),
  height: '100%',
}));

export const CollabDetailsRightContainer = styled(Box)(() => ({
  width: '100%',
}));

export const SideDetailsLabelValueContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
});

export const MiniBadgeLabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
  rowGap: theme.spacing(2),
}));

export const TextandImageContentContainer = styled(Box)({
  width: '100%',
  display: 'block',
  position: 'relative',
  overflow: 'hidden',
  marginTop: 28,
});

export const CollabImageWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  marginBottom: theme.spacing(3),
  borderRadius: 4,

  '@media (min-width: 1700px)': {
    height: '450px',
  },
}));

export const CollabDetailsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '14px 30px',
  marginTop: theme.spacing(8),
}));

export const RightPaneLabel = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
export const ActionsWrap = styled(Box)(({ theme, borderBottom, padding }) => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: borderBottom ?? `1px solid ${theme.palette.text.primary}`,
  padding,
}));
export const LikeWrap = styled(Box)(({ theme, hideBorderRight }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: hideBorderRight
    ? 'none'
    : `1px solid ${theme.palette.text.primary}`,
  height: '100%',
}));
export const FollowWrap = styled(Box)(({ theme, cursorDisabled }) => ({
  flex: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  cursor: cursorDisabled ? 'not-allowed' : 'pointer',
  color: theme.palette.text.primary,
}));
export const ShareWrap = styled(Box)(({ theme, hideBorderRight }) => ({
  flex: 1.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: hideBorderRight
    ? 'none'
    : `1px solid ${theme.palette.text.primary}`,
  height: '100%',
  color: theme.palette.text.primary,
}));

export const InfoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderTop: `0.8px solid ${theme.palette.text.primary}`,
  padding: theme.spacing(2, 2, 2, 5),
  borderBottom: `1px solid ${theme.palette.borderLight35}`,
}));
export const InfoTitle = styled(Box)(({ theme }) => ({
  fontSize: 32,
  lineHeight: '44.2px',
  letterSpacing: '0.01em',
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2),
  fontWeight: 200,
}));
export const LookingForTitle = styled(Box)(({ theme, padding }) => ({
  fontSize: 18,
  fontWeight: 400,
  lineHeight: '18.2px',
  letterSpacing: '-0.14px',
  color: theme.palette.text.primary,
  padding: padding ?? theme.spacing(1, 1, 1, 5),
}));
export const LookingForValue = styled(Box)(({ theme, paddingBottom }) => ({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '18.2px',
  letterSpacing: '-0.14px',
  color: theme.palette.text.primary,
  padding: '8px 0',
  paddingBottom: paddingBottom ?? 0,
  width: '100%',
}));
export const InfoItemWrap = styled(Box)(
  ({ theme, padding, paddingTop, borderBottom }) => ({
    display: 'flex',

    alignItems: 'center',

    padding: padding ?? theme.spacing(0.5, 0.5, 0.5, 0.5),
    borderBottom: borderBottom ?? `1px solid ${theme.palette.borderLight35}`,
    paddingTop,
    transition: 'border-bottom 100ms ease-in',
    fontWeight: 400,
  }),
);
export const InfoLabel = styled(Box)(({ theme, width }) => ({
  fontSize: 16,
  lineHeight: '44.7px',
  letterSpacing: '-0.34px',
  color: theme.palette.text.label,
  width: width ?? 100,
  marginLeft: theme.spacing(5),
}));
export const InfoValue = styled(Box)(({ theme }) => ({
  fontSize: 16,
  lineHeight: '18.2px',
  letterSpacing: '-0.14px',
  color: theme.palette.text.primary,
  padding: '8px 4px',
  width: 'fit-content',
  flex: 1,
}));

export const InfoWrap = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const UserName = styled(Box)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
}));
export const UserWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  width: 'fit-content',
}));

export const MissionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const MissionSubContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '200px',
  overflowY: 'scroll',
  overflowX: 'hidden',
  ...ScrollStyles(theme),
}));

export const MissionItem = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const MissionTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.h8,
  color: theme.palette.text.primary,
  flex: 2,
}));

export const MissionAction = styled(Box)(
  ({ theme, status, hovered, hoverMb, underlineHeight }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: status === 'not-started' ? 'pointer' : '',
    position: 'relative',
    width: 'max-content',

    '&::after': {
      content: "''",
      position: 'absolute',
      zIndex: 1,
      left: hovered ? 0 : 'auto',
      right: hovered ? 'auto' : 0,
      width: hovered ? '100%' : 0,
      bottom: hoverMb ?? -5,
      backgroundColor: hovered
        ? theme.palette.text.primary
        : theme.palette.text.inverse,
      height: underlineHeight ?? 1,
      transitionProperty: 'width',
      transitionDuration: '50ms',
      transitionTimingFunction: 'ease-out',
    },
    '&:hover::after, &:focus::after, &:active::after': {
      left: 0,
      right: 'auto',
      width: '100%',
    },
  }),
);

export const MissionText = styled(Typography)(({ theme, color }) => ({
  ...theme.typography.h9,
  color: color ?? theme.palette.text.primary,
}));

export const ArrowRightUpLongIconStyled = styled(ArrowRightUpIcon)(
  ({ theme, hovered }) => ({
    transition: 'transform 0.5s cubic-bezier(.4,.4,0,1)',
    transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
  }),
);

export const ShareIconWrap = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 45,
  right: 0,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.border2}`,
  cursor: 'pointer',
}));

export const ActionText = styled(Box)(
  ({ theme, hovered, underlineHeight }) => ({
    ...theme.typography.h6,
    fontSize: 16,
    color: hovered ? theme.palette.text.inverse : theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    width: 'max-content',

    '&::after': {
      content: "''",
      position: 'absolute',
      zIndex: 1,
      right: 0,
      width: 0,
      bottom: -5,
      backgroundColor: hovered
        ? theme.palette.text.inverse
        : theme.palette.text.primary,
      height: underlineHeight ?? 1,
      transitionProperty: 'width',
      transitionDuration: '50ms',
      transitionTimingFunction: 'ease-out',
    },
    '&:hover::after, &:focus::after, &:active::after': {
      left: 0,
      right: 'auto',
      width: '100%',
    },
  }),
);
export const BottomText = styled('p')(({ theme, inverse, highlight }) => ({
  ...theme.typography.body5,
  color: inverse
    ? highlight
      ? theme.palette.text.inverse
      : theme.palette.text.label
    : highlight
    ? theme.palette.text.primary
    : theme.palette.text.label,
}));

export const CollabEventDetailsText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body4,
  fontWeight: 400,
  color: theme.palette.text.primary,
  textDecoration: 'none', // Remove default underline
  position: 'relative', // Required for absolute positioning of the pseudo-element
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -4, // Adjust this value to control the gap between the text and the underline
    width: '100%',
    borderBottom: `1px solid ${theme.palette.text.primary}`, // Customize the underline
  },
}));

export const ContributedCollabLabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `solid 1px ${theme.palette.borderLight}`,
  borderRadius: '2rem',
  width: '13rem',
  padding: '.5rem',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ShareLogoContainer = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: '#F8F8F8',
  padding: '.5rem',
  borderRadius: '2rem',
}));

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderWidth: '0 0 1px 0',
  borderStyle: 'solid',
  width: '100%',
  borderColor: theme.palette.borderLight35,
  '&:last-child': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  padding: 0,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderWidth: '1px 0 0 0',
  borderStyle: 'solid',
  borderColor: theme.palette.borderLight35,
}));

export const PlusIconWrap = styled(Box)(({ theme }) => ({
  '.verticalLine': {
    transition: 'opacity 400ms ease-in, transform 400ms ease-in',
  },
  '.hidden': {
    opacity: 0,
    transform: 'scaleY(0)',
  },
}));

export const CollabOfferDetailsHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '48px',
  background: theme.palette.background.inverse,
  padding: '0 46px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const CollabOfferDetailsHeaderTitle = styled(Typography)(
  ({ theme }) => ({
    ...theme.typography.h6,
    color: theme.palette.text.inverse,
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '-0.14px',
  }),
);

export const CollabOfferDetailsContainer = styled(Box)({
  width: '100%',
  padding: '10px 46px',
});

export const UserActionsLoadingContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CollabStatusLabel = styled(Box)(({ theme }) => ({
  background: '#dfffb4',
  borderRadius: '8px',
  padding: '8px 16px',
}))