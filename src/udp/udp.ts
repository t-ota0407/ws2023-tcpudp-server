import dgram from "node:dgram";
import { SimpleDatabase } from "../database/simpleDatabase";
import { UDPUploadDatagram } from "./udpUploadDatagram";
import { User } from "../database/entities/user";
import { UDPDownloadDatagram } from "./udpDownloadDatagram";

export class UDP {
  private socket: dgram.Socket;

  private sendDatagramInterval: NodeJS.Timeout | null;

  constructor() {
    this.socket = dgram.createSocket('udp4');
    this.sendDatagramInterval = null;

    this.startSendingDatagram();
  }

  public listen(portNumber: number, callback?: () => void) {
    this.socket.on('error', (err) => {
      console.error(`server error:\n${err.stack}`);
      this.socket.close();
    });

    this.socket.on('connect', () => {
      console.log('udp connected');
    });

    this.socket.on('message', (msg, rinfo) => {
      const uploadedData = UDPUploadDatagram.fromJson(msg.toString());
      if (uploadedData === undefined) {
        return console.log("server error:\nServer received unparsable datagram.");
      }

      const uuid = uploadedData.uuid;

      const user = SimpleDatabase.getInstance().FindUser(uuid);
      if (user === undefined) {
        return console.log("server error:\nClient designated undefined uuid or inactive user's uuid.");
      }

      if (this.sendDatagramInterval === null) {
        this.startSendingDatagram();
      }

      user.updatedAt = new Date();
      user.setPosition(uploadedData.x, uploadedData.y, uploadedData.z);
      user.setRemoteInfo(rinfo.address, rinfo.port);
    });

    return this.socket.bind(portNumber, callback);
  }

  public startSendingDatagram() {
    this.sendDatagramInterval = setInterval(() => {
      const activeUsers = SimpleDatabase.getInstance().getActiveUsersClone();
      const udpDownloadDatagram = UDPDownloadDatagram.fromUserList(activeUsers);
      activeUsers.forEach((user: User) => {
        const message = Buffer.from(JSON.stringify(udpDownloadDatagram));
        const targetPort = user.getPortNumber();
        const targetAddress = user.getIpAddress();
        this.socket.send(message, 0, message.length, targetPort, targetAddress);
      });
    }, 333);
  }

  public stopSendingDatagram() {
    if (this.sendDatagramInterval) {
      clearInterval(this.sendDatagramInterval);
      this.sendDatagramInterval = null;
    }
  }
}
