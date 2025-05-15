import { Module } from '@nestjs/common';
import { RecoleccionService } from './recoleccion.service';
import { RecoleccionController } from './recoleccion.controller';
import { DetalleRecoleccionModule } from './detalle-recoleccion/detalle-recoleccion.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recoleccion } from './entities/recoleccion.entity';
import { DetalleRecoleccion } from './detalle-recoleccion/entities/detalle-recoleccion.entity';
import { RecoleccionGateway } from './recoleccion.gateway';

@Module({
  controllers: [RecoleccionController],
  providers: [RecoleccionService, RecoleccionGateway],
  imports: [TypeOrmModule.forFeature([Recoleccion, DetalleRecoleccion])],
  exports: [RecoleccionService], // Para Recoleccion MQTT
})
export class RecoleccionModule {}
