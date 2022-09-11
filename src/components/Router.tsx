import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useIsAuthorized from '../hooks/useIsAuthorized';
import { LandingPage } from './LandingPage';
import { SpinnerPage } from './SpinnerPage';
import { UnauthorizedPage } from './UnauthorizedPage';

const Router = () => {
  const { data: isAuthorized, isLoading: isCheckingAuthorization } = useIsAuthorized();

  if (isCheckingAuthorization) {
    return <SpinnerPage />;
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
