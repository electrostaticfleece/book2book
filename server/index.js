import express from 'express';
import webpack from 'webpack';
import { connect, controllers } from './db';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';

const App = require('../public/assets/server');
const env = process.env.NODE_ENV;

const app = express();

connect();

passportConfig();


/* 
 * If we are in a development enviornment pass dev file to 
 * webpack for dev-client configuration, apply middleware and
 * hot module reloading. 
 */

if(env === 'development') {
  const webpackDevConfig = require('../webpack/webpack.config.dev-client');
  const compiler = webpack(webpackDevConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Bootstrap application settings
 */

expressConfig(app);


 /*
 * Note: Some routes have passport and database model dependencies
 */

routesConfig(app);

/*
 * Redirects all routes to server-side rendering located on the
 * app directory. App is a function that requires store data and url
 * to initialize and return the React-rendered html string.
 */

app.get('*', App.default);

app.listen(app.get('port'));