import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";

interface CommentCreationAttrs {
    userName?: string;
    email?: string;
    captcha?: string;
    text?: string;
}

//@Table({tableName: 'comments'})
@Table
export class Comment extends Model<Comment, CommentCreationAttrs> {

    // @ForeignKey(() => Comment)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false, defaultValue: 'Anonym'})
    userName: string;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: true})
    homePage: string;

    @Column({type: DataType.STRING, allowNull: false})
    captcha: string;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    //@Column({type: DataType.ARRAY(DataType.INTEGER), allowNull: true})
    //answers: number[];

    @Column({type: DataType.ARRAY(DataType.INTEGER), allowNull: true})
    answers: number[];

    @Column({type: DataType.INTEGER, allowNull: true})
    parentId: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    level: number;

    // @BelongsTo(() => Comment)
    // answer: Comment;
}