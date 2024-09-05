import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ClientsEntity } from '../entities/clients.entity';
import { ClientsDto } from '../dtos/clients.dto';
import { format, parse } from 'date-fns';

@Injectable()
export class ClientsRepository extends Repository<ClientsEntity> {
    constructor(private dataSource: DataSource) {
        super(ClientsEntity, dataSource.createEntityManager());
    }

    async clientRegister(
        body: ClientsDto,
        entityManager: EntityManager,
    ): Promise<ClientsEntity> {
        try {
            const birthDate = body.birth
                ? format(
                      parse(body.birth, 'dd-MM-yyyy', new Date()),
                      'yyyy-MM-dd',
                  )
                : null;

            const create = this.create({
                name: body.name,
                email: body.email,
                birth: birthDate,
                createdAt: new Date(),
                createdBy: 'system',
            });
            return await entityManager.save(ClientsEntity, create);
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
