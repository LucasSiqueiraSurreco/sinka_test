import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentsDto } from '../dtos/assignments.dto';
import { AssignmentsRepository } from '../repositories/assignments.repository';
import { AssignmentsItem, AssignmentsModel } from '../models/assignments.model';

@Injectable()
export class AssignmentsService {
    constructor(
        @InjectRepository(AssignmentsRepository)
        private readonly repository: AssignmentsRepository,
    ) {}

    async assignmentRegister(body: AssignmentsDto) {
        return this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.assignmentRegister(body, entityManager);
        });
    }

    async getAllAssignments(): Promise<AssignmentsModel> {
        const entities = await this.repository.getAllAssignments();
        const items = entities.map(
            (entity) =>
                new AssignmentsItem({
                    clientId: entity.clientId,
                    clientName: entity.clientName,
                    clientEmail: entity.clientEmail,
                    operatorId: entity.operatorId,
                    operatorName: entity.operatorName,
                }),
        );

        const model = new AssignmentsModel({
            items,
            meta: { total: items.length },
        });

        return model;
    }
}
