interface AuthStatus {
  status: boolean;
};

interface NavBarProps {
  auth: boolean,
};

interface HeaderProps {
  auth: boolean,
};

export type {
  AuthStatus,
  NavBarProps,
  HeaderProps,
};