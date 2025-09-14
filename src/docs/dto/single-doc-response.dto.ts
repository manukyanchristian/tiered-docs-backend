import { ApiProperty } from '@nestjs/swagger';
import { DocResponseDto } from './doc-response.dto';

export class SingleDocResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Document retrieved successfully' })
  message: string;

  @ApiProperty({ type: DocResponseDto })
  data: DocResponseDto;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/docs/507f1f77bcf86cd799439011' })
  path: string;

  @ApiProperty({ example: 'GET' })
  method: string;

  @ApiProperty({ example: 200 })
  statusCode: number;
}
