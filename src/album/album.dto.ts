import { IsNotEmpty, IsString } from 'class-validator';
export class AlbumDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsString()
    caratula: string;

    @IsNotEmpty()
    fecha: Date;

}
