import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Curso, CursoRelations, Colegio, Materia, Estudiante} from '../models';
import {ColegioRepository} from './colegio.repository';
import {MateriaRepository} from './materia.repository';
import {EstudianteRepository} from './estudiante.repository';

export class CursoRepository extends DefaultCrudRepository<
  Curso,
  typeof Curso.prototype.id,
  CursoRelations
> {

  public readonly colegio: BelongsToAccessor<Colegio, typeof Curso.prototype.id>;

  public readonly materias: HasManyRepositoryFactory<Materia, typeof Curso.prototype.id>;

  public readonly estudiantes: HasManyRepositoryFactory<Estudiante, typeof Curso.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ColegioRepository') protected colegioRepositoryGetter: Getter<ColegioRepository>, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Curso, dataSource);
    this.estudiantes = this.createHasManyRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
    this.materias = this.createHasManyRepositoryFactoryFor('materias', materiaRepositoryGetter,);
    this.registerInclusionResolver('materias', this.materias.inclusionResolver);
    this.colegio = this.createBelongsToAccessorFor('colegio', colegioRepositoryGetter,);
    this.registerInclusionResolver('colegio', this.colegio.inclusionResolver);
  }
}
