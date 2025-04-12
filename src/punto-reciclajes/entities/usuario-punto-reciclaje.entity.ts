import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { PuntoReciclaje } from "../../punto-reciclajes/entities/punto-reciclaje.entity";

@Entity('usuario-punto-reciclaje')
export class UsuarioPuntoReciclaje {

  @PrimaryGeneratedColumn()
  id: number; // ID único para cada registro (visita)

  @Column()
  usuarioId: number;

  @Column()
  puntoReciclajeId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @Column({ type: 'int', default: 0 })
  puntosObtenidos: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.visitas)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(() => PuntoReciclaje, (punto) => punto.visitas)
  @JoinColumn({ name: 'puntoReciclajeId' })
  puntoReciclaje: PuntoReciclaje;
}
