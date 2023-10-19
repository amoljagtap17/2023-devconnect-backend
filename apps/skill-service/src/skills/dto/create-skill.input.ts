import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({ description: 'create skill input' })
export class CreateSkillInput {
  @Field({ description: 'name of skill' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
