import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { AlbumPerformerService } from './album-performer.service';
import { PerformerEntity } from '../performer/performer.entity';
import { AlbumPerformerController } from './album-performer.controller';


@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity,PerformerEntity])],
    providers: [AlbumPerformerService],
    controllers: [AlbumPerformerController]
})
export class AlbumPerformerModule {}
