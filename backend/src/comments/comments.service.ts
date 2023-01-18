import {Injectable} from '@nestjs/common';
import {Comment} from './comment.model';
import {CreateCommentDto} from "./dto/create.comment.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepository) {}

    async createComment(dto: CreateCommentDto)  {
        // console.log('dto: ', dto);
        let comment = await this.commentRepository.create(dto);
        return comment;
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

    async getSubCategoriesRecursive(category) {
        // let subCategories = await this.commentRepository.findAll({
        //     where: {
        //         parentId: null
        //     },
        //     raw : true
        // });
        //
        // //if (subCategories.length > 0) {
        // //     const promises = [];
        // //    subCategories.forEach(category => {
        // //        promises.push(this.getSubCategoriesRecursive(category));
        // //    });
        // //     category['subCategories'] = await Promise.all(promises);
        // // }
        // // else
        //
        // category['answers'] = [];
        return category;
    };

    //async getAllComments(page) {
    async getAllComments() {
        //let limit = 25
        //let offset = 0 + (page - 1) * limit;

        const comments = await this.commentRepository.findAndCountAll(
            {
                include: { all: true},
                order: [
                    ['createdAt', 'DESC'],
                ],
                //offset: offset,
                //limit: 25
            }
        );

        return comments;
    }

    async getMainComments(page, sort) {
        let limit = 25
        let offset = 0 + (page - 1) * limit;

        const sortParams = sort.split('_');
        sortParams[1] = sortParams[1].toUpperCase()

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
        return comments;
    }

    async getOneComment(id: string) {
        return await this.commentRepository.findOne({ where: { id: id } });
    }

    async jsonParse(comment: any) {
        console.log('111111 comment', comment)
        let parsed = await JSON.parse(JSON.stringify(comment));
        return parsed;
    }
}
