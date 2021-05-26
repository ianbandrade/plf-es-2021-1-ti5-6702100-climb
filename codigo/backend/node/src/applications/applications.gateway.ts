import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MonitoringService } from './monitoring.service';

@WebSocketGateway({ namespace: 'applications' })
export class ApplicationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger(ApplicationsGateway.name);

  constructor(private grpc: MonitoringService) {}

  private map = new Map<string, string>();

  async afterInit() {
    this.logger.log('Gateway initiated');
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('connected', 'Connected successfully!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const appName = this.map.get(client.id);
    if (appName) {
      this.grpc.close(client.id, appName);
      this.map.delete(client.id);
    }
    client.emit('disconnect', 'Connected successfully!');
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() applicationName: string,
  ) {
    (await this.grpc.getAppData(client.id, applicationName)).subscribe(
      (mockedData) => {
        client.emit('message', mockedData);
      },
    );
    this.map.set(client.id, applicationName);
  }
}
