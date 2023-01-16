export type CreateCommentDto = {
    userName: string;
    email: string;
    homePage?: string;
    text: string;

    file?: string | null;

    rootId?: number;
    level: number;
    parentId?: number;
    answers: number[];
}

export type ConvertedCommentDto = {
    userName: string;
    email: string;
    homePage?: string;
    text: string;

    file?: string | null;

    id: number;
    createdAt?: Date | string;

    rootId?: number;
    level: number;
    parentId?: number;
    answers: number[] | CreateCommentDtoWithId[];
}

export type CreateCommentDtoWithId = CreateCommentDto & {id: number, createdAt?: Date | string};

export type CommentWithCaptcha = CreateCommentDto & {id: number, captcha?: string};


