import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocStatus } from '@/docs/enums/doc-status.enum';

export type DocDocument = Doc & Document;

@Schema({ timestamps: true })
export class Doc {
  _id: string;

  @Prop({ required: true, trim: true, maxlength: 200 })
  title: string;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({
    type: String,
    enum: DocStatus,
    default: DocStatus.DRAFT,
    index: true,
  })
  status: DocStatus;

  @Prop({ required: true, trim: true })
  authorId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const DocSchema = SchemaFactory.createForClass(Doc);

// Add indexes for better query performance
DocSchema.index({ status: 1 });
DocSchema.index({ title: 'text', content: 'text' });
DocSchema.index({ authorId: 1 });
DocSchema.index({ createdAt: -1 });
