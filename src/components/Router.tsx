import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useIsAuthorized from '../hooks/useIsAuthorized';
import { LandingPage } from './LandingPage';
import { UnauthorizedPage } from './UnauthorizedPage';
import { Spinner } from './common';

const Router = () => {
  const { data: isAuthorized, isLoading: isCheckingAuthorization } = useIsAuthorized();

  if (isCheckingAuthorization) {
    return <Spinner />;
  }

  if (!isAuthorized) {
    return <UnauthorizedPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
