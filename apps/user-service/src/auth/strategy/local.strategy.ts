import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRole } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  authenticate(req: any, options?: any) {
    const email = req.body.variables.signInInput.email;
    const password = req.body.variables.signInInput.password;

    super.authenticate({ ...req, body: { email, password } }, options);
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{
    id: string;
    role: UserRole;
  }> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
