import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { OperatorsEntity } from '../entities/operators.entity';
import { OperatorsDto } from '../dtos/operators.dto';

@Injectable()
export class OperatorsRepository extends Repository<OperatorsEntity> {
    constructor(private dataSource: DataSource) {
        super(OperatorsEntity, dataSource.createEntityManager());
    }

    async operatorRegister(body: OperatorsDto, entityManager: EntityManager): Promise<OperatorsEntity> {
        try {
            const create = this.create({
                name: body.name,
                createdAt: new Date(),
                createdBy: 'system',
            });
            return await entityManager.save(OperatorsEntity, create);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                error.message = `Operador já registrado.`;
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

    async operatorsMassRegister(bodies: OperatorsDto[], entityManager: EntityManager): Promise<OperatorsEntity[]> {
        try {
            const operators = bodies.map((body) =>
                this.create({
                    name: body.name,
                    createdAt: new Date(),
                    createdBy: 'system',
                }),
            );

            return await entityManager.save(OperatorsEntity, operators);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                error.message = `Um ou mais operadores já registrados.`;
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

    async findAllOperators(): Promise<OperatorsEntity[]> {
        return await this.find();
    }

    async findOperatorById(id: string): Promise<OperatorsEntity | null> {
        return await this.findOne({ where: { id } });
    }

    async deleteOperatorById(id: string): Promise<void> {
        try {
            const operator = await this.findOne({ where: { id } });

            if (!operator) {
                throw new HttpException(
                    {
                        message: 'Operator not found.',
                        status: false,
                        status_code: 4000,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }

            await this.manager.transaction(async (entityManager) => {
                await entityManager
                    .createQueryBuilder()
                    .update(OperatorsEntity)
                    .set({
                        deletedAt: new Date(),
                        deletedBy: 'system',
                    })
                    .where('id = :id', { id })
                    .execute();
            });

            console.log('Operator deleted successfully.');
        } catch (error) {
            console.error(JSON.stringify({ context: this.deleteOperatorById.name, message: error.message }));

            throw new HttpException(
                {
                    message: error.message,
                    status: false,
                    status_code: error.status_code || 4000,
                },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
