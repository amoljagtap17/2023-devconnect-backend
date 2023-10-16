import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class EntityNotFoundFilter<T> implements GqlExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);

    console.log('EntityNotFoundFilter', exception);

    return new NotFoundException('Entity not found');
  }
}
