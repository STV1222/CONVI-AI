export const API_BASE_URL = 'http://localhost:3001/api';

export const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${API_BASE_URL}${url}`, options);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};
