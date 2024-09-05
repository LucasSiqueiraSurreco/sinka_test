import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => ({
  env: process.env.ENVIRONMENT,
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  isLogging: process.env.MYSQL_LOG === 'true',
}));
