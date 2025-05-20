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

    @InjectRepository(Recoleccion)
    private readonly recoleccionRepository: Repository<Recoleccion>,
  ) { }

  // función asincrona, o bloquean la ejecución del programa. await, espera a que la promesa guardar en la bd se resuelva
  async create(createUsuarioDto: CreateUsuarioDto) {

    let randomId: number;
    let usuarioExistente: Usuario | null;

    do {
      // Genera número aleatorio de 5 dígitos (entre 10000 y 99999) = 90000 posibilidades
      randomId = Math.floor(10000 + Math.random() * 90000);
      usuarioExistente = await this.usuarioRepository.findOneBy({ id: randomId }); // busca existencia en bd

    } while (usuarioExistente);

    // Crear un nuevo usuario con ID aleatorio
    const usuario = this.usuarioRepository.create({
      id: randomId, // asigna el id aleatorio
      ...createUsuarioDto, // asigna el resto del dto
    });

    try {
      return await this.usuarioRepository.save(usuario); // guarda el entity en la bd
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }

  }

  /* async findAll() {
    return this.usuarioRepository.find();
  } */

  async findOne(id: number) {
    
    /* if(id < 10000 || id > 99999) {
      return {"message": "El ID debe ser un número de 5 dígitos."};
    } */

    if(!await this.usuarioRepository.findOneBy({ id })){
      return {response: false}
    }

    return {response: true}
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

  /* async findHistorialRecolecciones(idUsuario: number) {
    return await this.recoleccionRepository.find({
      where: {
        usuarioId: idUsuario
      },
      select: ['id', 'usuarioId', 'puntoReciclajeId', 'fechaInicio', 'fechaFin', 'numeroBotellas', 'puntosTotales', 'completado'],
      relations: ['detalles', 'puntoReciclaje'],
    });
  } */
    async findHistorialRecolecciones(idUsuario: number) {
      return await this.recoleccionRepository.find({
          where: {
              usuarioId: idUsuario
          },
          select: {
              id: true,
              usuarioId: true,
              puntoReciclajeId: true,
              fechaInicio: true,
              fechaFin: true,
              numeroBotellas: true,
              puntosTotales: true,
              completado: true,
              puntoReciclaje: {
                  /* id: true, */
                  nombre: true,
                  ubicacion: true,
              }
          },
          relations: ['detalles', 'puntoReciclaje'], // Incluye la relación con PuntoReciclaje
      });
  }

}
