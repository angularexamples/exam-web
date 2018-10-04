const _isDev = window.location.port.indexOf('4200') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const apiURI = 'http://localhost:1332/v1/' ;
const serverURI = 'http://localhost:1332/'

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI,
  AUTHOR: 'Anusha',
  SERVER_URL:serverURI
}