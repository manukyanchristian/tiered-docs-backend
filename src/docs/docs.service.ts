import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  DocsRepository,
  PaginationResult,
} from './repositories/docs.repository';
import { Doc } from './schemas/doc.schema';
import { DocStatus } from '@/docs/enums/doc-status.enum';
import { CreateDocDto, UpdateDocDto, QueryDocsDto } from './dto';
import { LoggerService } from '@/logging';

@Injectable()
export class DocsService {
  constructor(
    private readonly docsRepository: DocsRepository,
    private readonly logger: LoggerService,
  ) {}

  async create(createDocDto: CreateDocDto): Promise<Doc> {
    try {
      const doc = await this.docsRepository.create(createDocDto);

      this.logger.log(`Document created with ID: ${doc._id}`, 'DocsService');
      return doc;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to create document: ${errorMessage}`,
        errorStack,
        'DocsService',
      );
      throw new BadRequestException('Failed to create document');
    }
  }

  async findAll(queryDto: QueryDocsDto): Promise<PaginationResult<Doc>> {
    try {
      const { page = 1, limit = 10, status, q } = queryDto;

      const result = await this.docsRepository.findWithPagination(
        { page, limit },
        { status, q },
      );

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch documents: ${errorMessage}`,
        errorStack,
        'DocsService',
      );
      throw new BadRequestException('Failed to fetch documents');
    }
  }

  async findOne(id: string): Promise<Doc> {
    try {
      const doc = await this.docsRepository.findById(id);

      if (!doc) {
        throw new NotFoundException(`Document with ID ${id} not found`);
      }

      return doc;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch document ${id}: ${errorMessage}`,
        errorStack,
        'DocsService',
      );
      throw new BadRequestException('Failed to fetch document');
    }
  }

  async update(id: string, updateDocDto: UpdateDocDto): Promise<Doc> {
    try {
      const doc = await this.docsRepository.findByIdAndUpdate(
        id,
        { ...updateDocDto, updatedAt: new Date() },
        { new: true, runValidators: true },
      );

      if (!doc) {
        throw new NotFoundException(`Document with ID ${id} not found`);
      }

      this.logger.log(`Document updated with ID: ${id}`, 'DocsService');
      return doc;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to update document ${id}: ${errorMessage}`,
        errorStack,
        'DocsService',
      );
      throw new BadRequestException('Failed to update document');
    }
  }

  async remove(id: string): Promise<Doc> {
    try {
      const doc = await this.docsRepository.softDelete(id);

      if (!doc) {
        throw new NotFoundException(`Document with ID ${id} not found`);
      }

      this.logger.log(
        `Document soft deleted (archived) with ID: ${id}`,
        'DocsService',
      );
      return doc;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to delete document ${id}: ${errorMessage}`,
        errorStack,
        'DocsService',
      );
      throw new BadRequestException('Failed to delete document');
    }
  }

  // Additional business logic methods
  async getStats(): Promise<{
    total: number;
    published: number;
    draft: number;
    archived: number;
  }> {
    try {
      const [published, draft, archived] = await Promise.all([
        this.docsRepository.countByStatus(DocStatus.PUBLISHED),
        this.docsRepository.countByStatus(DocStatus.DRAFT),
        this.docsRepository.countByStatus(DocStatus.ARCHIVED),
      ]);

      const total = published + draft;

      return { total, published, draft, archived };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to get document stats: ${errorMessage}`,
        errorStack,
        'DocsService',
      );
      throw new BadRequestException('Failed to get document stats');
    }
  }

  async getRecentByAuthor(
    authorId: string,
    limit: number = 10,
  ): Promise<Doc[]> {
    try {
      return this.docsRepository.findRecentByAuthor(authorId, limit);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to get recent documents for author ${authorId}: ${errorMessage}`,
        errorStack,
        'DocsService',
      );
      throw new BadRequestException('Failed to get recent documents');
    }
  }

  async searchDocuments(
    searchTerm: string,
    limit: number = 10,
  ): Promise<Doc[]> {
    try {
      return this.docsRepository.searchByText(searchTerm, limit);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to search documents: ${errorMessage}`,
        errorStack,
        'DocsService',
      );
      throw new BadRequestException('Failed to search documents');
    }
  }
}
