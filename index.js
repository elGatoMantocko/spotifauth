const {request} = require('https');
const {stringify} = require('querystring');

module.exports = {
  /**
   * Really simple function that sends an appropriate POST body to the
   * /api/token endpoint to get an access token.
   *  API docs: https://beta.developer.spotify.com/documentation/
   *  App dashboard: https://beta.developer.spotify.com/dashboard/applications
   * @param {String} code Code provided by the /authorize endpoint
   * @param {String} redirectUri redirect uri for the application (must match redirect uri sent to /authorize endpoint)
   * @param {String} clientId your spotify app client id
   * @param {String} clientSecret your spotify app secret
   * @return {Promise} Resolves to the value returned from /api/token. Rejects with any error.
   */
  login: function(code, redirectUri, clientId, clientSecret) {
    return new Promise(function(resolve, reject) {
      const authData = stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      });

      const opts = {
        hostname: 'accounts.spotify.com',
        port: 443,
        path: '/api/token',
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + new Buffer(`${clientId}:${clientSecret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(authData),
        },
      };

      const req = request(opts, function(res) {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (err) => reject(err));
      req.write(authData);
      req.end();
    });
  },

  /**
   * Really simple function that sends an appropriate POST body to the
   * /api/token endpoint to get a new access token with a refresh token.
   *  API docs: https://beta.developer.spotify.com/documentation/
   *  App dashboard: https://beta.developer.spotify.com/dashboard/applications
   * @param {String} refreshToken refresh_token provided with the login request
   * @param {String} clientId your spotify app client id
   * @param {String} clientSecret your spotify app secret
   * @return {Promise} Resolves to the value returned from the /api/token endpoint. Rejects any error.
   */
  refresh: function(refreshToken, clientId, clientSecret) {
    return new Promise(function(resolve, reject) {
      const authData = stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      const opts = {
        hostname: 'accounts.spotify.com',
        port: 443,
        path: '/api/token',
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + new Buffer(`${clientId}:${clientSecret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(authData),
        },
      };

      const req = request(opts, function(res) {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (err) => reject(err));
      req.write(authData);
      req.end();
    });
  },
};
