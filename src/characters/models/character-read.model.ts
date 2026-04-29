import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { CharacterVersionRead } from '../../character-versions/models/character-version-read.model';

@Table({ tableName: 'characters', timestamps: true, paranoid: true })
export class CharacterRead extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug!: string;

  @HasMany(() => CharacterVersionRead)
  versions!: CharacterVersionRead[];
}
