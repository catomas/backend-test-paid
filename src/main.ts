import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: [
      "http://localhost:3001",
      "https://test-paid-e0ea7a7b42f0.herokuapp.com",
      "https://frontend-test-paid.vercel.app",
    ], // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
