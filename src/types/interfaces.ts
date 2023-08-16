interface AuthStatus {
  status: boolean;
};

interface NavBarProps {
  auth: boolean,
};

interface HeaderProps {
  auth: boolean,
};

interface signUpData {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  job_title: string,
  company: string,
}

interface signUpApiResponseObject {
  detail?: string;
  success?: boolean,
  user?: {
    email: string,
    first_name: string,
    last_name: string,
    job_title: string,
    company: string,
  },
};

export type {
  AuthStatus,
  NavBarProps,
  HeaderProps,
  signUpData,
  signUpApiResponseObject,
};