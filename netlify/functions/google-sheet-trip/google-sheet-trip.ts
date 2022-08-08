import { Handler } from '@netlify/functions';
import { google } from 'googleapis';

const camelize = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

export const handler: Handler = async (_event, _context) => {
  const spreadsheetId = '1s6PXdY6Qw4sEHBfTZH_xdXcolmzjnrbVAFhqozP6zmw';
  const accomodationRange = 'Accomodation!A1:L13';
  const vehicleRange = 'Vehicle!A1:N4';

  const jwt = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL!,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
    key: process.env.GOOGLE_PRIVATE_KEY!,
  });

  await jwt.authorize();
  google.options({ auth: jwt });
  const sheets = google.sheets('v4');
  const [accomodationRows, vehicleRows] = await Promise.all([
    (
      await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: accomodationRange,
      })
    ).data.values,
    (
      await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: vehicleRange,
      })
    ).data.values,
  ]);

  const accomodationHeaders = accomodationRows!.shift()?.map(header => camelize(header));
  const vehicleHeaders = vehicleRows!.shift()?.map(header => camelize(header));

  const accomodations = accomodationRows!.map(row => {
    return accomodationHeaders?.reduce((acc, elem, index) => ({ ...acc, [elem]: row[index] }), {});
  });

  const vehicles = vehicleRows!.map(row => {
    return vehicleHeaders?.reduce((acc, elem, index) => ({ ...acc, [elem]: row[index] }), {});
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ accomodations, vehicles }),
  };
};
