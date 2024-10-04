import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [EmployeeModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService]
  
})
export class AuthModule {}
