import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatorsRepository } from './repositories/operators.repository';
import { OperatorsService } from './services/operators.service';
import { OperatorsEntity } from './entities/operators.entity';
import { OperatorsController } from './controllers/operators.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OperatorsEntity])],
    controllers: [OperatorsController],
    providers: [OperatorsService, OperatorsRepository],
    exports: [OperatorsRepository],
})
export class OperatorsModule {}
