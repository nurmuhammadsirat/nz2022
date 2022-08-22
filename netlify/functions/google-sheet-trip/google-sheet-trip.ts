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

const sheetMetaData = {
  spreadsheetId: '1s6PXdY6Qw4sEHBfTZH_xdXcolmzjnrbVAFhqozP6zmw',
  accomodationRange: 'Accomodation!A1:L13',
  vehicleRange: 'Vehicle!A1:N4',
  flightRange: 'Flight!A1:K5',
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
  const [accomodationRows, vehicleRows, flightRows] = await Promise.all([
    (
      await sheets.spreadsheets.values.get({
        spreadsheetId: sheetMetaData.spreadsheetId,
        range: sheetMetaData.accomodationRange,
      })
    ).data.values,
    (
      await sheets.spreadsheets.values.get({
        spreadsheetId: sheetMetaData.spreadsheetId,
        range: sheetMetaData.vehicleRange,
      })
    ).data.values,
    (
      await sheets.spreadsheets.values.get({
        spreadsheetId: sheetMetaData.spreadsheetId,
        range: sheetMetaData.flightRange,
      })
    ).data.values,
  ]);

  const accomodationHeaders = accomodationRows?.shift()?.map(header => camelize(header));
  const vehicleHeaders = vehicleRows?.shift()?.map(header => camelize(header));
  const flightHeaders = flightRows?.shift()?.map(header => camelize(header));

  const accomodations = accomodationRows?.map(row => {
    return accomodationHeaders?.reduce(toObject(row), {});
  });

  const vehicles = vehicleRows?.map(row => {
    return vehicleHeaders?.reduce(toObject(row), {});
  });

  const flights = flightRows?.map(row => {
    return flightHeaders?.reduce(toObject(row), {});
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ accomodations, vehicles, flights }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
