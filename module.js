const {request} = require('https');
const {stringify} = require('querystring');

module.exports = {
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
