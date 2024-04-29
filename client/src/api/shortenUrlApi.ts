import AxiosInstance from './core';

export const shortenUrlApi = (longUrl: string) => {
  return new Promise<string>((resolve, reject) => {
    AxiosInstance.post('/shorten', { longUrl })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
