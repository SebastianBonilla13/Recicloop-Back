import { PuntoReciclaje } from "src/punto-reciclajes/entities/punto-reciclaje.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleRecoleccion } from "../detalle-recoleccion/entities/detalle-recoleccion.entity";

@Entity('recoleccion')
export class Recoleccion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuarioId: number;

    @Column()
    puntoReciclajeId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaInicio: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaFin: Date;

    @Column({ type: 'int', default: 0 })
    numeroBotellas: number;

    @Column({ type: 'int', default: 0 })
    puntosTotales: number;

    @Column({ type: 'boolean', default: false })
    completado: boolean;


    /* @ManyToOne(() => Usuario, (usuario) => usuario.visitas)
    @JoinColumn({ name: 'usuarioId' })
    usuario: Usuario; */


    @ManyToOne(() => Usuario, (usuario) => usuario.recolecciones)
    @JoinColumn({ name: 'usuarioId' })
    usuario: Usuario;

    @ManyToOne(() => PuntoReciclaje, (puntoReciclaje) => puntoReciclaje.recolecciones)
    @JoinColumn({ name: 'puntoReciclajeId' })
    puntoReciclaje: PuntoReciclaje;

    @OneToMany(() => DetalleRecoleccion, detalle => detalle.recoleccion)
    detalles: DetalleRecoleccion[];

}
