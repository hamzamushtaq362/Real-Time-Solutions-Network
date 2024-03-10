import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
  CarouselArrowLeft,
  CarouselArrowRight,
  CarouselArrowsContainer,
  SliderContainer,
} from './elements';
import { SmallSpinner } from 'components';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, useTheme } from '@mui/material';
import { MuiModal } from 'components/Dialog/MuiModal/MuiModal';
import { CollabDetailsImageFullRes } from 'components/CollabDetails/CollabDetailsComponents/elements';
import { FlexBox } from 'components/common/elements';

const CarouselWithThumbnails = ({ settings, images, children, ...rest }) => {
  const sliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [thumbnailSlide, setThumbnailSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(children.length);
  const [showArrows, setShowArrows] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    setTotalSlides(children.length);
  }, [children]);

  useEffect(() => {
    setAtStart(currentSlide === 0);
    setAtEnd(currentSlide === totalSlides - 1);
  }, [currentSlide, totalSlides]);

  const getArrowsStatus = () => {
    return document.documentElement.clientWidth < children.length * 700;
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handleThumbnailClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  const renderArrows = () => {
    return (
      <CarouselArrowsContainer>
        {!atStart && (
          <CarouselArrowLeft onClick={handlePrev}>
            <ChevronLeft />
          </CarouselArrowLeft>
        )}
        {!atEnd && (
          <CarouselArrowRight onClick={handleNext}>
            <ChevronRight />
          </CarouselArrowRight>
        )}
      </CarouselArrowsContainer>
    );
  };

  const toggleModal = () => {
    // If the modal is about to open, start loading
    if (!open) {
      setLoading(true);
    }
    setOpen(!open);
  };
  useEffect(() => {
    const img = new Image();
    img.src = images[currentSlide];

    if (img.complete) {
      setLoading(false);
    } else {
      img.onload = () => {
        setLoading(false);
      };
    }
  }, [images, currentSlide]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Box {...rest}>
      <SliderContainer
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {showArrows && getArrowsStatus() && renderArrows()}
        <Slider
          {...settings}
          ref={sliderRef}
          asNavFor={thumbnailSliderRef.current}
          afterChange={(slideIndex) => {
            setCurrentSlide(slideIndex);
          }}
          beforeChange={(oldIndex, newIndex) => {
            setThumbnailSlide(newIndex);
          }}
          infinite={false}
        >
          {children.map((child, index) => (
            <Box
              key={index}
              onClick={index === currentSlide ? toggleModal : null}
            >
              {child}
            </Box>
          ))}
        </Slider>
      </SliderContainer>
      <Box
        sx={{
          display: children.length > 7 ? 'block' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Slider
          {...settings}
          ref={thumbnailSliderRef}
          asNavFor={sliderRef.current}
          slidesToShow={Math.min(5, children.length)}
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={false}
          centerMode={false}
          className="thumbnail-slider"
        >
          {children.map((child, index) => {
            const isActive = index === thumbnailSlide;
            return (
              <Box
                key={index}
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  mx: 0.5,
                }}
              >
                {React.cloneElement(child, {
                  style: {
                    width: isActive ? 132 : 130,
                    height: isActive ? 132 : 130,
                    border: isActive
                      ? `2px solid ${theme.palette.text.primary}`
                      : 'none',
                    transition: 'all 50ms',
                    padding: isActive ? 0 : 4,
                    marginRight: isActive ? 16 : 0,
                  },
                })}
              </Box>
            );
          })}
        </Slider>
      </Box>
      <MuiModal open={open} handleModal={toggleModal}>
        {loading && (
          <FlexBox justifyContent="center" width={500} height="80vh">
            <SmallSpinner inverse />
          </FlexBox>
        )}
        <CollabDetailsImageFullRes
          loading={loading}
          src={images[currentSlide]}
          onLoad={handleImageLoad}
        />
      </MuiModal>
    </Box>
  );
};

export default CarouselWithThumbnails;
