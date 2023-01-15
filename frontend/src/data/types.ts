export type CreateCommentDto = {
    userName: string;
    email: string;
    homePage: string;
    captcha: string;
    text: string;
    level: number;
    answers?: number[];
    parentId?: number;
}

export type CreateCommentDtoWithId = CreateCommentDto & {id: number, createdAt?: Date | string};