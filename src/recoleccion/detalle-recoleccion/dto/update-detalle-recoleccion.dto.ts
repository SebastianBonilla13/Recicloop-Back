import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleRecoleccionDto } from './create-detalle-recoleccion.dto';

export class UpdateDetalleRecoleccionDto extends PartialType(CreateDetalleRecoleccionDto) {}
