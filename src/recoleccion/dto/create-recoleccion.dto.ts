import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRecoleccionDto {

    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;
    
    @IsNotEmpty()
    @IsNumber()
    puntoReciclajeId: number;
    
}
