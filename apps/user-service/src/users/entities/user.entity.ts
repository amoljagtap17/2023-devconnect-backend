import { BaseModel } from '@app/database';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType({ description: 'User object' })
@Directive('@key(fields: "id")')
@Schema()
export class User extends BaseModel {
  @Field({ description: 'email of user' })
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ description: 'password of user' })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
