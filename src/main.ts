import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());

  // Pipe for validation
  app.useGlobalPipes(new ValidationPipe());

  // enable CORS
  const corsAllowList = ['http://localhost:8000', 'http://localhost:3000'];

  app.enableCors((req, callback) => {
    type CorsType = {
      origin: boolean;
      credentials: boolean;
    };

    const corsOption: CorsType = {
      origin: false,
      credentials: true,
    };

    if (corsAllowList.indexOf(req.header('Origin')) !== -1) {
      corsOption.origin = true;
    }

    callback(null, corsOption);
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJs Task Management API')
    .setDescription('The task management API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
