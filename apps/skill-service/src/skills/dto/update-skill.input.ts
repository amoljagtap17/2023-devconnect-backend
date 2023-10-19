import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSkillInput } from './create-skill.input';

@InputType({ description: 'update skill input' })
export class UpdateSkillInput extends PartialType(CreateSkillInput) {}
