import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
/* import { UsuarioPuntoReciclaje } from "./usuario-punto-reciclaje.entity"; */
import { Recoleccion } from "src/recoleccion/entities/recoleccion.entity";

@Entity('punto-reciclaje')
export class PuntoReciclaje {

    /* @Column({ primary: true, generated: true })
    id: number; */

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    ubicacion: string;

    @DeleteDateColumn()
    deletedAt?: Date; // Czolumna para eliminaciones suaves

    /* @OneToMany(() => UsuarioPuntoReciclaje, (visita) => visita.puntoReciclaje)
    visitas: UsuarioPuntoReciclaje[]; */

    @OneToMany(() => Recoleccion, (recoleccion) => recoleccion.puntoReciclajeId)
    recolecciones: Recoleccion[];


}
