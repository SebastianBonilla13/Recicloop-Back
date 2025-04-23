import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(+id);
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
