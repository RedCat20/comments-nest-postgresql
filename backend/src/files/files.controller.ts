import { Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./interceptors";
import { diskStorage } from "multer";
import { join } from "path";


@Controller('files')
export class FilesController {

    @Get('/:filename')
    download(@Param('filename') filename, @Res() res) {
        // console.log('filename', filename);
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
        // console.log(files);
        for (let i in files) {
            // console.log(i);
        }

        // @ts-ignore
        return files.files[0].filename;
    }
}
