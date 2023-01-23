import {Body, Controller, Get, Param, Patch, Post, Req, UsePipes} from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { ICommentDto, ICommentsQuery } from "./interfaces/comment.interfaces";
import {ValidationPipe} from "../pipes/validation.pipe";
import {CreateCommentDto} from "./dto/create.comment.dto";

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) { }

    @Get()
    getComments(@Req() request: Request & {query: ICommentsQuery}) {
        const { page, sort } = request.query;

        return this.commentsService.getMainComments(page, sort);
    }

    @Get('/all')
    getAllComments(@Req() request: Request & {query: ICommentsQuery}) {
        const { page, sort } = request.query;

        return this.commentsService.getAllComments(page, sort);
    }

    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() commentDto: CreateCommentDto) {
        return this.commentsService.createComment(commentDto)
    }

    @Get('/:id')
    getOne(@Param('id') id) {
        return this.commentsService.getOneComment(id);
    }

    @Get('/:id/answers')
    getRecursiveAnswers(@Param('id') id) {
        return this.commentsService.getAnswersRecursive(id);
    }

    @Patch('/:id')
    update(@Body() commentDto: ICommentDto, @Param('id') id: number) {
        return this.commentsService.updateComment(commentDto, id)
    }

}
