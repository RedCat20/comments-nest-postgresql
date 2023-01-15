import {Injectable} from '@nestjs/common';
import {Comment} from './comment.model';
import {CreateCommentDto} from "./dto/create.comment.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class CommentsService {

    // constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}
    constructor(@InjectModel(Comment) private commentRepository) {}

    async createComment(dto: CreateCommentDto)  {
        console.log('dto: ', dto);
        let comment = await this.commentRepository.create(dto);
        // await comment.set('answers', [1,2]); /// $set не робить, просто set не записує в базу
        //return this.commentRepository.save(comment);
        return comment;
    }

    async updateComment(dto: CreateCommentDto, id)  {
        console.log('dto: ', dto);
        let comment = await this.commentRepository.update(dto, {
            where: { id: id },
            returning: true,
            plain: true
        });

        // await comment.set('answers', [1,2]); /// $set не робить, просто set не записує в базу

        //return this.commentRepository.save(comment);
        return comment;
    }

    async getAllComments(page) {
        // return await this.commentRepository.findAll();
        // const comments = await this.commentRepository.findAll(
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
        /// console.log('comments: ', comments)
        /// щоб підтягувалися всі поля пов'язані з цим, наприклад ролі юзера
        return comments;
    }

    async getOneComment(id: string) {
        //console.log('id: ', id)

        //this.usersRepository.query('SELECT * FROM "users" WHERE id = 258')

        //return await this.commentRepository.findOne({id: id});
        return await this.commentRepository.findOne({ where: { id: id } });
    }

}
