import { Controller, Get } from '@nestjs/common';

@Controller('')
export class CommentsController {

    @Get()
    getApp() {
        return 'App main route';
    }
}
