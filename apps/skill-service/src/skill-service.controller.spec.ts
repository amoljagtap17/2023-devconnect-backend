import { Test, TestingModule } from '@nestjs/testing';
import { SkillServiceController } from './skill-service.controller';
import { SkillServiceService } from './skill-service.service';

describe('SkillServiceController', () => {
  let skillServiceController: SkillServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SkillServiceController],
      providers: [SkillServiceService],
    }).compile();

    skillServiceController = app.get<SkillServiceController>(SkillServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(skillServiceController.getHello()).toBe('Hello World!');
    });
  });
});
