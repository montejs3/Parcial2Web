import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';
import { PerformerEntity } from './performer.entity';


@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>,
    ) {}

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find({  });
    }

    async findOne(id: string): Promise<PerformerEntity> {
        console.log('Provided ID:', id);

        const performer: PerformerEntity = await this.performerRepository.findOne( {where:{id} });
        if (!performer) 
            throw new BusinessLogicException("The performer with the given id was not found", BusinessError.NOT_FOUND);
        return performer;
    }

    async create(performer: PerformerEntity): Promise<PerformerEntity> {
        return await this.performerRepository.save(performer);
    }

    async delete(id: string){
        const performer: PerformerEntity = await this.performerRepository.findOne( {where:{id} });
        if (!performer) 
            throw new BusinessLogicException("The performer with the given id was not found", BusinessError.NOT_FOUND);
        return await this.performerRepository.remove(performer);
    }




}
