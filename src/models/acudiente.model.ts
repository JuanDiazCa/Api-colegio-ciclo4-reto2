import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estudiante} from './estudiante.model';

@model()
export class Acudiente extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => Estudiante)
  estudianteId: string;

  constructor(data?: Partial<Acudiente>) {
    super(data);
  }
}

export interface AcudienteRelations {
  // describe navigational properties here
}

export type AcudienteWithRelations = Acudiente & AcudienteRelations;
