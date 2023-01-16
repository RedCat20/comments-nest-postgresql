export class CreateCommentDto {
    readonly userName: string;
    readonly email: string;
    readonly homePage?: string;
    readonly text: string;

    readonly file: string;

    readonly rootId?: number;
    readonly level: number;
    readonly parentId?: number;
    readonly answers?: number[];
}