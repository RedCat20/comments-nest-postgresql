export interface ICommentDto {
    userName: string;
    email: string;
    text: string;
    level: number;
    homePage?: string;
    file?: string;
    parentId?: number;
}

export interface ICommentsQuery {
    page: string;
    sort: string;
}