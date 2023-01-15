import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Comment } from './comment.model';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
      SequelizeModule.forFeature([Comment])
  ]
})
export class CommentsModule {}
