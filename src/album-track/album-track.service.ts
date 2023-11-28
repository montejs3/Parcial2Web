import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AlbumTrackService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>,

    ) {}

    async addTrackToAlbum(albumId: string, trackId: string): Promise<AlbumEntity> {
        const track: TrackEntity = await this.trackRepository.findOne({where: {id: trackId}});
        if (!track) 
            throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);

        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ['tracks', 'performers']})
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        album.tracks= [...album.tracks, track];
        return await this.albumRepository.save(album);
        
    }

    async findTracksByAlbumId(albumId: string): Promise<TrackEntity[]> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ['tracks']})
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return album.tracks;
    }
    
}
