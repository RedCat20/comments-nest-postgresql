import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";


async function bootstrap() {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();

    app.useStaticAssets(join(__dirname, '..', 'upload'));

    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}

bootstrap().then(() => console.log('Bootstrap nest app'));