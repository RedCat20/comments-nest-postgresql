// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   OnGatewayInit,
//   WsResponse,
//   WebSocketServer,
//   OnGatewayConnection, OnGatewayDisconnect
// } from '@nestjs/websockets';
// import {Logger} from "@nestjs/common";
// import {Server, Socket} from "socket.io";
//
// @WebSocketGateway()
// export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//
//   @WebSocketServer() wss: Server;
//
//   private logger: Logger = new Logger('AppGateway')
//
//   afterInit(server: Server): any {
//     this.logger.log('Initialized');
//   }
//
//   handleConnection(client: Socket, ...args: any[]): any {
//     this.logger.log(`Client connected ${client.id}`);
//   }
//
//   handleDisconnect(client: Socket): any {
//     this.logger.log(`Client disconnected ${client.id}`);
//   }
//
//   @SubscribeMessage('msgToServer')
//   handleMessage(client: Socket, text: string): WsResponse<string> {
//     return {event: 'msgToServer', data: text};
//   }
//
// }

import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from "socket.io";
import {CreateCommentDto} from "./comments/dto/create.comment.dto";

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