import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AssignmentsEntity } from '../entities/assignments.entity';
import { AssignmentsDto } from '../dtos/assignments.dto';

@Injectable()
export class AssignmentsRepository extends Repository<AssignmentsEntity> {
    constructor(private dataSource: DataSource) {
        super(AssignmentsEntity, dataSource.createEntityManager());
    }

    async assignmentRegister(body: AssignmentsDto, entityManager: EntityManager): Promise<AssignmentsEntity> {
        try {
            const create = this.create({
                operatorId: body.operatorId,
                clientId: body.clientId,
                createdAt: new Date(),
                createdBy: 'system',
            });
            return await entityManager.save(AssignmentsEntity, create);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                error.message = `Cliente já registrado.`;
                error.status_code = 4009;
                error.status = 409;
            }

            throw new HttpException(
                {
                    message: error.message,
                    status: false,
                    status_code: error.status_code || 4000,
                },
                error.status || 500,
            );
        }
    }
}
