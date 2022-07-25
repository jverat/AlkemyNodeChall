import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'
import Featuring from './Featuring'
import Film from './Film'


@Table
export default class Character extends Model<Character> {
  @Column
  name!: string

  @Column
  image!: Buffer

  @Column
  age!: number

  @Column
  weight!: number

  @Column
  story!: string

  @BelongsToMany(() => Film, () => Featuring)
  films!: Film[]
}


