import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import jwtConfig from './config/jwt.config';
import { SignUpInput } from './dto/sign-up.input';
import { HashingService } from './hashing/hashing.service';
import { AccessToken } from './interfaces/access-token.interface';
import { Tokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async register(signUpInput: SignUpInput): Promise<{
    email: string;
  }> {
    const hash = await this.hashingService.hash(signUpInput.password);

    const newUser = await this.usersService.create({
      email: signUpInput.email,
      password: hash,
    });

    return { email: newUser.email };
  }

  async login(user: { id: string; role: UserRole }): Promise<Tokens> {
    const tokens = await this.generateTokens(user);

    // await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  /* async logout(user: { sub: string; role: UserRole }): Promise<boolean> {
    await this.usersService.update(user.sub, { refreshToken: null });

    return true;
  } */

  async validateUser(
    email: string,
    password: string,
  ): Promise<{
    id: string;
    role: UserRole;
  }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const isEqual = await this.hashingService.compare(password, user.password);

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return { id: user.id, role: user.role };
  }

  /* async updateRefreshTokenHash(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.hashingService.hash(refreshToken);

    await this.usersService.update(userId, { refreshToken: hash });
  } */

  async generateTokens(user: { id: string; role: UserRole }): Promise<Tokens> {
    const [accessToken] = await Promise.all([
      this.signToken<Partial<AccessToken>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          role: user.role,
        },
      ),
      // this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      // refreshToken,
    };
  }

  /* async refreshTokens(refreshTokenInput: RefreshTokenInput) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<AccessToken, 'sub'>
      >(refreshTokenInput.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersService.findOne(sub);

      if (!user) {
        throw new UnauthorizedException('User does not exists');
      }

      const token = refreshTokenInput.refreshToken;
      const existingHash = user.refreshToken;

      const isEqual = await this.hashingService.compare(token, existingHash);

      if (!isEqual) {
        throw new UnauthorizedException('Invalid Refresh Token');
      }

      const tokens = await this.generateTokens(user);

      await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

      return tokens;
    } catch (err) {
      throw new UnauthorizedException();
    }
  } */

  private async signToken<T>(
    userId: string,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
