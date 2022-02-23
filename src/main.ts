import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * To use response interceptor
   */
  app.useGlobalInterceptors(new ResponseInterceptor());
  
  /**
   * To perform validations while giving input
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  /**
   * To configure swagger
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('MedcialConsultancy-Api')
    .setDescription('This application is used to book appointments to consult doctors')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        name: 'header',
        in: 'header',
      },
      'swagger',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('MedcialConsultancy-Api', app, document);
  await app.listen(3000);
}
bootstrap();
