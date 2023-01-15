import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post, Req,
    Res,
    UploadedFile,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create.comment.dto";
import {FormDataRequest} from "nestjs-form-data";
import {AnyFilesInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {createWriteStream} from "fs";
import {diskStorage} from "multer";
import path from "path";
import {Observable, of} from "rxjs";
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

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@UploadedFile() file: Express.Multer.File) {
    //     console.log(file);
    // }

    @Get('download')
    download(@Res() res) {
        // const fieldName = 'flowers.jpg';
        // return res.download("d:\\" + fieldName)

        // const fieldName = 'adaptives.rar'; /// скачається просто якийсь невідомий файл, треба дописати його розширення і буде працювати
        // return res.sendFile("d:\\" + fieldName)

        const fieldName = 'adaptives.rar'; /// тепер скачується норм файл з норм назвою, але тестити треба в браузері
        res.setHeader('Content-Type', 'application/octet-stream');
        res.attachment(fieldName);

        return res.sendFile("d:\\" + fieldName)
    }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('image'))
    // async uploadedFile(@UploadedFile() file) {
    // console.log('file: ', file)
    // const response = {
    //    originalname: file.originalname,
    //    filename: file.filename,
    // };
    // return response;

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', {
    //     storage: diskStorage({
    //         destination: './uploads/images',
    //         filename: (req, file, cb) => {
    //             const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
    //             const extension: string = path.parse(file.originalname).ext;
    //
    //             cb(null, `${filename}${extension}`)
    //         }
    //     })
    // }))

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', storage))
    // uploadFile(@UploadedFiles() file: Observable<Object>) {
    //     console.log(file);
    //     return of({imagePath: 'filename'});
    //     // return of({imagePath: file.filename});
    // }

    // uploadFile(@UploadedFiles() file: Observable<Object>) {
    //     console.log(file);
    //     return of({imagePath: file.filename});
    // }

    //
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('image'))
    // async uploadFile(@UploadedFile() file) {
    //     const response = {
    //         originalname: file.originalname,
    //         filename: file.filename,
    //     };
    //
    //     return response;
    //
    //     // const path = "d:\\" + file.originalName;
    //     // let fileStream = createWriteStream(path);
    //     // fileStream.write(file.buffer);
    //     // fileStream.end();
    //
    //     // const fieldName = 'adaptives.rar'; /// тепер скачується норм файл з норм назвою, але тестити треба в браузері
    //     // res.setHeader('Content-Type', 'application/octet-stream');
    //     // res.attachment(fieldName);
    //     //
    //     // return res.sendFile("d:\\" + fieldName)
    // }

    @Patch('/:id')
    //@UseInterceptors(FileInterceptor('formdata'))
    update(@Body() commentDto: CreateCommentDto, @Param('id') id: number) {
        return this.commentsService.updateComment(commentDto, id)
    }

    @Post()
    //@UseInterceptors(FileInterceptor('formdata'))
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
