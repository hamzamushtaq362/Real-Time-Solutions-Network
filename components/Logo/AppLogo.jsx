import { useIsMobileView } from '~/utils';
import { LogoContainer, LogoTextLink } from './elements';
import { useEffect, useRef } from 'react';
import { setRtsnWidth } from '~/redux';
import { useDispatch } from 'react-redux';

export const AppLogo = ({ href, margin, color, dark }) => {
  const isMobileView = useIsMobileView();
  const divRef = useRef(null);
  const dispatch = useDispatch();

  const calculateTotalWidth = () => {
    if (divRef.current) {
      // Get the width of the div
      const divWidth = divRef.current.offsetWidth;

      // Get the margin of the div
      const computedStyle = window.getComputedStyle(divRef.current);
      const marginLeft = parseInt(computedStyle.marginLeft, 10);
      const marginRight = parseInt(computedStyle.marginRight, 10);

      // Calculate total width
      const totalWidth = divWidth + marginLeft + marginRight;

      // Update global state with the total width
      dispatch(setRtsnWidth(totalWidth));
    }
  };

  useEffect(() => {
    // Initial calculation
    calculateTotalWidth();

    // Add event listener for window resize
    window.addEventListener('resize', calculateTotalWidth);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', calculateTotalWidth);
    };
  }, []);

  return (
    <LogoContainer ref={divRef} isMobileView={isMobileView} margin={margin}>
      <LogoTextLink href={href ? href : '/dashboard'} color={color} dark={dark}>
        rtsn.
      </LogoTextLink>
    </LogoContainer>
  );
};
