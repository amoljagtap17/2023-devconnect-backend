import { Controller, Get } from '@nestjs/common';
import { SkillServiceService } from './skill-service.service';

@Controller()
export class SkillServiceController {
  constructor(private readonly skillServiceService: SkillServiceService) {}

  @Get()
  getHello(): string {
    return this.skillServiceService.getHello();
  }
}
