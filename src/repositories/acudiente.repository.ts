import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Acudiente, AcudienteRelations, Estudiante} from '../models';
import {EstudianteRepository} from './estudiante.repository';

export class AcudienteRepository extends DefaultCrudRepository<
  Acudiente,
  typeof Acudiente.prototype.id,
  AcudienteRelations
> {

  public readonly estudiante: BelongsToAccessor<Estudiante, typeof Acudiente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Acudiente, dataSource);
    this.estudiante = this.createBelongsToAccessorFor('estudiante', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
  }
}
