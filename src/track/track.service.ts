import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class TrackService {
    constructor(

        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

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

    async createDirectToAlbum(albumId: string, track: TrackEntity): Promise<TrackEntity> {
        await this.trackRepository.save(track);
    
        const album: AlbumEntity = await this.albumRepository.findOne({
            where: { id: albumId },
            relations: ['tracks'], // Load the 'tracks' relation
        });
    
        if (!album) {
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        }
    
        const trackEntity: TrackEntity = await this.trackRepository.findOne({ where: { id: track.id } });
    
        album.tracks = [...album.tracks, trackEntity];
    
        await this.albumRepository.save(album);

        return trackEntity;
    }


    

    async delete(id: string){
        const track: TrackEntity = await this.trackRepository.findOne( {where:{id} });
        if (!track) 
            throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
        return await this.trackRepository.remove(track);
    }
}
