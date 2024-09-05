import path from 'path';
import dotenv from 'dotenv';

const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });

if (result.error) {
    console.error('Nao foi possível encontrar o arquivo de ambiente');
    exit(1);
}

const baseConfig = {
    type: 'mysql',
    database: process.env.MYSQL_DATABASE,
    entities: [path.resolve(__dirname, 'src/**/*.entity{.ts,.js}')],
    migrations: [path.resolve(__dirname, 'src/database/migrations/**/*.ts')],
    cli: {
        migrationsDir: path.resolve('src/database/migrations'),
    },
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
};

module.exports = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    synchronize: false,
    ...baseConfig,
};
