import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { PuntoReciclaje } from 'src/punto-reciclajes/entities/punto-reciclaje.entity';
import { Recoleccion } from 'src/recoleccion/entities/recoleccion.entity';
/* import { UsuarioPuntoReciclaje } from 'src/punto-reciclajes/entities/usuario-punto-reciclaje.entity'; */

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) // inyecta el repositorio de la entidad Usuario
    private readonly usuarioRepository: Repository<Usuario>, // define el tipo de repositorio

    @InjectRepository(PuntoReciclaje)
    private readonly puntoReciclajeRepository: Repository<PuntoReciclaje>,

    @InjectRepository(Recoleccion)
    private readonly recoleccionRepository: Repository<Recoleccion>,
  ) { }

  // función asincrona, o bloquean la ejecución del programa. await, espera a que la promesa guardar en la bd se resuelva
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepository.create(createUsuarioDto); // crea un objeto de entity Usuario
    return await this.usuarioRepository.save(usuario); // guarda el entity en la bd
  }

  async findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOneBy({ id });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async remove(id: number) {
    return await this.usuarioRepository.softDelete(id);
  }

  /* async findHistorialRecolecciones(idUsuario: number) {
    return await this.recoleccionRepository.find({
      where: { usuarioId: idUsuario },
      select: ['usuarioId', 'puntoReciclajeId', 'fechaInicio', 'fechaFin', 'puntosTotales', 'completado'],
      relations: ['detalles'],
    });
  } */

  async findHistorialRecolecciones(idUsuario: number) {
    return await this.recoleccionRepository.find({
      where: {
        usuarioId: idUsuario
      },
      select: ['id', 'usuarioId', 'puntoReciclajeId', 'fechaInicio', 'fechaFin', 'puntosTotales', 'completado'],
      relations: ['detalles'],
    });
  }

}
