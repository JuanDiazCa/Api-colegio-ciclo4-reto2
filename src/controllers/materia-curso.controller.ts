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
  Curso,
} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaCursoController {
  constructor(
    @repository(MateriaRepository)
    public materiaRepository: MateriaRepository,
  ) { }

  @get('/materias/{id}/curso', {
    responses: {
      '200': {
        description: 'Curso belonging to Materia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Curso)},
          },
        },
      },
    },
  })
  async getCurso(
    @param.path.string('id') id: typeof Materia.prototype.id,
  ): Promise<Curso> {
    return this.materiaRepository.curso(id);
  }
}
