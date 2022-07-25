import { Column, Model, ForeignKey } from 'sequelize-typescript';
import Character from './Character';
import Film from './Film';

export default class Featuring extends Model<Featuring> {
  @ForeignKey(() => Character)
  @Column
  characterId!: number;

  @ForeignKey(() => Film)
  @Column
  filmId!: number;
}
