import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Colegio,
  Curso
} from '../models';
import {ColegioRepository} from '../repositories';

export class ColegioCursoController {
  constructor(
    @repository(ColegioRepository) protected colegioRepository: ColegioRepository,
  ) { }

  @get('/colegios/{id}/cursos', {
    responses: {
      '200': {
        description: 'Array of Colegio has many Curso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Curso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Curso>,
  ): Promise<Curso[]> {
    return this.colegioRepository.cursos(id).find(filter);
  }

  @post('/colegios/{id}/cursos', {
    responses: {
      '200': {
        description: 'Colegio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Curso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colegio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {
            title: 'NewCursoInColegio',
            exclude: ['id'],
            optional: ['colegioId']
          }),
        },
      },
    }) curso: Omit<Curso, 'id'>,
  ): Promise<Curso> {
    return this.colegioRepository.cursos(id).create(curso);
  }

  @patch('/colegios/{id}/cursos', {
    responses: {
      '200': {
        description: 'Colegio.Curso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {partial: true}),
        },
      },
    })
    curso: Partial<Curso>,
    @param.query.object('where', getWhereSchemaFor(Curso)) where?: Where<Curso>,
  ): Promise<Count> {
    return this.colegioRepository.cursos(id).patch(curso, where);
  }

  @del('/colegios/{id}/cursos', {
    responses: {
      '200': {
        description: 'Colegio.Curso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Curso)) where?: Where<Curso>,
  ): Promise<Count> {
    return this.colegioRepository.cursos(id).delete(where);
  }
}
