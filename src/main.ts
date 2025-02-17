import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions';

async function bootstrap() {

  const logger = new Logger('Main-Gateway')
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  ); 

  app.useGlobalFilters(
    new RpcCustomExceptionFilter()
  )

  await app.listen( envs.port);

  console.log('segundo cambio de prueba en submodulo')
  

  logger.log(` App running on por ${envs.port} `)
}
bootstrap();
