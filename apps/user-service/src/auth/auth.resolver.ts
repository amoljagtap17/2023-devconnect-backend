import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { Auth } from './entities/auth.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  register(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.register(signUpInput);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => Auth)
  login(@Args('signInInput') signInInput: SignInInput, @Context() ctx: any) {
    console.log('login user::', ctx.req.user);
    console.log('login headers::', ctx.req.headers);

    return this.authService.login(ctx.req.user);
  }
}
