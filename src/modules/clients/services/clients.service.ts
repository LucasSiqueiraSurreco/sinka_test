import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsRepository } from '@modules/clients/repositories/clients.repository';
import { ClientsDto } from '../dtos/clients.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientsRepository)
        private readonly repository: ClientsRepository,
    ) {}

    async clientRegister(body: ClientsDto) {
        return this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.clientRegister(body, entityManager);
        });
    }
}
