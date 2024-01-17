interface userQuery {
  user: {
    company: string,
    email: string,
    first_name: string,
    job_title: string,
    last_name: string,
    _id: string,
  }
}

interface hexColorPickerProps {
  headerText: string,
  currentHexColor: string,
  changeHexColorSelection: (newColor: string) => void,
};

export type {
  userQuery,
  hexColorPickerProps,
};