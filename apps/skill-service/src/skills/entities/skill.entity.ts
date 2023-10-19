import { BaseModel } from '@app/database';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;

@ObjectType({ description: 'Skill object' })
@Directive('@key(fields: "id")')
@Schema({ versionKey: false, timestamps: true, collection: 'skills' })
export class Skill extends BaseModel {
  @Field({ description: 'name of skill' })
  @Prop({ required: true, unique: true })
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
