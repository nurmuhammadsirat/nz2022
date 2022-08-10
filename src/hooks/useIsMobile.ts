import { useEffect, useState } from 'react';

const MINMOBILEWIDTH = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MINMOBILEWIDTH);

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= MINMOBILEWIDTH);
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
