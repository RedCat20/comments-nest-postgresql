import { Injectable } from '@nestjs/common';
import { Comment } from './comment.model';
import { CreateCommentDto } from "./dto/create.comment.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepository) {}

    async createComment(dto: CreateCommentDto)  {
        // console.log('dto: ', dto);

        let comment = await this.commentRepository.create(dto);

        return comment;
    }

    async getAnswersRecursive(id) {

        let comment = await this.commentRepository.findOne({
            where: { id: id },
            raw : true
        });

        let answers = await this.commentRepository.findAll({
            where: {
                parentId: comment.id
            },
            raw : true
        });

        if (answers.length > 0) {
            const promises = [];
            answers.forEach(answer => {
                promises.push(this.getSubCategoriesRecursive(answer));
            });
            comment['answers'] = await Promise.all(promises);
        }
        else {
            comment['answers'] = [];
            return comment;
        }

       return comment;

    };


    async getSubCategoriesRecursive(comment) {

        let answers = await this.commentRepository.findAll({
            where: {
                parentId: comment.id
            },
            raw : true
        });

        if (answers.length > 0) {
            const promises = [];
            answers.forEach(answer => {
                promises.push(this.getAnswersRecursive(answer.id));
            });
            comment['answers'] = await Promise.all(promises);
        }
        else {
            comment['answers'] = [];
            return comment;
        }
        return comment;
    };

    async getMainComments(page, sort) {
        let limit = 25
        let offset = 0 + (page - 1) * limit;

        const sortParams = sort.split('_');
        sortParams[1] = sortParams[1].toUpperCase();

        const comments = await this.commentRepository.findAndCountAll(
            {
                where: { parentId: null },
                include: {all: true},
                order: [
                    [sortParams[0], sortParams[1]],
                ],
                offset: offset,
                limit: 25
            }
        );

        if (comments.rows.length === 0) {
            return comments;
        }


        return comments;
    }

    async getOneComment(id: string) {
        return await this.commentRepository.findOne({ where: { id: id } });
    }

    async getAllComments(page, sort) {
        let limit = 25
        let offset = 0 + (page - 1) * limit;

        const sortParams = sort.split('_');
        sortParams[1] = sortParams[1].toUpperCase();

        const comments = await this.commentRepository.findAndCountAll(
            {
                // where: { parentId: null },
                include: {all: true},
                order: [
                    [sortParams[0], sortParams[1]],
                ],
                offset: offset,
                limit: 25
            }
        );
        return comments;
    }

    async updateComment(dto: CreateCommentDto, id)  {
        // console.log('dto: ', dto);

        let comment = await this.commentRepository.update(dto, {
            where: { id: id },
            returning: true,
            plain: true
        });

        return comment;
    }

}
