import { ReactNode } from 'react';
import usePageTracking from '../hooks/usePageTracking';
import { Outlet } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Initialize Google Analytics
ReactGA.initialize('G-6C12JZ2GTJ');

const PageTracker = () => {
  const pageTracking = usePageTracking();

  return <Outlet />;
};

export default PageTracker;
