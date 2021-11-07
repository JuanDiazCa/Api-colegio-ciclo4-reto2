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
  Curso,
  Materia,
} from '../models';
import {CursoRepository} from '../repositories';

export class CursoMateriaController {
  constructor(
    @repository(CursoRepository) protected cursoRepository: CursoRepository,
  ) { }

  @get('/cursos/{id}/materias', {
    responses: {
      '200': {
        description: 'Array of Curso has many Materia',
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
    return this.cursoRepository.materias(id).find(filter);
  }

  @post('/cursos/{id}/materias', {
    responses: {
      '200': {
        description: 'Curso model instance',
        content: {'application/json': {schema: getModelSchemaRef(Materia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Curso.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {
            title: 'NewMateriaInCurso',
            exclude: ['id'],
            optional: ['cursoId']
          }),
        },
      },
    }) materia: Omit<Materia, 'id'>,
  ): Promise<Materia> {
    return this.cursoRepository.materias(id).create(materia);
  }

  @patch('/cursos/{id}/materias', {
    responses: {
      '200': {
        description: 'Curso.Materia PATCH success count',
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
    return this.cursoRepository.materias(id).patch(materia, where);
  }

  @del('/cursos/{id}/materias', {
    responses: {
      '200': {
        description: 'Curso.Materia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.cursoRepository.materias(id).delete(where);
  }
}
