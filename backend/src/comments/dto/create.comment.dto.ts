import { IsEmail, IsNumber, IsString, Length } from "class-validator";

export class CreateCommentDto {
    @IsString({message: 'Property userName must be a string'})
    @Length(3, 30, {message: 'Property userName must have a length from 3 to 300 symbols'})
    readonly userName: string;

    @IsString({message: 'Property email must be a string'})
    @IsEmail()
    readonly email: string;

    @IsString({message: 'Property text must be a string'})
    @Length(3, 300, {message: 'Text must have a length from 3 to 300 symbols'})
    readonly text: string;

    @IsNumber({},{message: 'Property level must be a number'})
    readonly level: number;

    readonly file?: string;
    readonly homePage?: string;
    readonly parentId?: number;
}