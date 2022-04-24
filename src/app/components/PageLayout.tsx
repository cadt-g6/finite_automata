import React from 'react';
import Header from './Header';

const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PageLayout;
