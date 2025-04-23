import { Module } from '@nestjs/common';
import { RecoleccionService } from './recoleccion.service';
import { RecoleccionController } from './recoleccion.controller';
import { DetalleRecoleccionModule } from './detalle-recoleccion/detalle-recoleccion.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recoleccion } from './entities/recoleccion.entity';
import { DetalleRecoleccion } from './detalle-recoleccion/entities/detalle-recoleccion.entity';

@Module({
  controllers: [RecoleccionController],
  providers: [RecoleccionService],
  imports: [TypeOrmModule.forFeature([Recoleccion, DetalleRecoleccion])],
})
export class RecoleccionModule {}
