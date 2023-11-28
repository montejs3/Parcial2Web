import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany , JoinTable} from 'typeorm';
import { TrackEntity } from '../track/track.entity';
import { PerformerEntity } from '../performer/performer.entity';

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    fecha: Date;

    @Column()
    descripcion: string;

    @OneToMany(() => TrackEntity, track => track.album)
    tracks: TrackEntity[];

    @ManyToMany(() => PerformerEntity, performer => performer.albums)
    @JoinTable()
    performers: PerformerEntity[];
 
   

}
