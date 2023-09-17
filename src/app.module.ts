import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AIService } from './services/ai.service';
import { PrismaService } from './services/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './services/auth.service';
import { AIController } from './controllers/ai.controller';
import { AuthController } from './controllers/auth.controller';
import { DataController } from './controllers/data.controller';
import { DataService } from './services/data.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, AIController, AuthController, DataController],
  providers: [
    AIService,
    PrismaService,
    ConfigService,
    AuthService,
    DataService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/', '/api/auth/sign-up', '/api/auth/sign-in')
      .forRoutes('/*');
  }
}
