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
  firstName: string,
  lastName: string,
  password: string,
  jobTitle?: string,
  company?: string,
}

export type {
  AuthStatus,
  NavBarProps,
  HeaderProps,
  signUpData,
};