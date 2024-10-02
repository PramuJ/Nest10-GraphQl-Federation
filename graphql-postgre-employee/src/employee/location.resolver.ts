import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { EmployeeService } from "./employee.service";
import { Employee } from "./entities/employee.entity";
import { Location } from "./entities/location.entity";

@Resolver((of)=>Location)
export class LocationResolver{

    constructor(private readonly employeeService:EmployeeService){}

    @ResolveField(()=>[Location])
    employees(@Parent() location:Location):Promise<Employee[]>{
        return this.employeeService.forLocation(location.id)
    }

}