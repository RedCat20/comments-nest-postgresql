import { Request } from 'express';
import { parse } from 'path';
import { BadRequestException } from '@nestjs/common';

export const editFileName = (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
) => {
    const fileBaseName = parse(file.originalname).name;
    const fileExtName = parse(file.originalname).ext;
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${fileBaseName}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (
    req: Request,
    file: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif|avif)$/)) {
        return callback(
            new BadRequestException('おいおい、画像だけを送ってくれよな？'),
            false,
        );
    }
    callback(null, true);
};
