import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecoleccionService } from './recoleccion.service';
import { CreateRecoleccionDto } from './dto/create-recoleccion.dto';
import { UpdateRecoleccionDto } from './dto/update-recoleccion.dto';
import { CreateDetalleRecoleccionDto } from './detalle-recoleccion/dto/create-detalle-recoleccion.dto';

@Controller('recoleccion')
export class RecoleccionController {
  constructor(private readonly recoleccionService: RecoleccionService) { }

  @Post()
  create(@Body() createRecoleccionDto: CreateRecoleccionDto) {
    return this.recoleccionService.create(createRecoleccionDto);
  }

  @Get()
  findAll() {
    return this.recoleccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recoleccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecoleccionDto: UpdateRecoleccionDto) {
    return this.recoleccionService.update(+id, updateRecoleccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recoleccionService.remove(+id);
  }

  // --------

  @Post('iniciar')
  async iniciarRecoleccion(@Body('usuarioId') usuarioId: number, @Body('puntoReciclajeId') puntoReciclajeId: number) {
    return await this.recoleccionService.iniciarRecoleccion(usuarioId, puntoReciclajeId);
  }

  @Post(':id/detalle')
  async agregarDetalle(@Param('id') recoleccionId: number, @Body() detalleDto: CreateDetalleRecoleccionDto) {
    return await this.recoleccionService.agregarDetalle(recoleccionId, detalleDto);
  }

  @Post(':id/finalizar')
  async finalizarRecoleccion(@Param('id') recoleccionId: number) {
    return await this.recoleccionService.finalizarRecoleccion(recoleccionId);
  }


}
