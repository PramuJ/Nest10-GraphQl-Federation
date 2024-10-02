import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields: "id" )') // telling federation that can get project by passing id
@Entity()
export class Project {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Field()
  @Column()
  name:string

  @Field(()=> Int)
  @Column()  
  code: number

  // @OneToMany(()=>Employee,employee=>employee.project)  
  // @Field(()=>[Employee],{nullable:true})
  // employees:Employee[]
}
