import { IsNotEmpty, IsString } from 'class-validator';
export class TrackDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    duracion: string;
    
}
