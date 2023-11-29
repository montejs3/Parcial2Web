import { IsNotEmpty, IsString } from 'class-validator';
export class PerformerDto {
        @IsNotEmpty()
        @IsString()
        nombre: string;

        @IsNotEmpty()
        @IsString()
        descripcion: string;

        @IsNotEmpty()
        @IsString()
        imagen: string;
}
