import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Estudiante,
  Curso,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteCursoController {
  constructor(
    @repository(EstudianteRepository)
    public estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/curso', {
    responses: {
      '200': {
        description: 'Curso belonging to Estudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Curso)},
          },
        },
      },
    },
  })
  async getCurso(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
  ): Promise<Curso> {
    return this.estudianteRepository.curso(id);
  }
}
