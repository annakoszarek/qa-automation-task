import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '1m',
};

const API_KEY = "reqres_049cb211d12c43e69373434998024ec2";
const status200 = new Counter('status_200');
const status400 = new Counter('status_400');
const status401 = new Counter('status_401');
const status403 = new Counter('status_403');
const status404 = new Counter('status_404');
const status429 = new Counter('status_429');
const status500 = new Counter('status_500');
const statusOther = new Counter('status_other');

export default function () {

  const res = http.get('https://reqres.in/api/users?page=1', {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  switch (res.status) {
    case 200:
      status200.add(1);
      break;
    case 400:
      status400.add(1);
      break;
    case 401:
      status401.add(1);
      break;
    case 403:
      status403.add(1);
      break;
    case 404:
      status404.add(1);
      break;
    case 429:
      status429.add(1);
      break;
    case 500:
      status500.add(1);
      break;
    default:
      statusOther.add(1);
      break;
  }

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}