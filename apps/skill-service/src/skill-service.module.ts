import { Module } from '@nestjs/common';
import { SkillServiceController } from './skill-service.controller';
import { SkillServiceService } from './skill-service.service';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [SkillsModule],
  controllers: [SkillServiceController],
  providers: [SkillServiceService],
})
export class SkillServiceModule {}
