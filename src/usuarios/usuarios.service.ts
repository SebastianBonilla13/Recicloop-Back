import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { PuntoReciclaje } from 'src/punto-reciclajes/entities/punto-reciclaje.entity';
import { UsuarioPuntoReciclaje } from 'src/punto-reciclajes/entities/usuario-punto-reciclaje.entity';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) // inyecta el repositorio de la entidad Usuario
    private readonly usuarioRepository: Repository<Usuario>, // define el tipo de repositorio
    @InjectRepository(PuntoReciclaje)
    private readonly puntoReciclajeRepository: Repository<PuntoReciclaje>,
    @InjectRepository(UsuarioPuntoReciclaje)
    private readonly usuarioPuntoReciclajeRepository: Repository<UsuarioPuntoReciclaje>
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

  async findPuntosVisitados(id: number) {
    return await this.usuarioRepository.findOne({
      where: { id },
      relations: ['puntosVisitados'],
    });
  }

  async findHistorialPuntosVisitados(idUsuario: number) {
    return await this.usuarioPuntoReciclajeRepository.find({
      where: { usuarioId: idUsuario },
      select: ['usuarioId', 'puntoReciclajeId', 'fechaRegistro', 'puntosObtenidos'], // Selecciona las columnas específicas
    });
  }

  async addPuntoReciclaje(idUsuario: number, idPuntoReciclaje: number, puntosObtenidos: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id: idUsuario });
    const puntoReciclaje = await this.puntoReciclajeRepository.findOneBy({ id: idPuntoReciclaje });

    if (!usuario) {
      throw new Error('Usuario not found');
    } else if (!puntoReciclaje) {
      throw new Error('PuntoReciclaje not found');
    } else {
      /* usuario.visitas.push( puntoReciclaje); */ // añade el punto reciclaje a la lista de visitas del usuario:

      // create de TypeORM
      const usuarioPuntoReciclaje = this.usuarioPuntoReciclajeRepository.create({
        usuarioId: idUsuario,
        puntoReciclajeId: idPuntoReciclaje,
        fechaRegistro: new Date(), // Asigna la fecha actual
        puntosObtenidos: puntosObtenidos, // total puntos obtenidos
      });
      /* usuario.visitas.push(usuarioPuntoReciclaje); */ // añade la relación a la lista de visitas del usuario
      /* puntoReciclaje.visitas.push(usuarioPuntoReciclaje);  */// añade la relación a la lista de visitas del punto reciclaje
      // Guarda la relación en la tabla intermedia

      const a = await this.usuarioPuntoReciclajeRepository.save(usuarioPuntoReciclaje); // Guarda la relación en la tabla intermedia

      usuario.ecoPoints += puntosObtenidos; // suma puntos obtenidos
      await this.usuarioRepository.save(usuario); // guardar usuario con nuevos puntos
      await this.puntoReciclajeRepository.save(puntoReciclaje); 

      return a; // devuelve la relación guardada

    }

  }

}
