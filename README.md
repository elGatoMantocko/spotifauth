# Spotifauth

Simple Spotify authentication wrapper.

Wraps the spotify `/api/token` endpoint with features for `login` and `refresh`.

## Login

Acquire an access and refresh with a `authorization_code` grant type.

The following must be provided.

  - code provided by the `/authorize` endpoint
  - redirect uri passed to the `/authorize` endpoint
  - application `client_id`
  - application `client_secret`

## Refresh

Acquire an access token with a `refresh_token` grant type.

The following must be provided.

  - `refresh_token` received when requesting an `access_token` with `authorization_code` grant type
  - application `client_id`
  - application `client_secret`

## Contribution

email me
