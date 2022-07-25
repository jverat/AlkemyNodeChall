import { Table, Column, Model, BelongsToMany, Is } from 'sequelize-typescript';
import Featuring from './Featuring';
import Character from './Character';

@Table
export default class Film extends Model<Film> {
  @Column
  title!: string;

  @Column
  image!: BufferConstructor;

  @Column
  release!: Date;

  @Is((rating) => { rating >= 1 || rating <= 5})
  @Column
  rating!: number;

  @BelongsToMany(() => Character, () => Featuring)
  characters!: Character[];
}
