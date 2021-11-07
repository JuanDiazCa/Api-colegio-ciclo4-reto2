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
  Profesor,
  Materia,
} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorMateriaController {
  constructor(
    @repository(ProfesorRepository) protected profesorRepository: ProfesorRepository,
  ) { }

  @get('/profesors/{id}/materias', {
    responses: {
      '200': {
        description: 'Array of Profesor has many Materia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Materia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Materia>,
  ): Promise<Materia[]> {
    return this.profesorRepository.materias(id).find(filter);
  }

  @post('/profesors/{id}/materias', {
    responses: {
      '200': {
        description: 'Profesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Materia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Profesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {
            title: 'NewMateriaInProfesor',
            exclude: ['id'],
            optional: ['profesorId']
          }),
        },
      },
    }) materia: Omit<Materia, 'id'>,
  ): Promise<Materia> {
    return this.profesorRepository.materias(id).create(materia);
  }

  @patch('/profesors/{id}/materias', {
    responses: {
      '200': {
        description: 'Profesor.Materia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {partial: true}),
        },
      },
    })
    materia: Partial<Materia>,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.profesorRepository.materias(id).patch(materia, where);
  }

  @del('/profesors/{id}/materias', {
    responses: {
      '200': {
        description: 'Profesor.Materia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.profesorRepository.materias(id).delete(where);
  }
}
