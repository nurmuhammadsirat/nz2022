import { Handler } from '@netlify/functions';

export const handler: Handler = async (_event, _context) => {
  const name = process.env.WELCOMENAME || 'stranger';

  const key = process.env.GOOGLE_PRIVATE_KEY!;
  const encodedkey = process.env.ENCODED_GOOGLE_PRIVATE_KEY!;
  const decodedkey = Buffer.from(process.env.ENCODED_GOOGLE_PRIVATE_KEY!, 'base64').toString('utf8');
  const splitdecodedkey = Buffer.from(process.env.ENCODED_GOOGLE_PRIVATE_KEY!, 'base64')
    .toString('utf8')
    .split('\\n')
    .join('\n');

  return {
    statusCode: 200,
    body: JSON.stringify({
      name,
      key,
      encodedkey,
      decodedkey,
      splitdecodedkey,
      keyAndDecodedKey: key === decodedkey,
      keyAndSplitDecodedKey: key === splitdecodedkey,
    }),
  };
};
