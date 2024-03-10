import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
  CarouselArrowLeft,
  CarouselArrowRight,
  CarouselArrowsContainer,
  SliderContainer,
} from './elements';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Carousel = ({ settings, children }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(children.length);
  const [showArrows, setShowArrows] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    setTotalSlides(children.length);
  }, [children]);
  const numberOfFullyVisibleTiles = () => {
    const carouselWidth = document.documentElement.clientWidth; // Assuming the carousel takes the full width
    const tileWidth = 400; // Assuming each tile is 400px wide
    return Math.floor(carouselWidth / tileWidth);
  };

  useEffect(() => {
    setAtStart(currentSlide === 0);
    const visibleTiles = numberOfFullyVisibleTiles();
    setAtEnd(currentSlide + visibleTiles >= totalSlides || isEmptyTileVisible());
  }, [currentSlide, totalSlides]);

  const getArrowsStatus = () => {
    return document.documentElement.clientWidth < children.length * 400;
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
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

  const isEmptyTileVisible = () => {
    // Assuming slidesToShow is part of your settings
    const slidesToShow = settings.slidesToShow || 1;

    // Get the range of visible tiles
    const visibleTiles = childrenArray.slice(currentSlide, currentSlide + slidesToShow);

    // Check if any of the visible tiles is empty
    return visibleTiles.some(tile => tile === null || tile === undefined);
  };


  return (
    <SliderContainer
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {showArrows && getArrowsStatus() && renderArrows()}
      <Slider
        {...settings}
        ref={sliderRef}
        afterChange={setCurrentSlide}
        infinite={false}
      >
        {children}
      </Slider>
    </SliderContainer>
  );
};

export default Carousel;
