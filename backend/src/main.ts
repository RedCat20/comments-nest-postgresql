import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
// import {ValidationPipe} from "@nestjs/common";

async function start() {
    const PORT = process.env.PORT || 5000;

    //const app = await NestFactory.create(AppModule, {bodyParser: false});
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    // app.useGlobalPipes(new ValidationPipe({
    //     transform: true
    // }));

    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}

start().then(() => console.log('Start nest app'));