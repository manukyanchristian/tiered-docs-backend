import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import {
  ApiResponse,
  PaginatedResponse,
  ErrorResponse,
} from '@/common/interfaces/api-response.interface';

@Injectable()
export class ResponseService {
  success<T>(
    data: T,
    message: string,
    request: Request,
    statusCode: number = 200,
  ): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method.toUpperCase(),
      statusCode,
    };
  }

  error(
    error: string,
    request: Request,
    statusCode: number = 400,
    details?: unknown,
  ): ErrorResponse {
    return {
      success: false,
      message: 'Operation failed',
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method.toUpperCase(),
      statusCode,
      details,
    };
  }

  paginated<T>(
    data: T[],
    message: string,
    request: Request,
    page: number,
    limit: number,
    total: number,
    statusCode: number = 200,
  ): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method.toUpperCase(),
      statusCode,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}
