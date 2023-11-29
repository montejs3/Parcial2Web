import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from './track.service';
import {Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';


describe('TrackService', () => {
  let service: TrackService;
  let repository: Repository<TrackEntity>;
  let tracklist: TrackEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TrackService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tracklist = [];
    for(let i = 0; i < 5; i++){
        const track: TrackEntity = await repository.save({
          nombre: faker.lorem.word(),
          duracion: faker.datatype.number()})
        tracklist.push(track);
    }
  }




  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all tracks', async () => {
    const tracks: TrackEntity[] = await service.findAll();
    expect(tracks).not.toBeNull();
    expect(tracks).toHaveLength(tracklist.length);
  });

  it('findOne should return a track by id', async () => {
    const storedTrack: TrackEntity = tracklist[0];
    const track: TrackEntity = await service.findOne(storedTrack.id);
    expect(track).not.toBeNull();
    expect(track.nombre).toEqual(storedTrack.nombre)
    expect(track.duracion).toEqual(storedTrack.duracion)
  });

  
});
