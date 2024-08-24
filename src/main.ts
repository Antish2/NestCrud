import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/Exception/http-exception.filter';
import helmet from 'helmet';
import { PrismaClientExceptionFilter } from './common/Exception/PrismaClientExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );
  app.use(helmet({
    xXssProtection: false,
    contentSecurityPolicy:{
      directives:{
        defaultSrc: ["'self'"],
        scriptSrc:["'self'","'unsafe-inline'"],
        
      },
      
    }
  }));
  const config = new DocumentBuilder()
    .setTitle('Crud Operation')
    .setDescription('The Crud Operation API description')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
