import { Controller } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, EventPattern, Payload, Transport } from '@nestjs/microservices';
import { CreateDetalleRecoleccionDto } from 'src/recoleccion/detalle-recoleccion/dto/create-detalle-recoleccion.dto';
import { RecoleccionService } from 'src/recoleccion/recoleccion.service';

@Controller('recoleccion-mqtt')
export class RecoleccionMqttController {

    private client: ClientProxy;

    constructor(private readonly recoleccionService: RecoleccionService) {
        this.client = ClientProxyFactory.create({
            transport: Transport.MQTT,
            options: {
                url: 'mqtt://localhost:1883',
            },
        });
    }

    @EventPattern('recoleccion/iniciar')
    async handleIniciarRecoleccion(@Payload() data: { usuarioId: number; puntoReciclajeId: number }) {

        // Validar datos
        if (!data || !data.usuarioId || !data.puntoReciclajeId) {
            console.error('Error: Datos inválidos recibidos:', data);
            throw new Error('Datos inválidos para iniciar recolección');
        }
        console.log('Iniciar recolección (MQTT)', data);

        // Iniciar servicio de recolección
        const nuevaRecoleccion = await this.recoleccionService.iniciarRecoleccion(data.usuarioId, data.puntoReciclajeId);

        /* return { idRecoleccion: nuevaRecoleccion.id } */
        this.client.emit('recoleccion/iniciar/response', { idRecoleccion: nuevaRecoleccion.id });
    }

    @EventPattern('recoleccion/detalle')
    async handleDetalleRecoleccion(@Payload() data: any) {
        console.log('DATAAAAAAAAAA MQTT', data);
        
        // Validar datos
        if (!data || !data.recoleccionId || !data.longitudProducto ) {
            console.error('Error: Datos inválidos recibidos:', data);
            throw new Error('Datos inválidos para agregar detalle de recolección');
        }

        console.log('Agregar detalle de Recolección (MQTT)', data);

        const objRecoleccion = new CreateDetalleRecoleccionDto();
        objRecoleccion.recoleccionId = data.recoleccionId;
        objRecoleccion.longitudProducto = data.longitudProducto;

        // Iniciar servicio detalle de recolección
        const recoleccion = this.recoleccionService.agregarDetalle(objRecoleccion);

        /* return { success: true } */
        this.client.emit('recoleccion/detalle/response', { success: true });
    }
    
    @EventPattern('recoleccion/finalizar')
    async handleFinalizarRecoleccion(@Payload() data: { recoleccionId: number }) {

        // Validar datos
        if (!data || !data.recoleccionId) {
            console.error('Error: Datos inválidos recibidos:', data);
            throw new Error('Datos inválidos para finalizar recolección');
            
        }
        console.log('Finalizar recolección (MQTT)', data);

        // Finalizar servicio de recolección
        await this.recoleccionService.finalizarRecoleccion(data.recoleccionId);

        /* return { success: true } */
        this.client.emit('recoleccion/finalizar/response', { success: true });
    }

}
