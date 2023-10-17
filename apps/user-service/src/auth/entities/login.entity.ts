import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Login object' })
export class Login {
  @Field({ description: 'jwt token' })
  accessToken: string;
}
