import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

  
  async forLocation(id: string) {
    return await this.employeeRepository.find({where: {"locationId": id}})
  }
  async forProject(id: string){
      return await this.employeeRepository.find({where: {"projectId": id}})
  }

  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee> ){}



  async create( employee: CreateEmployeeInput):Promise<Employee> {
    
    let emp = this.employeeRepository.create(employee);
    return this.employeeRepository.save(emp) 


  }

  async findAll(query:any): Promise<Employee[]> {
    // console.log(query)
    const employees = await this.employeeRepository.find({
      // select: requestedFields
    });
    // console.log('new fetch :')
    // console.log(employees); 
    return employees;
  }

  findOne(id: string) {
    return this.employeeRepository.findOne({where:{id:id}})
  }

  update(id: string, updateEmployeeInput: UpdateEmployeeInput) {
    let employee: Employee = this.employeeRepository.create(updateEmployeeInput)
    employee.id = id;
    return this.employeeRepository.save(employee)
  }

  async remove(id: string) {
    let employee = this.findOne(id)
  if (employee) {
      let ret = await this.employeeRepository.delete(id)
      if (ret.affected === 1) {
          return employee;
      }
  }
  throw new NotFoundException(`Record cannot find by id ${id}`)
  }
}
