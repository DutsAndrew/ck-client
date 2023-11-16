import React, { useState, useEffect } from "react";
import arrowUpSvg from '../assets/arrow-up.svg';
// has global styles as this will be used on every page and mounts from App.tsx

const ScrollToTopButton = (): JSX.Element => {

  const [scrollStatus, setScrollStatus] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollStatus);
    return () => window.removeEventListener('scroll', handleScrollStatus);
  }, []);

  const handleScrollStatus = () => {
    const topOfPage = window.scrollY;
    if (topOfPage > 500) {
      setScrollStatus(true);
    } else {
      setScrollStatus(false);
    };
  };

  const handleScrollToTop = () => {
    window.scrollTo(0, document.body.scrollHeight - document.body.scrollHeight);
  };

  return (
    <img
      src={arrowUpSvg}
      className={scrollStatus ? 'scroll-to-top-svg-active' : 'scroll-to-top-svg-inactive'}
      alt="arrow up"
      onClick={() => handleScrollToTop()}>
    </img>
  );
};

export default ScrollToTopButton;