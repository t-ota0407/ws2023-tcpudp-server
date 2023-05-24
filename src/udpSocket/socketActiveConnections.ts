import dgram from "node:dgram";
import { SocketConnection } from "./SocketConnection";

export class SocketActiveConnections {
  
  private static _instance: SocketActiveConnections;

  public readonly connections: SocketConnection[] = [];
  
  private constructor() {}

  public static get instance(): SocketActiveConnections {
    if (!this._instance) {
      this._instance = new SocketActiveConnections();
    }
    return this._instance;
  }

  public isExistent(uuid: string): boolean {
    const targetConnection = this.connections.find(connection => connection.uuid === uuid);
    return targetConnection !== undefined;
  }

  public add() {

  }
}