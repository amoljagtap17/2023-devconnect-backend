import { Field, InputType, PartialType } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field((type) => UserRole, {
    description: 'role of user',
    defaultValue: UserRole.USER,
    nullable: true,
  })
  role?: UserRole;
}
