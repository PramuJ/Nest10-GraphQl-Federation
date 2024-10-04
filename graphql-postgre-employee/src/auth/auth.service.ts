import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { JwtService } from '@nestjs/jwt';

@Dependencies(EmployeeService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private employeeService : EmployeeService ,
    private jwtService: JwtService

  ) {}

  async signIn(
    id: string, 
    
): Promise<{access_token: string}> {
    const user = await this.employeeService.findOne(id);
    if (user?.id !== id) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.firstName };
    return {access_token: await this.jwtService.signAsync(payload)}
  }
}