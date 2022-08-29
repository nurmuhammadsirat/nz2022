import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, _context) => {
  const accessCode = process.env.ACCESS_CODE!;
  const userCode = event.headers['x-access'];

  return {
    statusCode: 200,
    body: JSON.stringify({ isAllowed: accessCode === userCode }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
