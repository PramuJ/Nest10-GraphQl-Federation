import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context, Info, Root, CONTEXT } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Project } from './entities/project.entity';
import { Location } from './entities/location.entity';


@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  createEmployee(@Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput) {
    return this.employeeService.create(createEmployeeInput);
  }

  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll(@Context() context , @Info() info ) {
    console.log("-------------------new fetch from employee--------------------")
    // console.log(context)
    console.log(context.req?.headers)
    let query = context.req.body.query
    // console.log(query)
    
    return this.employeeService.findAll(query);
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id') id:string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee)
  updateEmployee(@Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput) {
    return this.employeeService.update(updateEmployeeInput.id, updateEmployeeInput);
  }

  @Mutation(() => Employee)
  removeEmployee(@Args('id') id: string) {
    return this.employeeService.remove(id);
  }

  @ResolveField(()=>Project)
    project(@Parent() employee:Employee){
      return {__typename:"Project", id:employee.projectId}
    }

  @ResolveField(()=>Location)
  location(@Parent() employee:Employee){
      return {__typename:"Location", id:employee.locationId}
    }  
}











































//  const requestedFields = info.fieldNodes[0].selectionSet.selections
    //  .filter((selection) => !selection.selectionSet)
    //  .map((item) => item.name.value);;
  
    //   console.log('fields:', requestedFields); 