import { Handler } from '@netlify/functions'

export const handler: Handler = async (_event, _context) => {
  const name = process.env.WELCOMENAME || 'stranger';

  return {
    statusCode: 200,
    body: JSON.stringify({
      name,
    }),
  }
}
