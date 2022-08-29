import { useEffect, useMemo, useState } from 'react';
import { getAccessKey } from '../utils';

const useIsAuthorized = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const myHeaders = new Headers();
  myHeaders.append('Accept', 'image/jpeg');

  const headers = useMemo(() => {
    const myHeaders = new Headers();
    const accessKey = getAccessKey();
    myHeaders.append('x-access', accessKey);

    return myHeaders;
  }, []);

  useEffect(() => {
    fetch('/.netlify/functions/access', { headers })
      .then(resp => resp.json())
      .then(data => setIsAuthorized(data.isAllowed));
  }, [headers]);

  return isAuthorized;
};

export default useIsAuthorized;
