import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>,
    ) {}

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find({});
    }

    async findOne(id: string): Promise<TrackEntity> {
        const track: TrackEntity = await this.trackRepository.findOne( {where:{id}});
        if (!track) 
            throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
        return track;
    }

    async create(track: TrackEntity): Promise<TrackEntity> {
        return await this.trackRepository.save(track);
    }

    async delete(id: string){
        const track: TrackEntity = await this.trackRepository.findOne( {where:{id} });
        if (!track) 
            throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
        return await this.trackRepository.remove(track);
    }
}
