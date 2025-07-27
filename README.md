# @sudo-elia/api-trenitalia

API client per Trenitalia.

## Installazione

```bash
npm install @sudo-elia/api-trenitalia
```

## Utilizzo

```typescript
import { TrenitaliaAPI } from '@sudo-elia/api-trenitalia';

const api = new TrenitaliaAPI();
api.login('username', 'password').subscribe(tokens => {
  console.log(tokens);
});
```
