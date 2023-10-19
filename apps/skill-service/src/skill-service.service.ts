import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
