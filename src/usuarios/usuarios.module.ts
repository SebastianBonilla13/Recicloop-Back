import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { PuntoReciclaje } from 'src/punto-reciclajes/entities/punto-reciclaje.entity';
/* import { UsuarioPuntoReciclaje } from 'src/punto-reciclajes/entities/usuario-punto-reciclaje.entity'; */
import { Recoleccion } from 'src/recoleccion/entities/recoleccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, PuntoReciclaje /*, UsuarioPuntoReciclaje */, Recoleccion])], // Importa la entidad Usuario  
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
