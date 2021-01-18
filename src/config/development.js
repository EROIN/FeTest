import base from './base';

const config = {
  ...base,
  api: {
    host: 'http://localhost:8080/', // localhost
  },
  debug: {
    enableReduxDevTools: true,
    enableReduxLogger: true
  }
};

export default config;
