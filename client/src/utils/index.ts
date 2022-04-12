export const getAPIUrl = () => {
  const url = process.env.REACT_APP_API_URL;
  if (!url) throw 'API URL not defined';

  return url;
};
