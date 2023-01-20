import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets';
import {Logger} from "@nestjs/common";
import {Server, Socket} from "socket.io";

@WebSocketGateway()
export class TestGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway')

  afterInit(server: Server): any {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return {event: 'msgToServer', data: text};
  }

}
