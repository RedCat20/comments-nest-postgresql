import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";


@Controller('/test')
export class AppController {
    constructor(private appService: AppService) {  }

    @Get('/users')
    getUsers() {
        return this.appService.getTestUsers();
    }

}