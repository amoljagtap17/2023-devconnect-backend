import { UserRole } from '../../users/entities/user.entity';

export interface AccessToken {
  sub: string;
  role: UserRole;
}
