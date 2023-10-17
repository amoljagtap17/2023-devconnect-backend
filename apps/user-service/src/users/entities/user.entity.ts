import { BaseModel } from '@app/database';
import {
  Directive,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'allowed roles for user',
});

@ObjectType({ description: 'User object' })
@Directive('@key(fields: "id")')
@Schema({ versionKey: false, timestamps: true, collection: 'users' })
export class User extends BaseModel {
  @Field({ description: 'email of user' })
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ description: 'password of user' })
  @Prop({ required: true })
  password: string;

  @Field((type) => UserRole, {
    description: 'role of user',
    defaultValue: UserRole.USER,
  })
  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  /* @Field({ description: 'refresh token' })
  @Prop({ required: false, default: null })
  refreshToken?: string; */
}

export const UserSchema = SchemaFactory.createForClass(User);
