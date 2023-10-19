import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  findOne(id: string): Promise<Skill> {
    return this.skillModel.findById(id).exec();
  }

  create(createSkillInput: CreateSkillInput): Promise<Skill> {
    return this.skillModel.create(createSkillInput);
  }

  update(id: string, updateSkillInput: UpdateSkillInput): Promise<Skill> {
    return this.skillModel.findByIdAndUpdate(id, updateSkillInput).exec();
  }

  remove(id: string): Promise<Skill> {
    return this.skillModel.findByIdAndDelete(id).exec();
  }
}
