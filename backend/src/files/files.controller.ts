import {
    //BadRequestException,
    //Body,
    Controller, Get, Param,
    //Param,
    //ParseIntPipe,
    Post, Req, Res,
    //UploadedFile,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";
//import path from "path";
import {editFileName, imageFileFilter} from "./interceptors";
import {diskStorage} from "multer";
import path, {join} from "path";
import {uuid} from "uuidv4";

// const allowedFileExtensions = ['.jpg', '.png'];
// enum FileValidationErrors {
//     UNSUPPORTED_FILE_TYPE
// }


export const storage = {storage: diskStorage({
    destination: './upload',
    filename: (req, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`)
    }
})};

@Controller('files')
export class FilesController {

    @Get('/:filename')
    download(@Param('filename') filename, @Res() res) {
        console.log('filename', filename);
        const fieldName = `${filename}`;
        res.setHeader('Content-Type', 'application/octet-stream');
        res.attachment(fieldName);
        return res.sendFile( join(__dirname, '../../files/', fieldName));
    }

    @Post("files")
    @UseInterceptors(
        FileFieldsInterceptor([{ name: "files", maxCount: 4 }], {
            storage: diskStorage({
                destination: "./upload",
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            limits: { fileSize: 1024 * 1024 * 4 },
        })
    )
    uploadFiles(
        @UploadedFiles()
            files: Array<Express.Multer.File>
    ): any {
        console.log(files);
        for (let i in files) {
            console.log(i);
        }

        // @ts-ignore
        return files.files[0].filename;
    }


        // @Post('/upload')
        // @UseInterceptors(
        //     FileInterceptor(
        //         'image',
        //         {
        //             dest: './uploads',
        //             fileFilter: (req, file, callback) => {
        //                 const extension = path.extname(file.originalname);
        //                 if (allowedFileExtensions.includes(extension)) {
        //                     callback(null, true);
        //                 } else {
        //                     // provide the validation error in the request
        //                     req.fileValidationError = FileValidationErrors.UNSUPPORTED_FILE_TYPE
        //                     callback(null, false);
        //                 }
        //             }
        //         }
        //     )
        // )
        // uploadSinglePhoto(
        //     @Param('id', ParseIntPipe) id: number,
        // @UploadedFile() image,
        // @Req() req // add the request property
        // ) {
        //     // check here for a potential error
        //     if (req?.fileValidationError === FileValidationErrors.UNSUPPORTED_FILE_TYPE) {
        //         // if so, throw the BadRequestException
        //         throw new BadRequestException('Only images are allowed', `Bad request. Accepted file extensions are: ${allowedFileExtensions.toString()}`);
        //     }
        //     console.log('image', image)
        //
        //         // this.logger.verbose(`Adding image ${image}`);
        //         // const imageUrlLocation = `${image.destination.substring(1)}/${image.filename}`;
        //         // return this.userProfileService.saveUserProfilePhotoLocation(id, imageUrlLocation);
        //     }
        //
        //     // @Post('upload')
        //     // @UseInterceptors(FileInterceptor('image'))
        //     // uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createItemDto: any,) {
        //     //     console.log('item', createItemDto);
        //     //     console.log('file', file);
        //     //     return 'Good'
        //     // }
        //
        //     // @Post("upload")
        //     // @UseInterceptors(
        //     //     //FileInterceptor("photo", {
        //     //     FileInterceptor("photo", {
        //     //         dest: './uploads'
        //     //     })
        //     // )
        //     // uploadSingle(@UploadedFile() file) {
        //     //     console.log('file', file);
        //     //     return 'Good'
        //     // }

        }
