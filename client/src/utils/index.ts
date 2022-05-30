import { error } from 'console';

export const getAPIUrl = () => {
  const url = process.env.REACT_APP_API_URL;
  if (!url) throw 'API URL not defined';

  return url;
};

export const getSocketUrl = () => {
  const url = process.env.REACT_APP_SOCKET_URL;
  if (!url) throw 'Socket URL not defined';

  return url;
};

export const getYoutubeThumbnail = (url: string) => {
  // Example URL: https://www.youtube.com/watch?v=CJOZc02VwJM

  const [websiteUrl, watchId] = url.split('watch?v=');
  // console.log(split1);

  if (!watchId) {
    return '';
  }

  return `https://img.youtube.com/vi/${watchId}/maxresdefault.jpg`;
};
