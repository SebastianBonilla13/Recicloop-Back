import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({
  cors: {
    origin: '*', // Permitir conexiones desde cualquier origen
    /* origin: 'http://localhost:4200', */ // Permitir acceso desde esta URL
    /* methods: ['GET', 'POST'],  */// Métodos permitidos
    /* credentials: true, */ // Permitir envío de cookies o credenciales
    transports: ['websocket'],

  },
  
})
export class RecoleccionGateway {

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Gateway inicializado');
  }

  handleConnection(client: any) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Cliente desconectado: ${client.id}`);
  }


  // Emitir evento cuando se inicia una nueva recolección
  emitirNuevaRecoleccion(recoleccion: any) {
    if (!recoleccion || Object.keys(recoleccion).length === 0) {
      console.log('Error: Datos inválidos para nueva recolección:', recoleccion);
      return;
    }
    console.log('Emitiendo nueva recolección:', recoleccion);
    this.server.emit('nuevaRecoleccion', recoleccion);
  }

  // Emitir evento cuando se agrega un nuevo detalle
  emitirNuevoDetalle(detalle: any) {
    if (!detalle || Object.keys(detalle).length === 0) {
      console.error('Error: Datos inválidos para nuevo detalle:', detalle);
      return;
    }
    console.log('Emitiendo nuevo detalle:', detalle);
    this.server.emit('nuevoDetalle', detalle);
  }

  // Emitir evento cuando se finaliza una recolección
  emitirFinalizarRecoleccion(recoleccion: any) {
    if (!recoleccion || Object.keys(recoleccion).length === 0) {
      console.error('Error: Datos inválidos para finalizar recolección:', recoleccion);
      return;
    }
    console.log('Emitiendo finalizar recolección:', recoleccion);
    this.server.emit('finalizarRecoleccion', recoleccion);
  }


}
