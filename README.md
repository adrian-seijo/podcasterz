# PodcasterZ

[![Netlify Status](https://api.netlify.com/api/v1/badges/e6f59394-03f8-47eb-8626-f56c2a54c892/deploy-status)](https://app.netlify.com/sites/podcasterz/deploys)

## Live site

The app is currently live, with the latest changes in master, in [https://podcasterz.netlify.com/](https://podcasterz.netlify.com/).


## Run local instance

In order to run the local the project locally:

```js
$ npm ci
$ npm start
```

Then the app will be accesible in `http://localhost:8888/`.

**Please note that the service worker will be disabled in the local version fo the app in order to facilitate the development** In order to test the request caching please check the live site or change the `app/lib/bootstrap.js` file to not ignore localhost.
