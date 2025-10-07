# Frontend Store

This is a React frontend for a small e-commerce/store application. It uses React, React Query for data fetching, and Axios for API requests. The project includes pages for browsing products, authentication (login/register), an admin panel, and a shopping cart.

---

## English

### Features
- Browse and search products
- Pagination and filters
- User login / Admin login
- Add items to cart
- Admin product management (add/edit/delete)
- Centralized loader component and inline button spinners

### Tech stack
- React 19
- react-router-dom v6
- @tanstack/react-query
- Axios
- CSS modules

### Prerequisites
- Node.js (>=14) and npm installed

### Install dependencies
Open PowerShell in the project root and run:

```powershell
npm install
```

### Run (development)

```powershell
npm start
```

Open http://localhost:3000 in your browser.

### Build (production)

```powershell
npm run build
```

### Tests

```powershell
npm test
```

### Environment / API URL
By default the app uses a production API URL inside the API client. If you need to point to a different backend, edit `src/api/client.js` and change the `API_URL` constant or replace it with an environment-driven value.

### Notes about API and authentication
- API wrapper: `src/api/client.js` — shared Axios client and `authHeader(token)` helper.
- API modules: `src/api/goods.js` and `src/api/admin.js` use the axios client.
- Token storage: after login, the token returned by the server is saved to `localStorage` under the key `token` (example in `src/components/LoginForm.jsx` and `src/components/AdminLogin.jsx`). The app then reads `localStorage.getItem('token')` and passes the token to API helpers.
- addToCart signature: `addToCart` accepts an object with `{ token, productId, quantity }` — many callers in the app call `mutation.mutate({ token, productId, quantity })` (see `src/components/CartAdd.jsx`). The API helper attaches `Authorization: Bearer <token>` via the axios client.

### Comments feature (new)
- Components:
	- `src/components/Comments.jsx` — displays comments for a product. It uses React Query (queryKey `['comments', productId]`) and calls `fetchComments(productId)`.
	- `src/components/AddComment.jsx` — form to post a new comment. It uses `postComment({ token, product, text })` and invalidates the comments query on success.
- API endpoints (used by the frontend):
	- GET `/comments/:productId` — returns a list of comments for a product (client wrapper: `fetchComments(productId)` in `src/api/comments.js`).
	- POST `/comments` — create a new comment (client wrapper: `postComment({ token, product, text })`). Requires Authorization header `Bearer <token>`.
- Permissions / behavior:
	- Viewing comments is public — no token required.
	- Posting a comment requires a valid token (user must be logged in). `AddComment` reads `token` from props and sends it to `postComment`.
	- After posting a comment, the `comments` query is invalidated so the UI refreshes.


### Debugging common issues
- Network / 403 on add-to-cart: open DevTools → Network. Check the request headers include `Authorization: Bearer <token>` and the request body is `{ productId, quantity }`.
- Check token in console: `localStorage.getItem('token')` should return a non-null string.
- If a module can't be resolved (e.g., `react-router-dom`), run `npm install react-router-dom@6 --save`.

### Development tips
- Use React Query Devtools (already included as a dependency) to inspect queries and mutations.
- Consider adding an axios interceptor in `src/api/client.js` to automatically attach the token from `localStorage` to all outgoing requests if you prefer not to pass the token manually.

---

## Polski

### Funkcje
- Przeglądanie i wyszukiwanie produktów
- Paginacja i filtry
- Logowanie użytkownika / logowanie administratora
- Dodawanie przedmiotów do koszyka
- Zarządzanie produktami (dodawanie/edycja/usuwanie) dla admina
- Centralny komponent loader oraz spinner wewnątrz przycisków

### Stos technologiczny
- React 19
- react-router-dom v6
- @tanstack/react-query
- Axios
- CSS modules

### Wymagania
- Node.js (>=14) i npm

### Instalacja zależności
Otwórz PowerShell w katalogu projektu i uruchom:

```powershell
npm install
```

### Uruchomienie (development)

```powershell
npm start
```

Strona będzie dostępna pod http://localhost:3000.

### Budowanie (production)

```powershell
npm run build
```

### Testy

```powershell
npm test
```

### Środowisko / URL API
Domyślnie aplikacja używa URL-a produkcyjnego w `src/api/client.js`. Jeżeli chcesz połączyć się z innym backendem, zmień wartość `API_URL` w `src/api/client.js` lub podmień ją na wartość z pliku `.env`.

### Informacje o API i autoryzacji
- Wspólny klient axios: `src/api/client.js` oraz funkcja pomocnicza `authHeader(token)`.
- Moduły API: `src/api/goods.js` i `src/api/admin.js` korzystają z klienta axios.
- Przechowywanie tokena: po zalogowaniu token jest zapisywany w `localStorage` pod kluczem `token` (zobacz `src/components/LoginForm.jsx` i `src/components/AdminLogin.jsx`). Aplikacja odczytuje token przez `localStorage.getItem('token')` i przekazuje go do funkcji API.
- addToCart: przyjmuje obiekt `{ token, productId, quantity }`. Wywołania mutacji w kodzie powinny używać takiego kształtu (np. `mutation.mutate({ token, productId, quantity })`). Klient axios dodaje nagłówek `Authorization: Bearer <token>`.

### Sekcja komentarzy (nowość)
- Komponenty:
	- `src/components/Comments.jsx` — wyświetla komentarze dla produktu (React Query, queryKey `['comments', productId]`, wywołuje `fetchComments(productId)`).
	- `src/components/AddComment.jsx` — formularz dodawania komentarza. Wywołuje `postComment({ token, product, text })` i po udanym dodaniu unieważnia cache komentarzy.
- Endpointy API:
	- GET `/comments/:productId` — zwraca komentarze dla produktu (wrapper: `fetchComments(productId)` w `src/api/comments.js`).
	- POST `/comments` — tworzy nowy komentarz (wrapper: `postComment({ token, product, text })`). Wymaga nagłówka Authorization `Bearer <token>`.
- Uprawnienia / zachowanie:
	- Oglądanie komentarzy jest publiczne — token nie jest wymagany.
	- Dodawanie komentarza wymaga tokenu (użytkownik musi być zalogowany). `AddComment` przyjmuje `token` w props i przesyła go w żądaniu.
	- Po dodaniu komentarza query `comments` jest unieważniany, co powoduje odświeżenie listy komentarzy.

### Debugowanie najczęstszych problemów
- 403 dla add-to-cart: w DevTools → Network sprawdź, czy nagłówek `Authorization: Bearer <token>` jest wysyłany i czy body żądania to `{ productId, quantity }`.
- Sprawdź token w konsoli: `localStorage.getItem('token')` — powinien zwrócić niepusty string.
- Jeżeli moduł nie jest odnajdywany (np. `react-router-dom`), uruchom `npm install react-router-dom@6 --save`.

### Wskazówki developerskie
- Użyj React Query Devtools do debugowania zapytań i mutacji.
- Możesz dodać interceptor axios w `src/api/client.js`, żeby automatycznie dołączać token z `localStorage` do wszystkich zapytań — wtedy nie trzeba będzie przekazywać tokena ręcznie.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
