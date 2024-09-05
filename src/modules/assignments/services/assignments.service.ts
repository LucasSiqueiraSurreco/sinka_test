import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentsDto } from '../dtos/assignments.dto';
import { AssignmentsRepository } from '../repositories/assignments.repository';

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
}
