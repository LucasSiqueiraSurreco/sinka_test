// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const configuration = () => {
  return {
    environment: process.env.ENVIRONMENT,
    port: parseInt(process.env.PORT, 10) || 3000,
    API_NAME: process.env.API_NAME,
    API_VERSION: process.env.API_VERSION,
    API_URL: process.env.API_URL,
    DIR_USER: process.env.DIR_USER,
    CACHE_TIME: process.env.CACHE_TIME,
  };
};
