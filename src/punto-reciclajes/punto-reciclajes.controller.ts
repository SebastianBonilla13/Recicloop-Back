import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntoReciclajesService } from './punto-reciclajes.service';
import { CreatePuntoReciclajeDto } from './dto/create-punto-reciclaje.dto';
import { UpdatePuntoReciclajeDto } from './dto/update-punto-reciclaje.dto';

@Controller('punto-reciclajes')
export class PuntoReciclajesController {
  constructor(private readonly puntoReciclajesService: PuntoReciclajesService) {}

  @Post()
  create(@Body() createPuntoReciclajeDto: CreatePuntoReciclajeDto) {
    return this.puntoReciclajesService.create(createPuntoReciclajeDto);
  }

  @Get()
  findAll() {
    return this.puntoReciclajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.puntoReciclajesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePuntoReciclajeDto: UpdatePuntoReciclajeDto) {
    return this.puntoReciclajesService.update(+id, updatePuntoReciclajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.puntoReciclajesService.remove(+id);
  }
}
