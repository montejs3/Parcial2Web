import { Test, TestingModule } from '@nestjs/testing';
import {Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';


describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumlist: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    albumlist = [];
    for(let i = 0; i < 5; i++){
        const album: AlbumEntity = await repository.save({
            nombre: faker.lorem.word(),
            fecha: faker.date.past(),
            caratula: faker.lorem.word(),
            descripcion: faker.lorem.word()})
        albumlist.push(album);
    }
  }
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all albums', async () => {
    const albums: AlbumEntity[] = await service.findAll();
    expect(albums).not.toBeNull();
    expect(albums).toHaveLength(albumlist.length);
  });

  it('findOne should return a museum by id', async () => {
    const storedAlbum: AlbumEntity = albumlist[0];
    const album: AlbumEntity = await service.findOne(storedAlbum.id);
    expect(album).not.toBeNull();
    expect(album.nombre).toEqual(storedAlbum.nombre)
    expect(album.fecha).toEqual(storedAlbum.fecha)
    expect(album.caratula).toEqual(storedAlbum.caratula)
    expect(album.descripcion).toEqual(storedAlbum.descripcion)
  });


  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: faker.lorem.word(),
      fecha: faker.date.past(),
      caratula: faker.lorem.word(),
      descripcion: faker.lorem.word(),
      tracks: [],
      performers: []
    }
 
    const newAlbum: AlbumEntity = await service.create(album);
    expect(newAlbum).not.toBeNull();
 
    const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.nombre).toEqual(newAlbum.nombre)
    expect(storedAlbum.fecha).toEqual(newAlbum.fecha)
    expect(storedAlbum.caratula).toEqual(newAlbum.caratula)
    expect(storedAlbum.descripcion).toEqual(newAlbum.descripcion)
  });

  it('delete should remove a album', async () => {
    const album: AlbumEntity = albumlist[0];
    await service.delete(album.id);
     const deletedAlbum: AlbumEntity = await repository.findOne({ where: { id: album.id } })
    expect(deletedAlbum).toBeNull();
  });



});
