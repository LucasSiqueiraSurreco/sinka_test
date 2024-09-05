import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@config/environments/configuration';
import { MysqlProviderModule } from '@providers/mysql/mysql.module';
import { ModulesModule } from '@modules/modules.module';
import { AppController } from './app.controller';
import { AllExceptionsFilter } from 'filters/all-exceptions.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MysqlProviderModule,
        ModulesModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        ModulesModule,
    ],
    exports: [ModulesModule],
})
export class AppModule {}
