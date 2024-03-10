import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  IconButton,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

export const SelectImage = ({
  selectImageForBadgePreview,
  setSelectImageForBadgePreview,
  images,
}) => {
  const handleImageClick = (image) => {
    setSelectImageForBadgePreview(image.image);
  };

  return (
    <Grid container spacing={2}>
      {images.map((image, index) => (
        <Grid item xs={2.5} key={index}>
          <Card
            onClick={() => handleImageClick(image)}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              ...(selectImageForBadgePreview === image.image && {
                border: '4px solid #FFFFFF',
              }),
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image={image.image}
                alt={`Image ${index + 1}`}
              />
              {selectImageForBadgePreview === image.image && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    zIndex: 1,
                    color: 'white',
                  }}
                >
                  <CheckCircleOutline />
                </IconButton>
              )}
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
