import { IsString } from 'class-validator';
import { UserRO } from 'src/user/user.dto';

export class IdeaDTO {
  @IsString()
  idea: string;

  @IsString()
  description: string;
}

export class IdeaRO {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  idea: string;
  description: string;
  author: UserRO;
}
