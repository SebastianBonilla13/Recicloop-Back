import { Module } from '@nestjs/common';
import { PuntoReciclajesService } from './punto-reciclajes.service';
import { PuntoReciclajesController } from './punto-reciclajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuntoReciclaje } from './entities/punto-reciclaje.entity';
/* import { UsuarioPuntoReciclaje } from './entities/usuario-punto-reciclaje.entity'; */

@Module({
  imports: [TypeOrmModule.forFeature([PuntoReciclaje, /* UsuarioPuntoReciclaje */])],
  controllers: [PuntoReciclajesController],
  providers: [PuntoReciclajesService],
})
export class PuntoReciclajesModule {}
