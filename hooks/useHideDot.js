import { useEffect, useRef } from 'react';

/**
 * Hook that detects string wrap, and hides the dot if it does.
 */
export const useHideDot = (data) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && data && data.length > 0) {
      let lastTop = null;
      const children = Array.from(containerRef.current.children);

      children.forEach((child, index) => {
        // Assuming each 'child' is a 'Box' containing 'RoleText' and 'DotWrap'
        const roleText = child.firstChild; // Get the 'RoleText' component
        if (roleText) {
          const top = roleText.getBoundingClientRect().top;
          if (lastTop !== null && top > lastTop) {
            // If the 'RoleText' wrapped, hide the previous 'DotWrap'
            const prevChild = children[index - 1];
            const dotWrap = prevChild && prevChild.lastChild; // Get the 'DotWrap' component
            if (dotWrap) {
              dotWrap.style.display = 'none';
            }
          }
          lastTop = top;
        }
      });
    }
  }, [data]);

  return { containerRef };
};
