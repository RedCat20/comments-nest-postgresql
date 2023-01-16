import {Injectable} from '@nestjs/common';
import {Comment} from './comment.model';
import {CreateCommentDto} from "./dto/create.comment.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepository) {}

    async createComment(dto: CreateCommentDto)  {
        console.log('dto: ', dto);
        let comment = await this.commentRepository.create(dto);
        return comment;
    }

    async updateComment(dto: CreateCommentDto, id)  {
        console.log('dto: ', dto);
        let comment = await this.commentRepository.update(dto, {
            where: { id: id },
            returning: true,
            plain: true
        });

        return comment;
    }

    async getAllComments(page) {
        let limit = 25
        let offset = 0 + (page - 1) * limit;

        const comments = await this.commentRepository.findAndCountAll(
            {
                include: {all: true},
                order: [
                    ['createdAt', 'DESC'],
                    // ['name', 'ASC'],
                ],
                //offset: offset,
                //limit: 25
            }
        );
        return comments;
    }

    async getOneComment(id: string) {
        return await this.commentRepository.findOne({ where: { id: id } });
    }

}
