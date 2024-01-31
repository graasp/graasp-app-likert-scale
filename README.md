<div style="margin-bottom: 20px; display:flex; justify-content: center; align-items: center ">
<img style="text-align: center" src="https://graasp.org/favicon.svg" width=100 >
</div>

# Graasp App: Likert scale

A basic app to create Likert scale items on Graasp.

<div style="gap:10px; display:flex; justify-content: center; align-items: center;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width=50 >
  <span>+</span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width=50 >
  <span>+</span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" width=50 >
  <span>=</span>
  <span>❤️</span>
</div>

## Installation

Run `yarn`.

## Running the app

Create a `.env.development` file with the following content:

```bash
VITE_PORT=3005
VITE_API_HOST=http://localhost:3000
VITE_ENABLE_MOCK_API=true
VITE_GRAASP_APP_KEY=45678-677889
VITE_VERSION=latest
```

Run `yarn start`.

## Running the Tests

Create a `.env.test` file with the following content:

```bash
VITE_PORT=3333
VITE_API_HOST=http://localhost:3000
VITE_ENABLE_MOCK_API=true
VITE_GRAASP_APP_KEY=45678-677889
VITE_VERSION=latest

# dont open browser
BROWSER=none
```
