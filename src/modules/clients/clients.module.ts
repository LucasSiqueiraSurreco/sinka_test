import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsEntity } from './entities/clients.entity';
import { ClientsController } from './controllers/clients.controller';
import { ClientsService } from './services/clients.service';
import { ClientsRepository } from './repositories/clients.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ClientsEntity])],
    controllers: [ClientsController],
    providers: [ClientsService, ClientsRepository],
    exports: [ClientsService, ClientsRepository],
})
export class ClientsModule {}
