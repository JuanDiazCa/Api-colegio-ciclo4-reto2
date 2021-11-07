import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Materia, MateriaRelations, Profesor, Curso} from '../models';
import {ProfesorRepository} from './profesor.repository';
import {CursoRepository} from './curso.repository';

export class MateriaRepository extends DefaultCrudRepository<
  Materia,
  typeof Materia.prototype.id,
  MateriaRelations
> {

  public readonly profesor: BelongsToAccessor<Profesor, typeof Materia.prototype.id>;

  public readonly curso: BelongsToAccessor<Curso, typeof Materia.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProfesorRepository') protected profesorRepositoryGetter: Getter<ProfesorRepository>, @repository.getter('CursoRepository') protected cursoRepositoryGetter: Getter<CursoRepository>,
  ) {
    super(Materia, dataSource);
    this.curso = this.createBelongsToAccessorFor('curso', cursoRepositoryGetter,);
    this.registerInclusionResolver('curso', this.curso.inclusionResolver);
    this.profesor = this.createBelongsToAccessorFor('profesor', profesorRepositoryGetter,);
    this.registerInclusionResolver('profesor', this.profesor.inclusionResolver);
  }
}
