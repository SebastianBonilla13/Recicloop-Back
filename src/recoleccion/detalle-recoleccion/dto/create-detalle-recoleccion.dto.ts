import { IsDecimal, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateDetalleRecoleccionDto {

    /* @IsNotEmpty()
    @IsNumber()
    cantidad: number; */

    @IsNotEmpty()
    @IsNumber()
    recoleccionId: number;
    
    @IsNotEmpty()
    /* @IsDecimal() */
    @Min(0.01)
    @Max(999999.99)
    longitudProducto: number;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(99)
    puntos: number;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0.001)
    @Max(99.99)
    peso: number;
    
}
