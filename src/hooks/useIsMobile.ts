import { useEffect, useState } from 'react';

const MAXMOBILEWIDTH = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MAXMOBILEWIDTH);

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= MAXMOBILEWIDTH);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
