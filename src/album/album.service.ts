import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';


@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ) {}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["performers", "tracks"] });
    }

    async findOne(id: string): Promise<AlbumEntity> {
        console.log('Provided ID:', id);

        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id}, relations: ["performers", "tracks"] });
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if (!album.nombre || !album.fecha)
            throw new BusinessLogicException("The album name and date are required", BusinessError.PRECONDITION_FAILED);
        return await this.albumRepository.save(album);
    }

    async delete(id: string){
        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id} });
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return await this.albumRepository.remove(album);
    }




}
