import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TrackService } from './track.service';


@Controller('track')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Get()
    async findAll() {
        return await this.trackService.findAll();
    }

    @Get(':trackId')
    async findOne(@Param('trackId') trackId: string) {
        return await this.trackService.findOne(trackId);
    }

    @Post()
    async create(@Body() trackDto: any) {
        return await this.trackService.create(trackDto);
    }

    @Post(':albumId')
    async createDirectToAlbum(@Param('albumId') albumId: string, @Body() trackDto: any) {
        return await this.trackService.createDirectToAlbum(albumId, trackDto);
    }

    @Delete(':trackId')
    @HttpCode(204)
    async delete(@Param('trackId') trackId: string) {
        return await this.trackService.delete(trackId);
    }





}
