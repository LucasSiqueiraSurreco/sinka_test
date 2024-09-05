import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { OperatorsEntity } from '../entities/operators.entity';
import { OperatorsDto } from '../dtos/operators.dto';

@Injectable()
export class OperatorsRepository extends Repository<OperatorsEntity> {
    constructor(private dataSource: DataSource) {
        super(OperatorsEntity, dataSource.createEntityManager());
    }

    async operatorRegister(
        body: OperatorsDto,
        entityManager: EntityManager,
    ): Promise<OperatorsEntity> {
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

    //   async updateOperator(
    //     body: OperatorsDto,
    //     updatedBy: string,
    //     entityManager: EntityManager,
    //   ): Promise<void | HttpException> {
    //     try {
    //       return entityManager
    //         .createQueryBuilder()
    //         .update(OperatorsEntity)
    //         .set({
    //           updatedBy: updatedBy,
    //           name: body.name,
    //         })
    //         .where('id = :id', { id: body.id })
    //         .execute()
    //         .then(async (data) => {
    //           if (data.affected > 0) {
    //             return;
    //           }

    //           throw new HttpException(
    //             {
    //               message: `Operador ${body.name} não encontrado`,
    //               status: false,
    //               status_code: 4000,
    //             },
    //             HttpStatus.BAD_REQUEST,
    //           );
    //         });
    //     } catch (error) {
    //       if (error.code === 'ER_DUP_ENTRY') {
    //         error.message = `Operador já está registrado.`;
    //         error.status_code = 4009;
    //         error.status = 409;
    //       }

    //       throw new HttpException(
    //         {
    //           message: error.message,
    //           status: false,
    //           status_code: error.status_code || 4000,
    //         },
    //         error.status || 500,
    //       );
    //     }
    //   }

    // Find all Operators
    async findAllOperators(): Promise<OperatorsEntity[]> {
        return await this.find();
    }

    async findOperatorById(id: string): Promise<OperatorsEntity | null> {
        return await this.findOne({ where: { id } });
    }

    async deleteOperator(id: string): Promise<void> {
        const operator = await this.findOne({ where: { id } });
        if (!operator) {
            throw new Error('Operator not found');
        }
        await this.remove(operator);
    }
}
