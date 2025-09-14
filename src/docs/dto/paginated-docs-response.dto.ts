import { ApiProperty } from '@nestjs/swagger';
import { DocResponseDto } from './doc-response.dto';

class PaginationDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: true })
  hasNext: boolean;

  @ApiProperty({ example: false })
  hasPrev: boolean;
}

export class PaginatedDocsResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Documents retrieved successfully' })
  message: string;

  @ApiProperty({ type: [DocResponseDto] })
  data: DocResponseDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/docs' })
  path: string;

  @ApiProperty({ example: 'GET' })
  method: string;

  @ApiProperty({ example: 200 })
  statusCode: number;
}
