import {Entity, hasMany, model, property} from '@loopback/repository';
import {Curso} from './curso.model';

@model()
export class Colegio extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_registro: string;

  @hasMany(() => Curso)
  cursos: Curso[];

  constructor(data?: Partial<Colegio>) {
    super(data);
  }
}

export interface ColegioRelations {
  // describe navigational properties here
}

export type ColegioWithRelations = Colegio & ColegioRelations;
