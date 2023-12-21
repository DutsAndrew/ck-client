import React, { FC } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import styles from '../styles/hexColorPicker.module.css';
import { hexColorPickerProps } from "../types/globalTypes";

const HexColorPickerCustom:FC<hexColorPickerProps> = (props): JSX.Element => {

  // to use hexColorPickerCustom in a component you must have the following in the component you're importing to:
    // 1. Header text for what the color picker is for
    // 2. state to store the color and set it
    // 3. auxillary function to handle the state change
  // both parts 1, 2, and 3 need to be passed down from the parent component

  const {
    headerText,
    currentHexColor,
    changeHexColorSelection
  } = props;

  return (
    <div className={styles.hexColorMainContainer}>
      <h3 className={styles.hexColorHeaderText}>
        {headerText}
      </h3>
      <div className={styles.hexColorContainer}>
        <div className={styles.hexColorPickerContainer}>
          <HexColorPicker color={currentHexColor} onChange={changeHexColorSelection} />
          <HexColorInput color={currentHexColor} onChange={changeHexColorSelection} />
        </div>
        <div className={styles.hexColorPickerCurrentSelectionContainer}>
            <p className={styles.hexColorCurrentColorText}>
              <strong>Current Color:</strong>
            </p>
            <div style={{backgroundColor: `${currentHexColor}`}} className={styles.hexColorDisplayBox}>
              {/* Just a container to display the current color selection better */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HexColorPickerCustom;