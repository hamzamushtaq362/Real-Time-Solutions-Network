import { Box, styled } from '@mui/material';

const ImageIconElementStyled = styled('img')(
  ({
    width,
    height,
    size,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    alignSelf,
    objectFit,
    position,
    onClick,
    textAlign,
    borderRadius,
    opacity,
    top,
    left
  }) => ({
    width: size ? size : width ? width : '20px',
    height: size ? size : height ? height : '20px',
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    alignSelf: alignSelf ? alignSelf : null,
    objectFit: objectFit ? objectFit : 'block',
    position,
    onClick,
    textAlign,
    borderRadius,
    opacity: opacity ? opacity : 1,
    top,
    left
  }),
);

export const ImageIconElement = ({ src, ...props }) => {
  return <ImageIconElementStyled {...props} src={src?.src || src} />;
};

export const CoverImageEmpty = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  border: `1.5px dashed ${theme.palette.borderLight}`,
  cursor: 'pointer',
  height: '100%',
  alignItems: 'center'
}))