import { Module } from '@nestjs/common';
import { DetalleRecoleccionService } from './detalle-recoleccion.service';
import { DetalleRecoleccionController } from './detalle-recoleccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleRecoleccion } from './entities/detalle-recoleccion.entity';

@Module({
  controllers: [DetalleRecoleccionController],
  providers: [DetalleRecoleccionService],
  imports: [TypeOrmModule.forFeature([DetalleRecoleccion])],
})
export class DetalleRecoleccionModule {}
