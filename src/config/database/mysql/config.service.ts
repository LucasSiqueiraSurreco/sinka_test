import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService {
    constructor(private configService: ConfigService) {}

    get env(): string {
        return this.configService.get<string>('typeorm.env');
    }

    get host(): string {
        return this.configService.get<string>('MYSQL_HOST');
    }

    get port(): number {
        return parseInt(this.configService.get<string>('MYSQL_PORT'));
    }

    get username(): string {
        return this.configService.get<string>('MYSQL_USER');
    }

    get password(): string {
        return this.configService.get<string>('MYSQL_PASSWORD');
    }

    get database(): string {
        return this.configService.get<string>('MYSQL_DATABASE');
    }

    get isLogging(): boolean {
        return this.configService.get<string>('MYSQL_LOG') === 'true';
    }

    //   get host(): string {
    //     return this.configService.get<string>('typeorm.host');
    //   }

    //   get port(): number {
    //     return parseInt(this.configService.get<string>('typeorm.port'));
    //   }

    //   get username(): string {
    //     return this.configService.get<string>('typeorm.username');
    //   }

    //   get password(): string {
    //     return this.configService.get<string>('typeorm.password');
    //   }

    //   get database(): string {
    //     return this.configService.get<string>('typeorm.database');
    //   }

    //   get isLogging(): boolean {
    //     return Boolean(this.configService.get<string>('typeorm.isLogging'));
    //   }
}
