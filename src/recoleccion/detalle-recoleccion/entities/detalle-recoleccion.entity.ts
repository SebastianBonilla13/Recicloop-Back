import { Recoleccion } from "src/recoleccion/entities/recoleccion.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('detalle_recoleccion')
export class DetalleRecoleccion {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    recoleccionId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaHora: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    longitudProducto: number;

    @Column({ type: 'int' })
    puntos: number;

    /* @Column({ type: 'decimal', precision: 10, scale: 2 })
    peso: number; */

    @ManyToOne(() => Recoleccion, recoleccion => recoleccion.detalles)
    @JoinColumn({ name: 'recoleccionId' })
    recoleccion: Recoleccion;

}
