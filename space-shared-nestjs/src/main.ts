import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
        .setTitle('Nest.js first app')
        .setDescription('This is my first steps in Nest.js')
        .addBearerAuth()
        .setVersion('1.0')
        .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();