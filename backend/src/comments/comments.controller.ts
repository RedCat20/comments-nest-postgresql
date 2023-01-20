import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create.comment.dto";
import { diskStorage } from "multer";
import path from "path";
const { uuid } = require('uuidv4');

export const storage = {storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`)
    }
})};

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) { }

    // @Get('download')
    // download(@Res() res) {
    //     const fieldName = 'adaptives.rar'; /// тепер скачується норм файл з норм назвою, але тестити треба в браузері
    //     res.setHeader('Content-Type', 'application/octet-stream');
    //     res.attachment(fieldName);
    //
    //     return res.sendFile("d:\\" + fieldName)
    // }

    @Post()
    create(@Body() commentDto: CreateCommentDto) {
        return this.commentsService.createComment(commentDto)
    }

    @Patch('/:id')
    update(@Body() commentDto: CreateCommentDto, @Param('id') id: number) {
        return this.commentsService.updateComment(commentDto, id)
    }

    @Get()
    getAll(@Req() request: Request & {params: any, query: any}) {
        //const page = request.query.page;
        //const comments = this.commentsService.getAllComments(page);
        const comments = this.commentsService.getAllComments();
        // console.log('comments: ', comments)

        // @ts-ignore
        //const commentsWithCategories = this.commentsService.getSubCategoriesRecursive(comments.rows);
        //console.log('commentsWithCategories: ', commentsWithCategories)

        return comments;
    }

    @Get('/all')
    getMain(@Req() request: Request & {params: any, query: any}) {
        const page = request.query.page;
        const sort = request.query.sort;
        console.log('controller sort: ', request.query);
        const comments = this.commentsService.getMainComments(page, sort);
        console.log('comments: ', comments)
        return comments;
    }

    @Get('/:id')
    getOne(@Param('id') id) {
        const comment = this.commentsService.getOneComment(id);
        return comment;
    }

    @Get('/:id/answers')
    getAnswers(@Param('id') id) {
        const answers = this.commentsService.getCommentAnswers(id);
        return answers;
    }

    @Get('/:id/recursive-answers')
    getRecursiveAnswers(@Param('id') id) {
        const answers = this.commentsService.getAnswersRecursive(id);
        return answers;
    }

}
