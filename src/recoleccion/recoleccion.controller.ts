import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecoleccionService } from './recoleccion.service';
import { UpdateRecoleccionDto } from './dto/update-recoleccion.dto';
import { CreateDetalleRecoleccionDto } from './detalle-recoleccion/dto/create-detalle-recoleccion.dto';

@Controller('recoleccion')
export class RecoleccionController {
  constructor(private readonly recoleccionService: RecoleccionService) { }

  /* @Post()
  create(@Body() createRecoleccionDto: CreateRecoleccionDto) {
    return this.recoleccionService.create(createRecoleccionDto);
  } */

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

  // ---------

  @Post('iniciar')
  async iniciarRecoleccion(
    @Query('usuarioId') usuarioId: number,
    @Query('puntoReciclajeId') puntoReciclajeId: number) {

    // Validar datos
    if (!usuarioId || !puntoReciclajeId) {
      console.error('Error: Datos inválidos recibidos:');
      return { response: false, message: 'Datos inválidos' };
    }

    // para errores específicos
    try {
      const nuevaRecoleccion = await this.recoleccionService.iniciarRecoleccion(usuarioId, puntoReciclajeId);
      console.log(`Recolección iniciada: ${nuevaRecoleccion.id}`);
      return { response: true, idRecoleccion: nuevaRecoleccion.id };
    } catch (error) {
      // Captura excepciones y retorna detalles
      return {
        response: false,
        message: error.message || 'Error al iniciar la recolección',
      };
    }

  }

  @Post('/detalle')
  async agregarDetalle(
    @Query('recoleccionId') recoleccionId: number,
    @Query('longitudProducto') longitudProducto: number) {

    console

    // Validar datos
    if (!recoleccionId || !longitudProducto) {
      console.error('DETALLE Error: Datos inválidos recibidos:');
      return { response: false, message: 'Datos inválidos' };
    }

    try {
      const objRecoleccion = new CreateDetalleRecoleccionDto();
      objRecoleccion.recoleccionId = recoleccionId;
      objRecoleccion.longitudProducto = longitudProducto;

      // Consulta en base de datos
      const recoleccion = await this.recoleccionService.agregarDetalle(objRecoleccion);

      if (!recoleccion) {
        return { response: false, message: 'No se pudo agregar detalle' };
      }

      console.log(`Detalle recolección agregado: ${objRecoleccion.longitudProducto} cm`);
      return { response: true };

    } catch (error) {
      // Captura excepciones y retorna detalles
      return {
        response: false,
        message: error.message || 'Error al agregar detalle a la recolección',
      };
    }

  }

  @Post('/finalizar')
  async finalizarRecoleccion
    (@Query('recoleccionId') recoleccionId: number) {

    // Validar datos
    if (!recoleccionId) {
      console.error('Error: Datos inválidos recibidos:', recoleccionId);
      return { response: false, message: 'Datos inválidos' };
    }

    // para errores específicos
    try {
      const recoleccion = await this.recoleccionService.finalizarRecoleccion(recoleccionId);

      if (!recoleccion) {
        return { response: false, message: 'No se pudo finalizar recoleccion' };
      }
      console.log(`Recolección finalizada: ${recoleccion.id}`);
      return { response: true };
    } catch (error) {
      // Captura excepciones y retorna detalles
      return {
        response: false,
        message: error.message || 'Error al iniciar la recolección',
      };
    }
  }
}
