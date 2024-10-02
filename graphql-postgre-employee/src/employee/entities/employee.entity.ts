import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';
import { Location } from './location.entity';

@ObjectType()
@Entity()
@Directive('@key(fields: "id" )') // telling federation that can get employee by passing id
export class Employee {


  @Field( { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Field()
  @Column()
  firstName: string
  
  @Field()
  @Column()
  lastName: string
  
  @Field()
  @Column()
  designation: string

  @Field({nullable: true})
  @Column({nullable:true})
  city: string

  // @ManyToOne(()=>Project, project => project.employees)  
  @Field(()=>Project)
  project:Project

  @Field(()=>Location)
  location:Location

  @Column()
  @Field()
  projectId:string

  @Column()
  @Field()
  locationId:string


}
