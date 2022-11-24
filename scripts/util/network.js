import { getCookie } from './windows.js';

export const fetchWithAuth = async (link) => {
  const res = await fetch(link, {
    method: 'GET',
    headers: {
      Cookie: document.cookie,
      Authorization: 'Bearer ' + getCookie('xn_api_token'),
    },
  });
  return res.json();
};
