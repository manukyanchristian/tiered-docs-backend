import { ApiProperty } from '@nestjs/swagger';
import { DocStatus } from '@/docs/enums/doc-status.enum';

export class DocResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the document',
    example: '507f1f77bcf86cd799439011',
  })
  _id: string;

  @ApiProperty({
    description: 'Title of the document',
    example: 'Getting Started with TypeScript',
  })
  title: string;

  @ApiProperty({
    description: 'Content of the document',
    example: 'TypeScript is a strongly typed programming language...',
  })
  content: string;

  @ApiProperty({
    description: 'Status of the document',
    enum: DocStatus,
    example: DocStatus.DRAFT,
  })
  status: DocStatus;

  @ApiProperty({
    description: 'ID of the author who created the document',
    example: '507f1f77bcf86cd799439011',
  })
  authorId: string;

  @ApiProperty({
    description: 'Date when the document was created',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the document was last updated',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}
