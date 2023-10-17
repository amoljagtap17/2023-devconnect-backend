import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { Login } from './entities/login.entity';
import { Register } from './entities/register.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Register)
  register(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.register(signUpInput);
  }

  @Public()
  @Mutation(() => Login)
  @UseGuards(LocalAuthGuard)
  login(@Args('signInInput') signInInput: SignInInput, @Context() ctx: any) {
    return this.authService.login(ctx.req.user);
  }
}
