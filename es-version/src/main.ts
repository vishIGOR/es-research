import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppExceptionsFilter } from "./utils/exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useGlobalFilters(new AppExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle("Bank system")
    .setDescription("Simple bank system application with MVC architecture")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/docs", app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
