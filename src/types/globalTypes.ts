interface hexColorPickerProps {
  headerText: string,
  currentHexColor: string,
  changeHexColorSelection: (newColor: string) => void,
};

export type {
  hexColorPickerProps,
};