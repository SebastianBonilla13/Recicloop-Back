import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  

  /* const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); */

  const app = await NestFactory.create(AppModule); // carga raiz (controladores, servicios, etc.). representando la app


  // Configuración de CORS (Cross-Origin Resource Sharing) Recibir peticiones de otros dominios
  app.enableCors({
    origin: '*',/* 'http://localhost:4200', */ // o '*' para permitir todos los orígenes
    credentials: true, // si usas cookies o autenticación
  });


  // Prefijo global para organizar rutas
  app.setGlobalPrefix("api/v1");

  // Configuración global de validaciones (HTTP)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // Elimina datos no definidos en DTOs
      forbidNonWhitelisted: true, // Bloquea datos no permitidos
      transform: true,           // Convierte datos al tipo del DTO
    })
  );

  // Configurar el cliente MQTT
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883', // Cambia la URL según tu broker MQTT
    },
  });
  
  // Iniciar la aplicación y el microservicio
  await app.startAllMicroservices();


  await app.listen(3000);

}
bootstrap();

