import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {

  constructor(@InjectRepository(Location) private locationRepository: Repository<Location>) { }


  create(location: CreateLocationInput):Promise<Location> {
    let loc = this.locationRepository.create(location);
        return this.locationRepository.save(loc)
  }

  findAll(): Promise<Location[]> {
    return this.locationRepository.find()
  }

  findOne(id: string): Promise<Location> {
    return this.locationRepository.findOne({where:{id:id}});
  }

  update(id: string, updateProjectInput: UpdateLocationInput) {
    let loc: Location = this.locationRepository.create(updateProjectInput)
    loc.id = id;
    return this.locationRepository.save(loc)
}
async remove(id: string) {
  let loc = this.findOne(id)
  if (loc) {
      let ret = await this.locationRepository.delete(id)
      if (ret.affected === 1) {
          return loc;
      }
  }
  throw new NotFoundException(`Record cannot find by id ${id}`)
}
}
