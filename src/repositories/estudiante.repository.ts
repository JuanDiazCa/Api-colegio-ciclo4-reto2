import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Curso, Acudiente} from '../models';
import {CursoRepository} from './curso.repository';
import {AcudienteRepository} from './acudiente.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.id,
  EstudianteRelations
> {

  public readonly curso: BelongsToAccessor<Curso, typeof Estudiante.prototype.id>;

  public readonly acudientes: HasManyRepositoryFactory<Acudiente, typeof Estudiante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CursoRepository') protected cursoRepositoryGetter: Getter<CursoRepository>, @repository.getter('AcudienteRepository') protected acudienteRepositoryGetter: Getter<AcudienteRepository>,
  ) {
    super(Estudiante, dataSource);
    this.acudientes = this.createHasManyRepositoryFactoryFor('acudientes', acudienteRepositoryGetter,);
    this.registerInclusionResolver('acudientes', this.acudientes.inclusionResolver);
    this.curso = this.createBelongsToAccessorFor('curso', cursoRepositoryGetter,);
    this.registerInclusionResolver('curso', this.curso.inclusionResolver);
  }
}
