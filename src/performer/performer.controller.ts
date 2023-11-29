import { Controller, UseInterceptors,Get,Param,Post,Body,Delete,HttpCode } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity';
import { plainToInstance } from 'class-transformer';
import { PerformerDto } from './performer.dto';


@Controller('performer')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {
    constructor(private readonly performerService: PerformerService) {}

    @Get()
    async findAll() {
        return await this.performerService.findAll();
    }

    @Get(':performerId')
    async findOne(@Param('performerId') performerId: string) {
        return await this.performerService.findOne(performerId);
    }

    @Post()
    async create(@Body() performerDto: PerformerDto) {
        const performer: PerformerEntity = plainToInstance(PerformerEntity, performerDto);
        return await this.performerService.create(performer);
    }

    @Delete(':performerId')
    @HttpCode(204)
    async delete(@Param('performerId') performerId: string) {
        return await this.performerService.delete(performerId);
    }




}
