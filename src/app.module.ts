import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuntoReciclajesModule } from './punto-reciclajes/punto-reciclajes.module';
import { RecoleccionModule } from './recoleccion/recoleccion.module';

@Module({
  imports: [
    UsuariosModule,
    PuntoReciclajesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'recicloop_db',
      /* entities: [], */
      autoLoadEntities: true, // Carga automáticamente las entidades
      synchronize: true,  // desactivadas para usar migraciones
      /* dropSchema: true, */  // Elimina y recrea el esquema
      /* logging: true,  */


      /* migrations: ['src/migrations/*.js'], */ // Ruta a las migraciones
      /* migrationsRun: true, */ // Ejecuta automáticamente las migraciones
      /* migrationsTableName: "custom_migration_table", */
    }),
    RecoleccionModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
