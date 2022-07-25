import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import Film from './Film'

export default class Genre extends Model<Genre> {
  @Column
  name!: string

  @Column
  image!: Buffer

  @HasMany(() => Film)
  @Column
  films!: Film[]
}