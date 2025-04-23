import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleRecoleccionService } from './detalle-recoleccion.service';
import { CreateDetalleRecoleccionDto } from './dto/create-detalle-recoleccion.dto';
import { UpdateDetalleRecoleccionDto } from './dto/update-detalle-recoleccion.dto';

@Controller('detalle-recoleccion')
export class DetalleRecoleccionController {
  constructor(private readonly detalleRecoleccionService: DetalleRecoleccionService) {}

  @Post()
  create(@Body() createDetalleRecoleccionDto: CreateDetalleRecoleccionDto) {
    return this.detalleRecoleccionService.create(createDetalleRecoleccionDto);
  }

  @Get()
  findAll() {
    return this.detalleRecoleccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.detalleRecoleccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDetalleRecoleccionDto: UpdateDetalleRecoleccionDto) {
    return this.detalleRecoleccionService.update(+id, updateDetalleRecoleccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.detalleRecoleccionService.remove(+id);
  }
}
