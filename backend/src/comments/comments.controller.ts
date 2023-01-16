import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post, Req,
    Res,
} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create.comment.dto";
import {diskStorage} from "multer";
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

    @Get('download')
    download(@Res() res) {
        const fieldName = 'adaptives.rar'; /// тепер скачується норм файл з норм назвою, але тестити треба в браузері
        res.setHeader('Content-Type', 'application/octet-stream');
        res.attachment(fieldName);

        return res.sendFile("d:\\" + fieldName)
    }

    @Patch('/:id')
    update(@Body() commentDto: CreateCommentDto, @Param('id') id: number) {
        return this.commentsService.updateComment(commentDto, id)
    }

    @Post()
    create(@Body() commentDto: CreateCommentDto) {
        return this.commentsService.createComment(commentDto)
    }

    @Get()
    getAll(@Req() request: Request & {params: any, query: any}) {
        const page = request.query.page;
        const comments = this.commentsService.getAllComments(page);
        console.log('comments: ', comments)
        return comments;
    }

    @Get('/:id')
    getOne(@Param('id') id) {
        return this.commentsService.getOneComment(id)
    }

}
