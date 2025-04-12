import { PartialType } from '@nestjs/mapped-types';
import { CreatePuntoReciclajeDto } from './create-punto-reciclaje.dto';

export class UpdatePuntoReciclajeDto extends PartialType(CreatePuntoReciclajeDto) {}
