import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true, description: 'base model properties' })
export abstract class BaseModel {
  @Field(() => ID, { description: 'ID of model' })
  id: string;

  @Field(() => Date, {
    description: 'Date and time when the object was created',
  })
  createdAt: Date;

  @Field(() => Date, {
    description: 'Date and time when the object was last updated',
  })
  updatedAt: Date;
}
