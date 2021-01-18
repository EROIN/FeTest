import _ from 'lodash';
import config from '../config';
import endpoints from './api-endpoint-dictionary';
import { agent as superagent} from 'superagent';

export function callMockApi (payload) {
  return new Promise((resolve) => {
    return resolve({body: payload});
  });
}

export async function callApi (url, customOptions) {
  let _reject;
  const options = _.assign({}, {
    query: {},
    method: 'GET',
    data: {},
    timeout: config.default.timeout.query,
    additionalHeaders: {}
  }, customOptions);

  const headers = Object.assign({}, {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json',
  }, options.additionalHeaders);

  let _request = superagent()[options.method.toLowerCase()](url).query(options.query);

  const promise = new Promise((resolve, reject) => {
    _reject = reject;

    if (options.additionalHeaders['Content-Type'] === 'multipart/form-data') {
      _request = _request.field(options.formData);
    } else {
      _request = _request.send(options.data);
    }

    _request = _request
      .set(headers)
      .timeout(options.timeout)
      .end((error, res) => {
        // eslint-disable-next-line no-console
        console.log(error, res);
        if (error) {
          // This is where we handle universal HTTP errors across all requests.
          // NOT business logic for individual calls.
          if (error.status === 504) {
            return reject({text: JSON.stringify({error: 'timeout'})});
          }
          // If our error is a 401 (unauthorised), redirect the user to the login page.
          if (error.status === 401) {
            // The sessionExpired flag signals the logout interceptor to show the session expired popup
            return reject(JSON.parse(res.text || '{}'));
          }
          return reject(res || error);
        }

        const response = JSON.parse(res.text || '{}');
        response.authorization = res.header.authorization;
        resolve(response);
      });
  });

  promise.abort = function abort () {
    // We have two concerns on abort:
    //   * to actually end the network call
    //   * to reject the promise, which has been consumed by the calling site
    _request.abort();
    _reject();
  };

  return promise;
}

export function getEndpoint (endpoint, isLocal) {
  const prefix = isLocal ? '' : config.default.api.host;
  return prefix + endpoints[isLocal ? 'local' : 'remote'][endpoint];
}
