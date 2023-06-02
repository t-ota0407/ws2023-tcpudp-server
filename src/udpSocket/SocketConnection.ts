import dgram from "node:dgram";

export class SocketConnection {
    
  public readonly client: dgram.Socket;
  public readonly uuid: string;
  private username: string

  constructor(client: dgram.Socket, uuid: string, username: string) {
    this.client = client;
    this.uuid = uuid;
    this.username = username;
  }
}