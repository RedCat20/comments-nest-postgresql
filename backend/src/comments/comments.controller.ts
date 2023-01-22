import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { ICommentDto, ICommentsQuery } from "./interfaces/comment.interfaces";

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

    @Post()
    create(@Body() commentDto: ICommentDto) {
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
