import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Profesor} from './profesor.model';
import {Curso} from './curso.model';

@model()
export class Materia extends Entity {
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
  descripcion: string;

  @belongsTo(() => Profesor)
  profesorId: string;

  @belongsTo(() => Curso)
  cursoId: string;

  constructor(data?: Partial<Materia>) {
    super(data);
  }
}

export interface MateriaRelations {
  // describe navigational properties here
}

export type MateriaWithRelations = Materia & MateriaRelations;
