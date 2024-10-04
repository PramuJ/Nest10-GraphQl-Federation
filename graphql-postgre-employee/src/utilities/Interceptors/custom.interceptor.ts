import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Next, UseInterceptors } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { map, Observable } from 'rxjs';
import { EmployeeService } from 'src/employee/employee.service';
// import { User } from 'src/app.service';

@Injectable()
export class CustomInterceptors implements NestInterceptor {
 
constructor(private employeeService: EmployeeService) {}
async intercept(context: ExecutionContext, handler: CallHandler): Promise<Observable<any>> {
        console.log("starting the interceptor")
        // Convert the ExecutionContext to a GraphQL context                                              
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        // console.log(request)
        console.log(request.header('authorization'))
        const jwt = new JwtService();
        const secret = 'secret';
 
      const payload = jwt.decode(request?.header('authorization'))
      console.log(payload)
      const employeeDetails = await this.employeeService.findOne(payload.id)
      // console.log(employeeDetails)

      request['employeeId'] = employeeDetails
    

   
   return handler.handle()
 }
}