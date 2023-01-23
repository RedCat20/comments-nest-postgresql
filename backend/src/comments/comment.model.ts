import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ICommentDto, ICommentsQuery } from "./interfaces/comment.interfaces";


@Table({tableName: 'comments'})
export class Comment extends Model<Comment, ICommentsQuery> {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    userName: string;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    level: number;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    homePage: string | null;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    file: string | null;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: null})
    parentId: number | null;
}