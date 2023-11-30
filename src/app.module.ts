import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { PerformerModule } from './performer/performer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album/album.entity';
import { TrackEntity } from './track/track.entity';
import { PerformerEntity } from './performer/performer.entity';
import { AlbumTrackModule } from './album-track/album-track.module';
import { AlbumPerformerModule } from './album-performer/album-performer.module';

@Module({
  imports: [AlbumModule, TrackModule, PerformerModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'musica',
    entities: [ AlbumEntity,TrackEntity, PerformerEntity],
    synchronize: true,
    dropSchema: true,
    keepConnectionAlive: true
  }),
  AlbumTrackModule,
  AlbumPerformerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
