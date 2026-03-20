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

## Usage Example

```typescript
import { trenitaliaAPI } from '@sudo-elia/api-trenitalia';

const apiFetch = trenitaliaAPI('fetch');
apiFetch.login({ userName: 'user', password: 'pwd' })
  .then(data => console.log('Login with Fetch:', data))
  .catch(error => console.error(error));


const apiRxjs = trenitaliaAPI('rxjs');
apiRxjs.login({ userName: 'user', password: 'pwd' })
.pipe(
  takeUntil(#destroy$),
  catchError(err => {
    console.error(error);
    return of(error);
  })
.subscribe(data => console.log('Login with RxJS:', data));
```

## API

### `TrenitaliaAPI`

### Methods

#### Login
  - ```typescript
    login(userName: string, password: string, company?: string): Observable<AccessTokenResponse>
    
    loginWithFetch(userName: string, password: string, company?: string): Promise<AccessTokenResponse>
    ```
#### Get User Tickets Information
  - ```typescript
    getUserTicketsInformation(bodyRequest: QuerySolutions): Promise<SolutionsResponse>
    getUserTicketsInformation(bodyRequest: QuerySolutions): Observable<SolutionsResponse>
### Access Tokens
  - ```typescript
    getAccessToken(): string | null
    ```
### Refresh Tokens
  - ```typescript
    getRefreshToken(): string | null
    ```

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

ISC

## Author

[sudo-elia](https://github.com/sudo-elia)
