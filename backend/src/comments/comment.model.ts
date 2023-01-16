import {Column, DataType, Model, Table} from "sequelize-typescript";

interface CommentCreationAttrs {
    userName: string;
    email: string;
    homePage?: string;
    text: string;

    file?: string;

    rootId?: number;
    level: number;
    parentId?: number;
    answers?: number[];
}

@Table({tableName: 'comments'})
//@Table // with default name
export class Comment extends Model<Comment, CommentCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    userName: string;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: true})
    homePage: string;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    file: string | null;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: null})
    rootId: number | null;

    @Column({type: DataType.INTEGER, allowNull: false})
    level: number;

    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: null})
    parentId: number | null;

    @Column({type: DataType.ARRAY(DataType.INTEGER), allowNull: false, defaultValue: []})
    answers: number[];
}