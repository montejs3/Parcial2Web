import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { AlbumEntity } from '../album/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity,AlbumEntity])],
  providers: [TrackService],
  controllers: [TrackController]
})
export class TrackModule {}
