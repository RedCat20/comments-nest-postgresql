import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { CreateCommentDto } from "./comments/dto/create.comment.dto";

@WebSocketGateway(8001, {cors: '*'})
export class AppGateway {
  @WebSocketServer() server: Server;


  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('message', message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('comment')
  handleComments(@MessageBody() comment: CreateCommentDto): void {
    console.log('comment', comment);
    this.server.emit('comment', comment);
  }
}