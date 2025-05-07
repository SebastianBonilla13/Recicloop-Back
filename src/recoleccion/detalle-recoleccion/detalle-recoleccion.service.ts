import { Injectable } from '@nestjs/common';
import { CreateDetalleRecoleccionDto } from './dto/create-detalle-recoleccion.dto';
import { UpdateDetalleRecoleccionDto } from './dto/update-detalle-recoleccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleRecoleccion } from './entities/detalle-recoleccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleRecoleccionService {

  constructor(
    @InjectRepository(DetalleRecoleccion)
    private readonly detalleRecoleccionRepository: Repository<DetalleRecoleccion>
  ) { }

  async create(createDetalleRecoleccionDto: CreateDetalleRecoleccionDto) {
    return await this.detalleRecoleccionRepository.save(createDetalleRecoleccionDto);
  }

  async findAll() {
    return await this.detalleRecoleccionRepository.find();
  }

  async findOne(id: number) {
    return await this.detalleRecoleccionRepository.findOneBy({ id });
  }

  async update(id: number, updateDetalleRecoleccionDto: UpdateDetalleRecoleccionDto) {
    return await this.detalleRecoleccionRepository.update(id, updateDetalleRecoleccionDto);
  }

  async remove(id: number) {
    return await this.detalleRecoleccionRepository.softDelete(id);
  }
}



