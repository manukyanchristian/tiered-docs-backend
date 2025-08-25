import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logLevel: string = configService.get('LOG_LEVEL', 'info');

        return {
          level: logLevel,
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.errors({ stack: true }),
            winston.format.json(),
            winston.format.printf((info) => {
              const { timestamp, level, message, context, trace, ...meta } =
                info;
              let log = `${timestamp as string} [${level.toUpperCase()}]`;

              if (context && typeof context === 'string') {
                log += ` [${context}]`;
              }

              log += ` ${message as string}`;

              if (Object.keys(meta).length > 0) {
                log += ` ${JSON.stringify(meta)}`;
              }

              if (trace && typeof trace === 'string') {
                log += `\n${trace}`;
              }

              return log;
            }),
          ),
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
              ),
            }),
            new winston.transports.File({
              filename: 'logs/error.log',
              level: 'error',
              maxsize: 5242880, // 5MB
              maxFiles: 5,
            }),
            new winston.transports.File({
              filename: 'logs/combined.log',
              maxsize: 5242880, // 5MB
              maxFiles: 5,
            }),
          ],
        };
      },
    }),
  ],
})
export class LoggingModule {}
