import { IsNotEmpty, IsString, Length } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";

export class CreatePuntoReciclajeDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    nombre: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    ubicacion: string;
    
    // usuarios: Usuario[];
}
