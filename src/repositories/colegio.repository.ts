import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Colegio, ColegioRelations, Curso} from '../models';
import {CursoRepository} from './curso.repository';

export class ColegioRepository extends DefaultCrudRepository<
  Colegio,
  typeof Colegio.prototype.id,
  ColegioRelations
> {

  public readonly cursos: HasManyRepositoryFactory<Curso, typeof Colegio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CursoRepository') protected cursoRepositoryGetter: Getter<CursoRepository>,
  ) {
    super(Colegio, dataSource);
    this.cursos = this.createHasManyRepositoryFactoryFor('cursos', cursoRepositoryGetter,);
    this.registerInclusionResolver('cursos', this.cursos.inclusionResolver);
  }
}
