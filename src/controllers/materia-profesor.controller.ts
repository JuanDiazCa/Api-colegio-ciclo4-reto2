import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Materia,
  Profesor,
} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaProfesorController {
  constructor(
    @repository(MateriaRepository)
    public materiaRepository: MateriaRepository,
  ) { }

  @get('/materias/{id}/profesor', {
    responses: {
      '200': {
        description: 'Profesor belonging to Materia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profesor)},
          },
        },
      },
    },
  })
  async getProfesor(
    @param.path.string('id') id: typeof Materia.prototype.id,
  ): Promise<Profesor> {
    return this.materiaRepository.profesor(id);
  }
}
