import http from './http';
import _ from './_';

const TIMEOUT = 30000;

const DOMAIN = 'https://api.github.com';

const errorInterceptor = (err) => {
  if (err.xhrStatus === 'abort') {
    if (!err.config) {
      err.config = {timeout: TIMEOUT};
    }
    console.warn(`REQUEST CANCELED (config timeout: ${err.config.timeout}ms)`);
  }
  throw err;
};

const responseInterceptor = (res) => {
  return res;
};

const requestInterceptor = (config) => {
  const conf = _.mergeAll([{timeout: TIMEOUT}, config]);

  if (_.undef(conf.headers)) {
    conf.headers = {};
  }
  return conf;
};

const send = (path, config) => {
  return http(DOMAIN + path, requestInterceptor(config))
    .then(responseInterceptor)
    .catch(errorInterceptor);
};

const get = (path, config) =>
  send(path, _.mergeAll([{}, config, {method: 'GET'}]));

const post = (path, data, config) =>
  send(path, _.mergeAll([{}, config, {method: 'POST', body: data}]));

const put = (path, data, config) =>
  send(path, _.mergeAll([{}, config, {method: 'PUT', body: data}]));

const patch = (path, data, config) =>
  send(path, _.mergeAll([{}, config, {method: 'PATCH', body: data}]));

const del = (path, config) =>
  send(path, _.mergeAll([{}, config, {method: 'DELETE'}]));

export default send;

export {get, post, put, patch, del};
