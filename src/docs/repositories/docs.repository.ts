import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery, QueryOptions, SortOrder } from 'mongoose';
import { Doc, DocDocument } from '@/docs/schemas/doc.schema';
import { DocStatus } from '@/docs/enums/doc-status.enum';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchOptions {
  status?: DocStatus;
  q?: string;
}

@Injectable()
export class DocsRepository {
  constructor(
    @InjectModel(Doc.name) private readonly docModel: Model<DocDocument>,
  ) {}

  async create(createData: Partial<Doc>): Promise<Doc> {
    const doc = new this.docModel(createData);
    return doc.save();
  }

  async findById(id: string): Promise<Doc | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.docModel.findById(id).exec();
  }

  async findByIdAndUpdate(
    id: string,
    updateData: Partial<Doc>,
    options?: QueryOptions<Doc>,
  ): Promise<Doc | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.docModel.findByIdAndUpdate(id, updateData, options).exec();
  }

  async findByIdAndDelete(id: string): Promise<Doc | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.docModel.findByIdAndDelete(id).exec();
  }

  async findWithPagination(
    pagination: PaginationOptions,
    searchOptions: SearchOptions = {},
  ): Promise<PaginationResult<Doc>> {
    const { page, limit } = pagination;
    const { status, q } = searchOptions;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<DocDocument> = {};

    if (status === DocStatus.ARCHIVED) {
      filter.status = DocStatus.ARCHIVED;
    } else if (status) {
      filter.status = status;
    } else {
      filter.status = { $ne: DocStatus.ARCHIVED };
    }

    if (q) {
      filter.$text = { $search: q };
    }

    const sortOptions: Record<string, SortOrder | { $meta: string }> = q
      ? { score: { $meta: 'textScore' } }
      : { createdAt: -1 };

    const [items, total] = await Promise.all([
      this.docModel
        .find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.docModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async countByStatus(status: DocStatus): Promise<number> {
    return this.docModel.countDocuments({ status }).exec();
  }

  async countByAuthor(authorId: string): Promise<number> {
    return this.docModel.countDocuments({ authorId }).exec();
  }

  async findRecentByAuthor(
    authorId: string,
    limit: number = 10,
  ): Promise<Doc[]> {
    return this.docModel
      .find({ authorId, status: { $ne: DocStatus.ARCHIVED } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async findPublished(limit: number = 10): Promise<Doc[]> {
    return this.docModel
      .find({ status: DocStatus.PUBLISHED })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async searchByText(searchTerm: string, limit: number = 10): Promise<Doc[]> {
    return this.docModel
      .find(
        {
          $text: { $search: searchTerm },
          status: { $ne: DocStatus.ARCHIVED },
        },
        { score: { $meta: 'textScore' } },
      )
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .exec();
  }

  async updateStatus(id: string, status: DocStatus): Promise<Doc | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.docModel
      .findByIdAndUpdate(id, { status, updatedAt: new Date() }, { new: true })
      .exec();
  }

  async softDelete(id: string): Promise<Doc | null> {
    return this.updateStatus(id, DocStatus.ARCHIVED);
  }

  async restore(id: string): Promise<Doc | null> {
    return this.updateStatus(id, DocStatus.DRAFT);
  }
}
