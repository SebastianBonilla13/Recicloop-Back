import { Injectable } from '@nestjs/common';
import { CreatePuntoReciclajeDto } from './dto/create-punto-reciclaje.dto';
import { UpdatePuntoReciclajeDto } from './dto/update-punto-reciclaje.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PuntoReciclaje } from './entities/punto-reciclaje.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PuntoReciclajesService {

  constructor(
    @InjectRepository(PuntoReciclaje) // inyecta el repositorio de la entidad PuntoReciclaje
    private readonly puntoReciclajeRepository: Repository<PuntoReciclaje> // define el tipo de repositorio
  ) {}

  async create(createPuntoReciclajeDto: CreatePuntoReciclajeDto) {
    return await this.puntoReciclajeRepository.save(createPuntoReciclajeDto); // guarda el entity en la bd
  }

  async findAll() {
    return await this.puntoReciclajeRepository.find();
  }

  async findOne(id: number) {
    return await this.puntoReciclajeRepository.findOneBy({id});
  }

  async update(id: number, updatePuntoReciclajeDto: UpdatePuntoReciclajeDto) {
    return await this.puntoReciclajeRepository.update(id, updatePuntoReciclajeDto);
  }

  async remove(id: number) {
    return await this.puntoReciclajeRepository.softDelete(id);
  }
}
