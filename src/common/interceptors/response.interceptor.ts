import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { ApiResponse } from '@/common/interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;

    return next.handle().pipe(
      map((data) => {
        // If the response is already formatted, return as is
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Format the response
        const response: ApiResponse = {
          success: true,
          message: 'Operation completed successfully',
          data,
          timestamp: new Date().toISOString(),
          path: url,
          method: method.toUpperCase(),
          statusCode: 200,
        };

        return response;
      }),
    );
  }
}
