import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DocStatus } from '@/docs/enums/doc-status.enum';

export class CreateDocDto {
  @ApiProperty({
    description: 'Title of the document',
    example: 'Getting Started with TypeScript',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Content of the document',
    example: 'TypeScript is a strongly typed programming language...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: 'Status of the document',
    enum: DocStatus,
    default: DocStatus.DRAFT,
    example: DocStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(DocStatus)
  status?: DocStatus;

  @ApiProperty({
    description: 'ID of the author who created the document',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  authorId: string;
}
