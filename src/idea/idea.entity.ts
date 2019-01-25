import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createdAt: Date;

  @Column('text') idea: string;

  @Column('text') description: string;
}
