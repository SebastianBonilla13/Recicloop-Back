import { IsEmpty } from "class-validator";
/* import { PuntoReciclaje } from "src/punto-reciclajes/entities/punto-reciclaje.entity"; */
import { PuntoReciclaje } from "../../punto-reciclajes/entities/punto-reciclaje.entity";
import { Column, DeleteDateColumn, Entity, IsNull, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
/* import { UsuarioPuntoReciclaje } from "src/punto-reciclajes/entities/usuario-punto-reciclaje.entity"; */
import { Recoleccion } from "src/recoleccion/entities/recoleccion.entity";

@Entity('usuario')
export class Usuario {

    /* @Column({ primary: true, generated: true })
    id: number; */
    
    @PrimaryColumn() // Cambiado para definir correctamente la clave primaria
    id: number;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column({ default: 0 }) 
    ecoPoints: number;
    
    @DeleteDateColumn()
    deletedAt?: Date; // Columna para eliminaciones suaves

    /* @OneToMany(() => UsuarioPuntoReciclaje, (visita) => visita.usuario)
    visitas: UsuarioPuntoReciclaje[]; */

    @OneToMany(() => Recoleccion, (recoleccion) => recoleccion.usuario)
    recolecciones: Recoleccion[];



}
