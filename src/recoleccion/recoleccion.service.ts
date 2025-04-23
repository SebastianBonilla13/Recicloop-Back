import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecoleccionDto } from './dto/create-recoleccion.dto';
import { UpdateRecoleccionDto } from './dto/update-recoleccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recoleccion } from './entities/recoleccion.entity';
import { Repository } from 'typeorm';
import { DetalleRecoleccion } from './detalle-recoleccion/entities/detalle-recoleccion.entity';
import { CreateDetalleRecoleccionDto } from './detalle-recoleccion/dto/create-detalle-recoleccion.dto';

@Injectable()
export class RecoleccionService {

  constructor(
    @InjectRepository(Recoleccion)
    private readonly recoleccionRepository: Repository<Recoleccion>,

    @InjectRepository(DetalleRecoleccion)
    private readonly detalleRecoleccionRepository: Repository<DetalleRecoleccion>
  ) { }

  async create(createRecoleccionDto: CreateRecoleccionDto) {
    return await this.recoleccionRepository.save(createRecoleccionDto);
  }

  async findAll() {
    return await this.recoleccionRepository.find();
  }

  async findOne(id: number) {
    return await this.recoleccionRepository.findOneBy({ id });
  }

  async update(id: number, updateRecoleccionDto: UpdateRecoleccionDto) {
    return await this.recoleccionRepository.update(id, updateRecoleccionDto);
  }

  async remove(id: number) {
    return await this.recoleccionRepository.softDelete(id);
  }

  // Después de realizar la autenticación del usuario
  async iniciarRecoleccion(usuarioId: number, puntoReciclajeId: number) {
    // Verificar si hay una recolección activa
    const recoleccionActiva = await this.recoleccionRepository.findOne({
      where: {
        usuarioId,
        puntoReciclajeId,
        completado: false
      }
    });

    if (recoleccionActiva) {
      throw new Error('Ya existe una recolección activa para este usuario en este punto');
    }

    // Crear nueva recolección
    const nuevaRecoleccion = this.recoleccionRepository.create({
      usuarioId,
      puntoReciclajeId,
      fechaInicio: new Date(),
      completado: false,
      puntosTotales: 0
    });

    return await this.recoleccionRepository.save(nuevaRecoleccion);
  }

  // Agregar detalle de cada producto reciclado
  async agregarDetalle(recoleccionId: number, detalleDto: CreateDetalleRecoleccionDto) {

    // Verificar si la recolección está activa
    const recoleccion = await this.recoleccionRepository.findOne({
      where: {
        /* id: recoleccionId, */
        id: detalleDto.recoleccionId,
        completado: false
      }
    });

    if (!recoleccion) {
      throw new Error('No se encontró una recolección activa');
    }

    // Crear nuevo detalle de recolección
    const nuevoDetalle = this.detalleRecoleccionRepository.create({
      /* recoleccionId, */
      ...detalleDto,
      fechaHora: new Date()
    });

    // Guardar detalle en la bd
    await this.detalleRecoleccionRepository.save(nuevoDetalle);

    // Actualizar puntos totales
    recoleccion.puntosTotales += nuevoDetalle.puntos;

    // Guardar Recolección actualizada
    await this.recoleccionRepository.save(recoleccion);

    return nuevoDetalle;
  }

  async finalizarRecoleccion(recoleccionId: number) {
    // Verificar si la recolección está activa
    const recoleccion = await this.recoleccionRepository.findOne({
      where: {
        id: recoleccionId,
        completado: false
      }
    });

    if (!recoleccion) {
      throw new Error('No se encontró una recolección activa');
    }

    recoleccion.fechaFin = new Date();
    recoleccion.completado = true;

    return await this.recoleccionRepository.save(recoleccion);
  }

}
