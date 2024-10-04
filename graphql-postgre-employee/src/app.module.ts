import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ApolloDriverConfig, ApolloDriver, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './employee/entities/project.entity';
import { Location } from './employee/entities/location.entity';
import { AuthModule } from './auth/auth.module';
import { CustomInterceptors } from './utilities/Interceptors/custom.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [EmployeeModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      
      buildSchemaOptions:{
        orphanedTypes: [Project,Location]
      }
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'Pramu123',
      database:'nest-graphQL',
      entities:["dist/**/*.entity{.ts,.js}"],
      synchronize:true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomInterceptors,
    }
],
})
export class AppModule {}
