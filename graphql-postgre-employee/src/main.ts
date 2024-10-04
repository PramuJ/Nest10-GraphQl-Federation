import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomInterceptors } from './utilities/Interceptors/custom.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(3000);
}
bootstrap();
