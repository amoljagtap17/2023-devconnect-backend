import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Register object' })
export class Register {
  @Field({ description: 'email of user' })
  email: string;
}
