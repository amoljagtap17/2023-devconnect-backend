import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'create user input' })
export class CreateUserInput {
  @Field({ description: 'email of user' })
  email: string;

  @Field({ description: 'password of user' })
  password: string;
}
