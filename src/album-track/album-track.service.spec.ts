import { Test, TestingModule } from '@nestjs/testing';
import { AlbumTrackService } from './album-track.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { get } from 'http';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('AlbumTrackService', () => {
  let service: AlbumTrackService;
  let albumRepository: Repository<AlbumEntity>;
  let trackRepository: Repository<TrackEntity>;
  let album : AlbumEntity;
  let trackList: TrackEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumTrackService],
    }).compile();

    service = module.get<AlbumTrackService>(AlbumTrackService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    trackRepository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    await seedDatabase();
  });


  const seedDatabase =async () => {
    albumRepository.clear();
    trackRepository.clear();
    trackList = [];
    for(let i=0; i<5; i++) {
      const track: TrackEntity = await trackRepository.save({
        nombre: faker.music.genre(),
        duracion: faker.number.int()
      })
      trackList.push(track);
    }

    album = await albumRepository.save({
      nombre: faker.music.genre(),
      caratula: faker.lorem.word(),
      fecha: faker.date.past(),
      descripcion: faker.lorem.paragraph(),
      tracks: trackList
    })
  }



  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a track to an album', async () => {
    const newTrack: TrackEntity = await trackRepository.save({
      nombre: faker.music.genre(),
      duracion: faker.number.int()

    });

    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: faker.music.genre(),
      caratula: faker.lorem.word(),
      fecha: faker.date.past(),
      descripcion: faker.lorem.paragraph(),
    });

    const result: AlbumEntity = await service.addTrackToAlbum(newAlbum.id, newTrack.id);
    expect(result.tracks.length).toBe(1);
  });

});
