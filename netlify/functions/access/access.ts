import { Handler } from '@netlify/functions';

const compareCodes = (accessCode: string | undefined, userCode: string | undefined): boolean => {
  if (!accessCode) {
    // eslint-disable-next-line no-console
    console.log('ACCESS_CODE env var is undefined.');
    return false;
  }

  return accessCode === userCode;
};

export const handler: Handler = async (event, _context) => {
  const accessCode = process.env.ACCESS_CODE;
  const userCode = event.headers['x-access'];

  return {
    statusCode: 200,
    body: JSON.stringify({ isAllowed: compareCodes(accessCode, userCode) }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
