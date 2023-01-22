export class CreateCommentDto {
    readonly userName: string;
    readonly email: string;
    readonly text: string;
    readonly level: number;

    readonly file?: string;
    readonly homePage?: string;
    readonly parentId?: number;
}