import { Directive, Field, ObjectType } from "@nestjs/graphql";
import { Employee } from "./employee.entity";


@ObjectType()
@Directive('@extends') // coming from somewhere else
@Directive('@key(fields: "id" )') // telling federation that can get project by passing id
export class Project{

    @Field()
    @Directive('@external')
    id:string

    @Field((type)=>[Employee])    
    employees:Employee[]



}