import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioPuntoReciclaje } from "./usuario-punto-reciclaje.entity";

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

    /* @ManyToMany(() => Usuario, (usuario) => usuario.puntosVisitados)
    @JoinTable( {name : 'usuario-punto-reciclaje'} ) 
    usuarios: Usuario[]; */

    @OneToMany(() => UsuarioPuntoReciclaje, (visita) => visita.puntoReciclaje)
    visitas: UsuarioPuntoReciclaje[];


}
