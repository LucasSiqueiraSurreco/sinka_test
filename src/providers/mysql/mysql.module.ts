import { TypeOrmConfigModule } from '@config/database/mysql/config.module';
import { TypeOrmConfigService } from '@config/database/mysql/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [TypeOrmConfigModule],
            useFactory: (typeOrmConfigService: TypeOrmConfigService) => {
                return {
                    type: 'mysql',
                    host: typeOrmConfigService.host,
                    port: typeOrmConfigService.port,
                    username: typeOrmConfigService.username,
                    password: typeOrmConfigService.password,
                    database: typeOrmConfigService.database,
                    synchronize: false,
                    migrationsRun: false,
                    logging: typeOrmConfigService.isLogging,
                    entities: ['dist/**/*.entity.js'],
                    migrations: ['dist/database/migrations/**/*{.ts,.js}'],
                    cli: {
                        migrationsDir: 'src/database/migrations',
                    },
                    autoLoadEntities: true,
                };
            },
            inject: [TypeOrmConfigService],
        }),
    ],
    exports: [TypeOrmModule],
})
export class MysqlProviderModule {
    constructor(private dataSource: DataSource) {}
}
