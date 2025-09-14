import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { DocsRepository } from './repositories/docs.repository';
import { Doc, DocSchema } from './schemas/doc.schema';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }]),
    CommonModule,
  ],
  controllers: [DocsController],
  providers: [DocsService, DocsRepository],
  exports: [DocsService, DocsRepository],
})
export class DocsModule {}
