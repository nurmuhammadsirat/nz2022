import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GoogleSheetTripData } from '../types/GoogleSheetTrip.type';

export default (opts = {}) => {
  return useQuery<GoogleSheetTripData>(
    ['useGoogleSheetTrip'],
    async () => {
      const resp = await axios.get('/.netlify/functions/google-sheet-trip');
      return resp.data;
    },
    {
      ...opts,
    },
  );
};
