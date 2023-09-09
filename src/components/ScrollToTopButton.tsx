import React, { FC } from "react";
import { scrollToTopProps } from "../types/interfaces";
import arrowUpSvg from '../assets/arrow-up.svg';
// has global styles as this will be used on every page and mounts from App.tsx

const ScrollToTopButton:FC<scrollToTopProps> = (props): JSX.Element => {

  const { handleScrollToTop } = props;

  return (
    <img
      src={arrowUpSvg}
      className="scroll-to-top-svg"
      alt="arrow up"
      onClick={() => handleScrollToTop()}>
    </img>
  );
};

export default ScrollToTopButton;