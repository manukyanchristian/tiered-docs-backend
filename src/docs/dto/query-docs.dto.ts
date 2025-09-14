import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DocStatus } from '@/docs/enums/doc-status.enum';

export class QueryDocsDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Filter by document status',
    enum: DocStatus,
    example: DocStatus.PUBLISHED,
  })
  @IsOptional()
  @IsEnum(DocStatus)
  status?: DocStatus;

  @ApiPropertyOptional({
    description: 'Search query for title and content',
    example: 'typescript tutorial',
  })
  @IsOptional()
  @IsString()
  q?: string;
}
