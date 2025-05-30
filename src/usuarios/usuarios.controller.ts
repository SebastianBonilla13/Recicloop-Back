import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  /* @Get()
  findAll() {
    return this.usuariosService.findAll();
  } */

  /* @Get(':id')
  findOne(@Param(':id') id: number) {
    return this.usuariosService.findOne(+id);
  } */

  @Get()
  async findOne(@Query('id') id: number) {
    /* return this.usuariosService.findOne(+id); */

    // Validar datos
    if (!id) {
      console.error('Error: Datos inválidos recibidos:');
      return { response: false, message: 'Datos inválidos' };
    }

    // Consulta en base de datos
    const usuario = await this.usuariosService.findOne(+id);

    if (!usuario) {
      return { response: false, message: 'Usuario no encontrado' };
      
    }
    
    console.log(`Consultado Usuario con ID: ${usuario.id}`);

    return { response: true, nombre: usuario.nombre };
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuariosService.remove(+id);
  }

  /* @Get('puntos-visitados/:id')
  findPuntosVisitados(@Param('id') id: number) {
    return this.usuariosService.findPuntosVisitados(+id);
  } */

  @Get(':id/historial-recolecciones')
  findHistorialRecolecciones(@Param('id') idUsuario: number) {
    return this.usuariosService.findHistorialRecolecciones(+idUsuario);
  }

  /* @Post(':idUsuario/:idPuntoReciclaje/:puntosObtenidos')
  addPuntoReciclaje(@Param('idUsuario') idUsuario: number, @Param('idPuntoReciclaje') idPuntoReciclaje: number, @Param('puntosObtenidos') puntosObtenidos: number) {
    return this.usuariosService.addPuntoReciclaje(idUsuario, idPuntoReciclaje, puntosObtenidos);
  } */





}
