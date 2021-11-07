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
import {Acudiente} from '../models';
import {AcudienteRepository} from '../repositories';

export class AcudienteController {
  constructor(
    @repository(AcudienteRepository)
    public acudienteRepository : AcudienteRepository,
  ) {}

  @post('/acudientes')
  @response(200, {
    description: 'Acudiente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Acudiente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acudiente, {
            title: 'NewAcudiente',
            exclude: ['id'],
          }),
        },
      },
    })
    acudiente: Omit<Acudiente, 'id'>,
  ): Promise<Acudiente> {
    return this.acudienteRepository.create(acudiente);
  }

  @get('/acudientes/count')
  @response(200, {
    description: 'Acudiente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Acudiente) where?: Where<Acudiente>,
  ): Promise<Count> {
    return this.acudienteRepository.count(where);
  }

  @get('/acudientes')
  @response(200, {
    description: 'Array of Acudiente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Acudiente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Acudiente) filter?: Filter<Acudiente>,
  ): Promise<Acudiente[]> {
    return this.acudienteRepository.find(filter);
  }

  @patch('/acudientes')
  @response(200, {
    description: 'Acudiente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acudiente, {partial: true}),
        },
      },
    })
    acudiente: Acudiente,
    @param.where(Acudiente) where?: Where<Acudiente>,
  ): Promise<Count> {
    return this.acudienteRepository.updateAll(acudiente, where);
  }

  @get('/acudientes/{id}')
  @response(200, {
    description: 'Acudiente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Acudiente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Acudiente, {exclude: 'where'}) filter?: FilterExcludingWhere<Acudiente>
  ): Promise<Acudiente> {
    return this.acudienteRepository.findById(id, filter);
  }

  @patch('/acudientes/{id}')
  @response(204, {
    description: 'Acudiente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Acudiente, {partial: true}),
        },
      },
    })
    acudiente: Acudiente,
  ): Promise<void> {
    await this.acudienteRepository.updateById(id, acudiente);
  }

  @put('/acudientes/{id}')
  @response(204, {
    description: 'Acudiente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() acudiente: Acudiente,
  ): Promise<void> {
    await this.acudienteRepository.replaceById(id, acudiente);
  }

  @del('/acudientes/{id}')
  @response(204, {
    description: 'Acudiente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.acudienteRepository.deleteById(id);
  }
}
