import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorsRepository } from '../repositories/operators.repository';
import { OperatorsDto } from '../dtos/operators.dto';

@Injectable()
export class OperatorsService {
    constructor(
        @InjectRepository(OperatorsRepository)
        private readonly repository: OperatorsRepository,
    ) {}

    async operatorRegister(body: OperatorsDto) {
        return this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.operatorRegister(body, entityManager);
        });
    }

    async operatorsMassRegister(bodies: OperatorsDto[]) {
        return this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.operatorsMassRegister(bodies, entityManager);
        });
    }
}
