import {Entity, model, property, hasMany} from '@loopback/repository';
import {Materia} from './materia.model';

@model()
export class Profesor extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => Materia)
  materias: Materia[];

  constructor(data?: Partial<Profesor>) {
    super(data);
  }
}

export interface ProfesorRelations {
  // describe navigational properties here
}

export type ProfesorWithRelations = Profesor & ProfesorRelations;
