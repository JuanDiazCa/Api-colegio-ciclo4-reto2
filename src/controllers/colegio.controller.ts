import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Colegio} from '../models';
import {ColegioRepository} from '../repositories';

export class ColegioController {
  constructor(
    @repository(ColegioRepository)
    public colegioRepository : ColegioRepository,
  ) {}

  @post('/colegios')
  @response(200, {
    description: 'Colegio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Colegio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colegio, {
            title: 'NewColegio',
            exclude: ['id'],
          }),
        },
      },
    })
    colegio: Omit<Colegio, 'id'>,
  ): Promise<Colegio> {
    return this.colegioRepository.create(colegio);
  }

  @get('/colegios/count')
  @response(200, {
    description: 'Colegio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Colegio) where?: Where<Colegio>,
  ): Promise<Count> {
    return this.colegioRepository.count(where);
  }

  @get('/colegios')
  @response(200, {
    description: 'Array of Colegio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Colegio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Colegio) filter?: Filter<Colegio>,
  ): Promise<Colegio[]> {
    return this.colegioRepository.find(filter);
  }

  @patch('/colegios')
  @response(200, {
    description: 'Colegio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colegio, {partial: true}),
        },
      },
    })
    colegio: Colegio,
    @param.where(Colegio) where?: Where<Colegio>,
  ): Promise<Count> {
    return this.colegioRepository.updateAll(colegio, where);
  }

  @get('/colegios/{id}')
  @response(200, {
    description: 'Colegio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Colegio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Colegio, {exclude: 'where'}) filter?: FilterExcludingWhere<Colegio>
  ): Promise<Colegio> {
    return this.colegioRepository.findById(id, filter);
  }

  @patch('/colegios/{id}')
  @response(204, {
    description: 'Colegio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colegio, {partial: true}),
        },
      },
    })
    colegio: Colegio,
  ): Promise<void> {
    await this.colegioRepository.updateById(id, colegio);
  }

  @put('/colegios/{id}')
  @response(204, {
    description: 'Colegio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() colegio: Colegio,
  ): Promise<void> {
    await this.colegioRepository.replaceById(id, colegio);
  }

  @del('/colegios/{id}')
  @response(204, {
    description: 'Colegio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.colegioRepository.deleteById(id);
  }
}
