import { ReactNode } from 'react';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  //TODO: check if the user is authenticated before rendering the children
  return <>{children}</>;
};

export default RootLayout;
