import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  
   const app = await NestFactory.create(AppModule);
  
      // Autoriser ton frontend
  app.enableCors({
    origin: 'http://localhost:3001', // frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // si tu utilises cookies
  });
  
 
 
  await app.listen(process.env.PORT ?? 3000);
   



}
bootstrap();
