import { Module } from "@nestjs/common";
import { AppGateway } from './app.gateway';

import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";

import { CommentsModule } from './comments/comments.module';
import { Comment } from "./comments/comment.model";

import { FilesModule } from './files/files.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
    controllers: [ ],
    providers: [ AppGateway ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'upload'),
            serveRoot: '/upload/'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'root',
            database: process.env.POSTGRES_DB,
            models: [Comment],
            autoLoadModels: true,
            synchronize: true,
            logging: false
        }),
        CommentsModule,
        FilesModule,
    ],
})
export class AppModule { }