import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
// import {ValidationPipe} from "@nestjs/common";

async function start() {
    const PORT = process.env.PORT || 5000;

    //const app = await NestFactory.create(AppModule, {bodyParser: false});
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    // app.useStaticAssets(join(__dirname, '..', 'public'), {
    //     prefix: '/public',
    // });

    // app.useGlobalPipes(new ValidationPipe({
    //     transform: true
    // }));

    app.useStaticAssets(join(__dirname, '..', 'upload'));

    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}

start().then(() => console.log('Start nest app'));