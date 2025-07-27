# @sudo-elia/api-trenitalia

A TypeScript/JavaScript API client for Trenitalia.

## Features

- Login to Trenitalia services
- Retrieve user tickets information
- RxJS and Fetch API support

## Requirements

- Node.js >= 16
- TypeScript >= 5 (for TypeScript projects)

## Installation

```bash
npm install @sudo-elia/api-trenitalia
```

## Usage

### RxJS (Observable) Example

```typescript
import { TrenitaliaAPI } from '@sudo-elia/api-trenitalia';

const api = new TrenitaliaAPI();
api.login('username', 'password').subscribe(tokens => {
  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);
});
```

### Fetch (Promise) Example

```typescript
import { TrenitaliaAPI } from '@sudo-elia/api-trenitalia';

const api = new TrenitaliaAPI();
api.loginWithFetch('username', 'password').then(tokens => {
  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);
});
```

## API

### `TrenitaliaAPI`

#### Methods

- **login(userName: string, password: string, company?: string): Observable<{ access_token: string; refresh_token: string }>**
  - Logs in using RxJS Observable. Emits access and refresh tokens.

- **loginWithFetch(userName: string, password: string, company?: string): Promise<{ access_token: string; refresh_token: string }>**
  - Logs in using Fetch API. Returns a Promise with access and refresh tokens.

- **getAccessToken(): string | null**
  - Returns the current access token.

- **getRefreshToken(): string | null**
  - Returns the current refresh token.

- **getUserTicketsInformation(): Promise<any>**
  - Retrieves the user's ticket information. Requires a valid access token.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

ISC

## Author

[sudo-elia](https://github.com/sudo-elia)
