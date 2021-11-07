import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Profesor, ProfesorRelations, Materia} from '../models';
import {MateriaRepository} from './materia.repository';

export class ProfesorRepository extends DefaultCrudRepository<
  Profesor,
  typeof Profesor.prototype.id,
  ProfesorRelations
> {

  public readonly materias: HasManyRepositoryFactory<Materia, typeof Profesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>,
  ) {
    super(Profesor, dataSource);
    this.materias = this.createHasManyRepositoryFactoryFor('materias', materiaRepositoryGetter,);
    this.registerInclusionResolver('materias', this.materias.inclusionResolver);
  }
}
