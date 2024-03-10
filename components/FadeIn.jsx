import React, { useEffect, useState } from 'react';

export default function FadeIn(props) {
  const { wrapperTag, childTag, childClassName, className, children, onComplete,  } = props;
  const [maxIsVisible, setMaxIsVisible] = useState(0);
  const transitionDuration = typeof props.transitionDuration === "number" ? props.transitionDuration : 400;
  const delay = typeof props.delay === "number" ? props.delay : 50;
  const WrapperTag = wrapperTag || "div";
  const ChildTag = childTag || "div";
  const visible = typeof props.visible === "undefined" ? true : props.visible;

  useEffect(() => {
    let count = React.Children.count(children);
    if (!visible) {
      // Animate all children out
      count = 0;
    }

    if (count === maxIsVisible) {
      // We're done updating maxVisible, notify when animation is done
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, transitionDuration);
      return () => clearTimeout(timeout);
    }

    // Move maxIsVisible toward count
    const increment = count > maxIsVisible ? 1 : -1;
    const timeout = setTimeout(() => {
      setMaxIsVisible(maxIsVisible + increment);
    }, delay);
    return () => clearTimeout(timeout);
  }, [
    React.Children.count(children),
    delay,
    maxIsVisible,
    visible,
    transitionDuration,
  ]);

  return (
    <WrapperTag className={className}>
      {React.Children.map(children, (child, i) => {
        return (
          <ChildTag
            className={childClassName}
            style={{
              transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
              transform: maxIsVisible > i ? "none" : "translateY(20px)",
              opacity: maxIsVisible > i ? 1 : 0,
            }}
          >
            {child}
          </ChildTag>
        );
      })}
    </WrapperTag>
  );
}