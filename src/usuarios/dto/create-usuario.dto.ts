import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { PuntoReciclaje } from "src/punto-reciclajes/entities/punto-reciclaje.entity";

export class CreateUsuarioDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    nombre: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /* @IsNotEmpty()
    puntosVisitados: PuntoReciclaje[]; */

}
