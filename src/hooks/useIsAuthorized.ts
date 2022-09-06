import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { AccessResponse } from '../types';
import { BASE_NETLIFY_PATH, getAccessCode } from '../utils/index';

const useIsAuthorized = () => {
  return useQuery<boolean>(['useIsAuthorized'], async () => {
    const accessCode = getAccessCode();
    const headers = {
      'x-access': accessCode,
    };
    const resp: AxiosResponse<AccessResponse> = await axios.get(`${BASE_NETLIFY_PATH}/access`, { headers });
    return resp.data.isAllowed;
  });
};

export default useIsAuthorized;
