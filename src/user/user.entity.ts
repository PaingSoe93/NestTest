import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
import { type, userInfo } from 'os';
import { IdeaEntity } from 'src/idea/idea.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createdAt: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text') password: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, username, createdAt, token } = this;
    const responseObject: any = { id, username, createdAt };
    if (showToken) {
      responseObject.token = token;
    }
    if (this.ideas) {
      responseObject.ideas = this.ideas;
    }

    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '1d' });
  }
}
