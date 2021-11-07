import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Colegio} from './colegio.model';
import {Materia} from './materia.model';
import {Estudiante} from './estudiante.model';

@model()
export class Curso extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nivel: string;

  @belongsTo(() => Colegio)
  colegioId: string;

  @hasMany(() => Materia)
  materias: Materia[];

  @hasMany(() => Estudiante)
  estudiantes: Estudiante[];

  constructor(data?: Partial<Curso>) {
    super(data);
  }
}

export interface CursoRelations {
  // describe navigational properties here
}

export type CursoWithRelations = Curso & CursoRelations;
