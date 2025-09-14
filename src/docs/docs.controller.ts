import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { DocsService } from './docs.service';
import {
  CreateDocDto,
  UpdateDocDto,
  QueryDocsDto,
  PaginatedDocsResponseDto,
  SingleDocResponseDto,
} from './dto';
import { ResponseService } from '@/common/services/response.service';
import { Request } from 'express';

@ApiTags('docs')
@Controller('docs')
export class DocsController {
  constructor(
    private readonly docsService: DocsService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document' })
  @ApiBody({ type: CreateDocDto })
  @ApiResponse({
    status: 201,
    description: 'Document created successfully',
    type: SingleDocResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async create(@Body() createDocDto: CreateDocDto, @Req() req: Request) {
    const doc = await this.docsService.create(createDocDto);
    return this.responseService.success(
      doc,
      'Document created successfully',
      req,
      HttpStatus.CREATED,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents with pagination and filtering' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['draft', 'published', 'archived'],
  })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Search query for title and content',
  })
  @ApiResponse({
    status: 200,
    description: 'Documents retrieved successfully',
    type: PaginatedDocsResponseDto,
  })
  async findAll(@Query() queryDto: QueryDocsDto, @Req() req: Request) {
    const result = await this.docsService.findAll(queryDto);
    return this.responseService.paginated(
      result.items,
      'Documents retrieved successfully',
      req,
      result.page,
      result.limit,
      result.total,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by ID' })
  @ApiParam({
    name: 'id',
    description: 'Document ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Document retrieved successfully',
    type: SingleDocResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Document not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid document ID format',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const doc = await this.docsService.findOne(id);
    return this.responseService.success(
      doc,
      'Document retrieved successfully',
      req,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document by ID' })
  @ApiParam({
    name: 'id',
    description: 'Document ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateDocDto })
  @ApiResponse({
    status: 200,
    description: 'Document updated successfully',
    type: SingleDocResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Document not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed or invalid ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDocDto: UpdateDocDto,
    @Req() req: Request,
  ) {
    const doc = await this.docsService.update(id, updateDocDto);
    return this.responseService.success(
      doc,
      'Document updated successfully',
      req,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Soft delete a document by ID (set status to archived)',
  })
  @ApiParam({
    name: 'id',
    description: 'Document ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Document soft deleted successfully',
    type: SingleDocResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Document not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid document ID format',
  })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const doc = await this.docsService.remove(id);
    return this.responseService.success(
      doc,
      'Document soft deleted successfully',
      req,
    );
  }
}
