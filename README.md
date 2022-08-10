# New Zealand 2022

## Overview

Web app to visualize our itenary for our New Zealand trip! It uses React frontend in conjunction with [Netlify Functions](https://www.netlify.com/products/functions/) as the backend. The data store is in Google Sheets.

This is meant to be deployed in [Netlify](https://www.netlify.com).

## Data Constraints

- Dates should be in the form dd-MMM-yyyy. (Eg: 4-Mar-2022)

## Provision Google Sheet API

- Login to [Google Cloud Console](https://console.cloud.google.com) with the same account as the one for Google Sheets.
- Create a project (or use an existing project).
- On the sidebar, navigate to `APIs & Service` -> `Enabled APIs & Services`.
- Click on `+ ENABLE APIS AND SERVICES`.
- Search `google sheets` and click on `Google Sheets API`. Click on `ENABLE`.
- In `Google Sheets API` view, on the top right, click on `CREATE CREDENTIALS`.
- Select `Google Sheets API` in the dropdown and choose `Application data`. (Also no on using Compute Engine, etc) Click `NEXT`.
- Enter a name, service account ID and description. Take note of the email address under the service account ID input box.
- Click `CREATE AND CONTINUE`.
- Select an appropriate role. (I chose to give mine `Basic` -> `Editor`). Click `CONTINUE`.
- Click `DONE`.
- In `Google Sheets API` view, go to the CREDENTIALS tab. The created credentials should appear under `Service Accounts`. Click on the credential.
- In the credential view, go to `KEYS` tab.
- Click on `ADD KEY` -> `Create new key`.
- Select `JSON` and click `CREATE`.
- A json file will be downloaded to your computer. Open the json file.
- Take note of the `client_email` and `private_key`.
  - Notice that the `private_key` value contains `\n` characters. Do not be alarmed and copy the string wholesale.
- Get the base64 encoded value of the `private_key`.
  - Personally, I just use [https://www.base64encode.org](https://www.base64encode.org).
- Copy this encoded private key.

## Give Access To The Google Sheet

- Open the Google Sheet containing the trip data.
- At the top right, click on `SHARE`.
- In `Add people and groups` dialog, add the `client_email` and give it an appropriate role. (I gave mine `Editor`.) Click `SHARE`.

## Local Dev Setup

- Requirements: node 16.15.1, npm 8.11.0
- Checkout and run `npm install`.
- Copy `.env.example` to `.env`.
- Populate `.env` with correct values from Google.
  - Set the value of `GOOGLE_CLIENT_EMAIL` to `client_email` in the json file above.
  - Set the value of `ENCODED_GOOGLE_PRIVATE_KEY` to the base64 encoded value of `private_key` in the json file above.
- Install [Netlify CLI](https://docs.netlify.com/cli/get-started/).
- Run `netlify dev` in the project folder and navigate to `http://localhost:8888`.

## Continuous Deployment

Deployment is [automatically done](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git) when a push to master is made to this repository.

The app URL is [https://newzealand2022.nms.dev](https://newzealand2022.nms.dev).
