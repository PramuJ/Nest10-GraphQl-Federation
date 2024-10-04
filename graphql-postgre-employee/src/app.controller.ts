import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomInterceptors } from './utilities/Interceptors/custom.interceptor';

@Controller()

export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  
  getHello(): string {
    return this.appService.getHello();
  }
}
