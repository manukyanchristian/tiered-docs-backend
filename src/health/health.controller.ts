import { Controller, Get, Req } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { ResponseService } from '@/common/services/response.service';
import { ApiResponse as ApiResponseInterface } from '@/common/interfaces/api-response.interface';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private responseService: ResponseService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'Operation completed successfully',
        },
        data: { type: 'object' },
        timestamp: { type: 'string' },
        path: { type: 'string' },
        method: { type: 'string' },
        statusCode: { type: 'number' },
      },
    },
  })
  async check(@Req() request: Request): Promise<ApiResponseInterface> {
    const healthData = await this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);

    return this.responseService.success(
      healthData,
      'Health check completed successfully',
      request,
      200,
    );
  }

  @Get('ping')
  @ApiOperation({ summary: 'Simple ping endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Pong response',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'Operation completed successfully',
        },
        data: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'pong' },
            timestamp: { type: 'string' },
          },
        },
        timestamp: { type: 'string' },
        path: { type: 'string' },
        method: { type: 'string' },
        statusCode: { type: 'number' },
      },
    },
  })
  ping(@Req() request: Request): ApiResponseInterface {
    const pingData = {
      message: 'pong',
      timestamp: new Date().toISOString(),
    };

    return this.responseService.success(
      pingData,
      'Ping successful',
      request,
      200,
    );
  }
}
