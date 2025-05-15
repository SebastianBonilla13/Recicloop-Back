import { Module } from '@nestjs/common';
import { RecoleccionModule } from 'src/recoleccion/recoleccion.module';
import { RecoleccionService } from 'src/recoleccion/recoleccion.service';
import { RecoleccionMqttController } from './recoleccion-mqtt.controller';

@Module({
    imports: [RecoleccionModule],
    controllers: [RecoleccionMqttController],
    /* providers: [RecoleccionService], */
})
export class RecoleccionMqttModule {}
