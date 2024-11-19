import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilitar CORS si necesitas usar herramientas como Postman o Angular
  await app.listen(3000); // Cambia el puerto si es necesario
  console.log('API HTTP corriendo en http://localhost:3000');
}
bootstrap();
