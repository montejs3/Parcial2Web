import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AlbumTrackService } from './album-track.service';


@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumTrackController {
    constructor(private readonly albumTrackService: AlbumTrackService) {}


    @Post(':albumId/track/:trackId')
    async addTrackToAlbum(@Param('albumId') albumId: string, @Param('trackId') trackId: string) {
        return await this.albumTrackService.addTrackToAlbum(albumId, trackId);
    }

    @Get(':albumId/track')
    async findTracksByAlbumId(@Param('albumId') albumId: string) {
        return await this.albumTrackService.findTracksByAlbumId(albumId);
    }
    
}
