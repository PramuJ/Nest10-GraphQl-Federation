import { CreateEmployeeInput } from './create-employee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  
  @Field()
  id:string

  @Field()
  firstName: string
  
  @Field()
  lastName: string
  
  @Field()
  designation: string

  @Field({nullable: true})
  city: string

  @Field()
  projectId:string

  @Field()
  locationId:string
}
