import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {

  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>){}

  create(project: CreateProjectInput) : Promise<Project> {
    let proj = this.projectRepository.create(project);
    return this.projectRepository.save(proj);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectRepository.findOne({where: {id:id}})
    //{where:{id:id}}
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    let project: Project = this.projectRepository.create(updateProjectInput)
    project.id = id;
    return this.projectRepository.save(project)
  }

  async remove(id: string) {
    let proj = this.findOne(id)
  if (proj) {
      let ret = await this.projectRepository.delete(id)
      if (ret.affected === 1) {
          return proj;
      }
  }
  throw new NotFoundException(`Record cannot find by id ${id}`)
  }
}
