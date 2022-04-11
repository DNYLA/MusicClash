export const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw 'JWT secret not defined';

  return secret;
};
