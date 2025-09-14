import {
  Injectable,
  LoggerService as NestLoggerService,
  Inject,
} from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  private context?: string;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  setContext(context: string): void {
    this.context = context;
  }

  log(message: string, context?: string, trace?: string): void {
    this.logger.info(message, { context: context || this.context, trace });
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, { context: context || this.context, trace });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, { context: context || this.context });
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(message, { context: context || this.context });
  }

  // Additional convenience methods
  info(
    message: string,
    context?: string,
    meta?: Record<string, unknown>,
  ): void {
    this.logger.info(message, { context: context || this.context, ...meta });
  }

  // Log with structured data
  logWithData(message: string, data: unknown, context?: string): void {
    this.logger.info(message, { context: context || this.context, data });
  }

  // Log performance metrics
  logPerformance(
    operation: string,
    duration: number,
    context?: string,
    meta?: Record<string, unknown>,
  ): void {
    this.logger.info(`Performance: ${operation} took ${duration}ms`, {
      context: context || this.context,
      operation,
      duration,
      ...meta,
    });
  }

  // Log business events
  logEvent(event: string, data: unknown, context?: string): void {
    this.logger.info(`Event: ${event}`, {
      context: context || this.context,
      event,
      data,
    });
  }
}
