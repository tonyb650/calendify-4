export const checkCronAuthorization = (request: Request): boolean => {
  const authHeader = request.headers.get('authorization');

  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
};