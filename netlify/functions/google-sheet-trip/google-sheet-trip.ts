import { Handler } from '@netlify/functions';
import { google } from 'googleapis';

const camelize = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

const toObject = (row: string[]) => (acc, elem, index) => ({ ...acc, [elem]: row[index] });

const googleSheet = {
  spreadsheetId: '1s6PXdY6Qw4sEHBfTZH_xdXcolmzjnrbVAFhqozP6zmw',
  ranges: [
    ['Accomodation', 'Accomodation!A1:L13'],
    ['Vehicle', 'Vehicle!A1:N4'],
    ['Flight', 'Flight!A1:K5'],
    ['Activity', 'Activity!A1:G5'],
  ],
};

const authProps = {
  email: process.env.GOOGLE_CLIENT_EMAIL!,
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
  key: Buffer.from(process.env.ENCODED_GOOGLE_PRIVATE_KEY!, 'base64').toString('utf8').split('\\n').join('\n'),
};

export const handler: Handler = async (_event, _context) => {
  const jwt = new google.auth.JWT(authProps);

  await jwt.authorize();
  google.options({ auth: jwt });
  const sheets = google.sheets('v4');
  const NZTripData = await Promise.all(
    googleSheet.ranges.map(
      async ([_sheetName, sheetRange]) =>
        (
          await sheets.spreadsheets.values.get({
            spreadsheetId: googleSheet.spreadsheetId,
            range: sheetRange,
          })
        ).data.values,
    ),
  );

  const [accomodations, vehicles, flights, activities] = NZTripData.map(rows => {
    const headers = rows?.shift()?.map(header => camelize(header));
    return rows?.map(row => {
      return headers?.reduce(toObject(row), {});
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ accomodations, vehicles, flights, activities }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
