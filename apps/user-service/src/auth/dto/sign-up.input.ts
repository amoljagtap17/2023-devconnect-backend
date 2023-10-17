import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field({ description: 'email of user' })
  @IsEmail()
  @IsString()
  email: string;

  @Field({ description: 'password of user' })
  @MinLength(5)
  @IsString()
  password: string;
}
