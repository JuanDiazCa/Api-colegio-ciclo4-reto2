import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Acudiente,
  Estudiante,
} from '../models';
import {AcudienteRepository} from '../repositories';

export class AcudienteEstudianteController {
  constructor(
    @repository(AcudienteRepository)
    public acudienteRepository: AcudienteRepository,
  ) { }

  @get('/acudientes/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Estudiante belonging to Acudiente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async getEstudiante(
    @param.path.string('id') id: typeof Acudiente.prototype.id,
  ): Promise<Estudiante> {
    return this.acudienteRepository.estudiante(id);
  }
}
