import { Module } from '@nestjs/common';
import { AlbumTrackService } from './album-track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { AlbumTrackController } from './album-track.controller';

@Module({
  providers: [AlbumTrackService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, TrackEntity])],
  controllers: [AlbumTrackController],
})
export class AlbumTrackModule {}
