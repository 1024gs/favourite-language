/*
 * Todo: Fetch has not implemented Timeout. We will need to implement it.
 */

const responseInterceptor = (res) => {
  if (!res.ok) {
    return res.json().then((err) => {
      throw err;
    });
  }
  return res.json();
};

const http = (resource, config) =>
  fetch(resource, config).then(responseInterceptor);

export default http;
