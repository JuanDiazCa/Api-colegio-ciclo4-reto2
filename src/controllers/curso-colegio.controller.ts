import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Colegio, Curso
} from '../models';
import {CursoRepository} from '../repositories';

export class CursoColegioController {
  constructor(
    @repository(CursoRepository)
    public cursoRepository: CursoRepository,
  ) { }

  @get('/cursos/{id}/colegio', {
    responses: {
      '200': {
        description: 'Colegio belonging to Curso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Colegio)},
          },
        },
      },
    },
  })
  async getColegio(
    @param.path.string('id') id: typeof Curso.prototype.id,
  ): Promise<Colegio> {
    return this.cursoRepository.colegio(id);
  }
}
