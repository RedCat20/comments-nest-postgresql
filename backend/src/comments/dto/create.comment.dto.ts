export class CreateCommentDto {
    readonly userName: string;
    readonly email: string;
    readonly homePage: string;
    readonly captcha: string;
    readonly text: string;
    readonly answers: number[];
    readonly parentId: number;
    readonly level: number;
}