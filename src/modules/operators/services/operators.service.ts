import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorsRepository } from '../repositories/operators.repository';
import { OperatorsDto } from '../dtos/operators.dto';
import { OperatorsEntity } from '../entities/operators.entity';
import { OperatorsItem, OperatorsItemModel } from '../models/operators.model';

@Injectable()
export class OperatorsService {
    constructor(
        @InjectRepository(OperatorsRepository)
        private readonly repository: OperatorsRepository,
    ) {}

    async findAllOperators(): Promise<OperatorsItemModel> {
        const entities = await this.repository.findAllOperators();

        const items = entities.map(
            (entity: OperatorsEntity) =>
                new OperatorsItem({
                    id: entity.id,
                    name: entity.name,
                }),
        );

        const model = new OperatorsItemModel({
            items,
            meta: { total: items.length },
        });

        return model;
    }

    async operatorRegister(body: OperatorsDto) {
        return await this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.operatorRegister(body, entityManager);
        });
    }

    async operatorsMassRegister(bodies: OperatorsDto[]) {
        return await this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.operatorsMassRegister(bodies, entityManager);
        });
    }

    async deleteOperatorById(id: string): Promise<void> {
        return await this.repository.deleteOperatorById(id);
    }
}
