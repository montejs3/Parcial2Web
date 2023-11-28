import {TypeOrmModule} from '@nestjs/typeorm';
import {AlbumEntity} from '../../album/album.entity';
import {TrackEntity} from '../../track/track.entity';
import {PerformerEntity} from '../../performer/performer.entity';


export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [AlbumEntity, PerformerEntity, TrackEntity],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([AlbumEntity, PerformerEntity, TrackEntity]),
];

