import { stringify } from 'querystring';
import fetch from 'request';

import { generateRandomString } from '../utils/helpers';

import {
  CODE,
  AUTHORIZATION_CODE,
  INVALID_TOKEN,
  STATE_MISMATCH,
} from '../utils/constants';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  STATE_KEY,
  SCOPE,
  REDIRECT_TO_CALLBACK,
  REDIRECT_TO_WEB_APP,
} = process.env;

const login = (request, response) => {
  const state = generateRandomString(16);
  response.cookie(STATE_KEY, state);

  response.redirect(
    `https://accounts.spotify.com/authorize?${stringify({
      response_type: CODE,
      client_id: CLIENT_ID,
      scope: SCOPE,
      redirect_uri: REDIRECT_TO_CALLBACK,
      state,
    })}`
  );
};

const callback = (request, response) => {
  const code = request.query.code || null;
  const state = request.query.state || null;
  const storedState = request.cookies ? request.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    response.redirect(
      REDIRECT_TO_WEB_APP +
        stringify({
          error: STATE_MISMATCH,
        })
    );
  } else {
    response.clearCookie(STATE_KEY);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri: REDIRECT_TO_CALLBACK,
        grant_type: AUTHORIZATION_CODE,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      json: true,
    };

    fetch.post(authOptions, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        const accessToken = body.access_token;
        const refreshToken = body.refresh_token;

        response.redirect(
          REDIRECT_TO_WEB_APP +
            stringify({
              accessToken,
              refreshToken,
            })
        );
      } else {
        response.redirect(
          REDIRECT_TO_WEB_APP +
            stringify({
              error: INVALID_TOKEN,
            })
        );
      }
    });
  }
};

const endpoints = (application) => {
  application.get('/login', login);
  application.get('/callback', callback);
};

export default endpoints;
