import dgram, { Socket } from "node:dgram";
import { schedule } from "node-cron";
import { SimpleDatabase } from "../database/simpleDatabase";
import { UDPUploadDatagram } from "./udpUploadDatagram";
import { User } from "../database/entities/user";
import { UDPDownloadDatagram } from "./udpDownloadDatagram";

export class UDPSocket {
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
      console.log('connected');
    });

    this.socket.on('message', (msg, rinfo) => {
      console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
      const uploadedData = UDPUploadDatagram.fromJson(msg.toString());
      if (uploadedData === undefined) {
        return console.log("parseに失敗したことを知らせるエラーを出す");
      }

      const uuid = uploadedData.uuid;

      const user = SimpleDatabase.getInstance().FindUser(uuid);
      if (user === undefined) {
        return console.log("postが叩けていないことを知らせるエラーを出す");
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
      const udpDownloadDatagram = UDPDownloadDatagram.fromUserList([...activeUsers, ...activeUsers, ...activeUsers]);
      activeUsers.forEach((user: User) => {
        const message = Buffer.from(JSON.stringify(udpDownloadDatagram));
        const targetPort = user.getPortNumber();
        const targetAddress = user.getIpAddress();
        this.socket.send(message, 0, message.length, targetPort, targetAddress);
      });
      console.log("send");
    }, 500);
  }

  public stopSendingDatagram() {
    if (this.sendDatagramInterval) {
      clearInterval(this.sendDatagramInterval);
      this.sendDatagramInterval = null;
    }
  }
}