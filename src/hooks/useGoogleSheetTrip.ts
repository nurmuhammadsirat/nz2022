import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { GoogleSheetTripResponse } from '../types';
import { BASE_NETLIFY_PATH } from '../utils/index';

export default (opts = {}) => {
  return useQuery<GoogleSheetTripResponse>(
    ['useGoogleSheetTrip'],
    async () => {
      const resp: AxiosResponse<GoogleSheetTripResponse> = await axios.get(`${BASE_NETLIFY_PATH}/google-sheet-trip`);
      return resp.data;
    },
    {
      ...opts,
    },
  );
};
