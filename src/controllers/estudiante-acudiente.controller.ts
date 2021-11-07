import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Estudiante,
  Acudiente,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteAcudienteController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/acudientes', {
    responses: {
      '200': {
        description: 'Array of Estudiante has many Acudiente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Acudiente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Acudiente>,
  ): Promise<Acudiente[]> {
    return this.estudianteRepository.acudientes(id).find(filter);
  }

  @post('/estudiantes/{id}/acudientes', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Acudiente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acudiente, {
            title: 'NewAcudienteInEstudiante',
            exclude: ['id'],
            optional: ['estudianteId']
          }),
        },
      },
    }) acudiente: Omit<Acudiente, 'id'>,
  ): Promise<Acudiente> {
    return this.estudianteRepository.acudientes(id).create(acudiente);
  }

  @patch('/estudiantes/{id}/acudientes', {
    responses: {
      '200': {
        description: 'Estudiante.Acudiente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acudiente, {partial: true}),
        },
      },
    })
    acudiente: Partial<Acudiente>,
    @param.query.object('where', getWhereSchemaFor(Acudiente)) where?: Where<Acudiente>,
  ): Promise<Count> {
    return this.estudianteRepository.acudientes(id).patch(acudiente, where);
  }

  @del('/estudiantes/{id}/acudientes', {
    responses: {
      '200': {
        description: 'Estudiante.Acudiente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Acudiente)) where?: Where<Acudiente>,
  ): Promise<Count> {
    return this.estudianteRepository.acudientes(id).delete(where);
  }
}
