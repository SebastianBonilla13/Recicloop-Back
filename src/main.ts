import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  /* const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); */

  const app = await NestFactory.create(AppModule); // carga raiz (controladores, servicios, etc.). representando la app

  // Prefijo global para organizar rutas
  app.setGlobalPrefix("api/v1");

  // Configuración global de validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // Elimina datos no definidos en DTOs
      forbidNonWhitelisted: true, // Bloquea datos no permitidos
      transform: true,           // Convierte datos al tipo del DTO
    })
  );

  await app.listen(3000);

}
bootstrap();

