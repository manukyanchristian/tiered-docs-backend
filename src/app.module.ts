import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationPipe } from '@nestjs/common';

import { HealthController } from '@/health/health.controller';
import { LoggingModule } from '@/logging/logging.module';
import { LoggingInterceptor } from '@/logging/logging.interceptor';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { CommonModule } from '@/common/common.module';
import { DocsModule } from '@/docs/docs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    TerminusModule,
    HttpModule,
    LoggingModule,
    CommonModule,
    DocsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule {}
