import { styled, Box, Typography, TableCell, Button } from '@mui/material';
import Image from 'next/image';
import { useIsMobileView } from 'utils/utils';
import { Avatar } from '../Avatar';

export const CollectionDetailContainer = styled(Box)({
  width: '100%',
  padding: '0.7rem 0 !important',
});

export const CollectionDetailSNFTContainer = styled(Box)(({ theme }) => {
  const isMobileView = useIsMobileView();
  if (isMobileView) {
    return {
      display: 'grid',
      gridTemplateColumns: '1fr',
      height: 1500,
      margin: 0,
      backgroundColor: theme.palette.background.secondary,
    };
  } else {
    return {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '0 2rem',
      height: 544,
      margin: 0,
      backgroundColor: theme.palette.background.secondary,
    };
  }
});

export const CollectionAttributeContainer = styled(Box)({
  padding: '2rem',
});

export const CollectionDetailBuyingSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '4rem 0',
});

export const CollectionDetailBuyingPriceSection = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  margin: '.5rem 0',
});

export const CollectionDetailBigImageTop = styled(Avatar)({
  width: '100%',
  objectFit: 'cover',
  borderRadius: '30px',
});

export const CollectionDetailTitleContainer = styled(Box)(({ theme }) => {
  const isMobileView = useIsMobileView();
  if (isMobileView) {
    return {
      display: 'block',
      width: '100%',
      padding: '2rem 3rem',
      height: 544,
      color: theme.palette.text.primary,
    };
  } else {
    return {
      display: 'block',
      width: '33.33%',
      padding: '2rem 3rem',
      height: 544,
      color: theme.palette.text.primary,
    };
  }
});

export const CollectionDetailTopBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const CollectionDetailTopBarIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '80px',
}));

export const CollectionDetailBigImageContainer = styled(Box)(({ theme }) => {
  const isMobileView = useIsMobileView();
  if (isMobileView) {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 544,
    };
  } else {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '33.33%',
      height: 544,
    };
  }
});

export const nftCarouselResponsiveRules = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 2,
  initialSlide: 0,
  adaptiveHeight: true,
  arrows: false,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToScroll: 1,
      },
    },
  ],
};

export const CollectionDetailBigImage = styled(Image)(({ theme }) => ({
  border: `14px solid ${theme.palette.background.default}`,
}));

export const CollectionDetailLinksContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '3rem',
}));

export const CollectionAttributeRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const CollectionAttributeTraitContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.grey[500]}`,
  padding: '1rem',
  marginRight: '1rem',
  width: 190,
  height: 124,
  overflow: 'hidden',
}));

export const CollectionDetailInfoContainer = styled(Box)(({ theme }) => ({
  display: 'block',
  marginTop: '0.5rem',
}));

export const CollectionDetailLink = styled('a')(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '130%',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-0.01em',
  color: theme.palette.grey[500] || 'gray',
  width: '100%',
}));

export const CollectionDetailMembersPicture = styled('img')(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  border: `1.5px solid ${theme.palette.grey[500]}`,
  padding: 4,
  display: 'flex',
  alignItems: 'ceenter',
  justifyContent: 'center',
  marginRight: '1rem',
}));

export const CollectionDetailTitleTop = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '36px',
  lineHeight: '130%',
  color: theme.palette.text.primary,
}));

export const CollectionDetailBuyingPricePrimary = styled(Typography)(
  ({ theme }) => ({
      fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '50px',
    color: theme.palette.text.primary,
  }),
);

export const CollectionDetailBuyingPriceSecondary = styled(Typography)(
  ({ theme }) => ({
      fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '50px',
    color: theme.palette.text.secondary,
  }),
);

export const CollectionAttributeHeading = styled(Typography)(({ theme }) => ({
  display: 'block',
  textAlign: 'center',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '18.2px',
  marginBottom: '1.5rem',
  color: theme.palette.text.primary,
}));

export const CollectionAttributeTraitHeading = styled(Typography)(
  ({ theme }) => ({
      fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '16.9px',
    color: theme.palette.text.primary,
    padding: '0.5rem',
  }),
);

export const CollectionAttributeTraitValue = styled(Typography)(
  ({ theme }) => ({
      fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '20.8px',
    color: theme.palette.text.primary,
    padding: '0.5rem 0 0 0',
  }),
);

export const CollectionAttributeTraitCount = styled(Typography)(
  ({ theme }) => ({
      fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '16.9px',
    color: theme.palette.text.secondary,
    padding: '0.2rem 0 0.5rem 0',
  }),
);

export const CollectionAttributeTraitCountMore = styled(Typography)(
  ({ theme }) => ({
      fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    color: theme.palette.text.secondary,
  }),
);

export const CollectionDetailTopBarTitle = styled(Typography)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  padding: '10px 12px',
  gap: '10px',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: '50px',
  color: theme.palette.text.primary,
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '130%',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-0,01em',
}));

export const CollectionDetailBuyingButton = styled(Typography)(({ theme }) => {
  const isMobileView = useIsMobileView();
  return {
      display: isMobileView ? 'block' : 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '12px 32px',
    gap: '10px',
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: '50px',
    color: theme.palette.text.primary,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '130%',
    alignItems: 'center',
    letterSpacing: '-0,01em',
    width: isMobileView ? '100%' : 170,
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.background.paper,
      background: theme.palette.background.inverse,
    },
  };
});

export const CollectionDetailMembersDetailsPrimary = styled(Typography)(
  ({ theme }) => ({
      fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '130%',
    color: theme.palette.text.primary,
  }),
);

export const CollectionDetailMembersDetailsSecondary = styled(Typography)(
  ({ theme }) => ({
      fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '130%',
    color: theme.palette.text.secondary,
  }),
);

export const CollectionDetailMembersDetails = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',
});

export const CollectionDetailMembersContainer = styled(Box)(({ theme }) => {
  const isMobileView = useIsMobileView();
  return {
    display: isMobileView ? 'grid' : 'block',
    gridTemplateColumns: '1fr 1fr',
    padding: isMobileView ? '2rem 0 0 0' : '2rem 0',
  };
});

export const CollectionDetailMembers = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'ceenter',
  justifyContent: 'flex-start',
  padding: '1rem 0',
  // margin: '.5rem 0',
}));

export const CollectionDetailPriceContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const CollectionDetailPriceText = styled(Typography)(({ theme }) => ({
  fontSize: '27px',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

export const CollectionDetailLastPriceText = styled(Typography)({
  marginTop: '-10px',
  fontSize: ' 17px',
  color: '#505049',
});

export const CollectionDetailDescriptionPara = styled(Typography)({
  fontSize: '17px',
  lineHeight: '1.86',
  color: '#5d5d5b',
  margin: '2rem 0 2rem 0',
});

export const CollectionDetailAddressBoxContainer = styled(Box)({
  display: 'block',
  // padding: ''
  width: '33.33%',
});
export const TotalOwnersWrap = styled(Box)(({ theme }) => ({
  ...theme.typography.body4,
  display: 'flex',
  alignItems: 'center',
}));

export const CollectionDetailAddressSmallTitle = styled(Typography)(
  ({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '1.71',
    color: theme.palette.text.primary,
    marginBottom: '1rem',
  }),
);

export const CollectionDetailAddressBox = styled(Box)({
  borderRadius: '18px',
  boxShadow: `2px 2px 2px 0 rgba(0, 0, 0, 0.1), -2px 0 2px 0 rgba(0, 0, 0, 0.1)`,
  border: 'solid 1px rgba(207, 219, 213, 0.6)',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});

export const CollectionDetailAddressBoxAvatar = styled(Avatar)({
  width: '32px',
  height: '32px',
});

export const CollectionDetailAddressBoxText = styled(Typography)({
  margin: '4px 0 4px 4px',
  'font-size': '14px',
});

export const CollectionDetailSNFTTableContainer = styled(Box)(({ theme }) =>({
  // margin: '4rem 4rem',
  padding: '1rem 4rem',
  // fontSize: '14px !important',
  border: `1px solid ${theme.palette.background.inverse}`,
  borderRadius: '4px',
  width: '95%',
  margin: '0 auto',
  maxHeight: '400px', overflowY: 'scroll'
}));

export const CollectionDetailTableCell = styled(TableCell)(({ theme }) => ({
  ...theme.typography.body4,
  fontSize: '16px !important',
  textTransform: 'capitalize',
  backgroundColor: theme.palette.background.default,
}));

export const CollectionDetailTableCellData = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gridGap: '1rem',
  gap: '1rem',
});

export const CollectionDetailBottomCarouselContainer = styled(Box)({
  padding: '4rem',
  'margin-top': '4rem',
});

export const CollectionDetailItemActivityAddressContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  cursor: 'pointer',
  width: 'fit-content',
});

export const CollectionDetailsButton = styled(Button)(
  ({ theme, darkButton }) => ({
    margin: '0 6px 0 0',
    color: '#171725',
    fontSize: '12px',
    padding: '9px 23.5px 9px 22.5px',
    backgroundColor: darkButton ? '#d1d1d4' : theme.palette.white.main,
    border: 'solid 1px rgba(207, 219, 213, 0.6)',
    fontWeight: 400,
    borderRadius: '10px',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(207, 219, 213, 0.6)',
    },
  }),
);

export const CollectionDetailsActivity = styled(Box)({
  width: '50%',
  margin: '0 auto',
});

export const RowContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.background.inverse}`,
  margin: '1rem 0',
  color: theme.palette.background.inverse,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
}));

export const RowContainerData = styled(Typography)(({ theme }) => ({
  color: theme.palette.background.inverse,
  padding: '2rem',
  display: 'block',
  fontSize: 20,
}));

export const TopBarContainer = styled(Box)({
  padding: "0 2.5rem", 
  width: '50%',
});
