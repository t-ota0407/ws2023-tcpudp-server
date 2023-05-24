import dgram, { Socket } from "node:dgram";
import { SocketActiveConnections } from "./socketActiveConnections";
import { schedule } from "node-cron";

export class UDPSocket {
  private socket: dgram.Socket;

  private rinfoaddress: string | undefined = undefined;

  constructor() {
    this.socket = dgram.createSocket('udp4');
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
      this.rinfoaddress = rinfo.address;
      console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
      const uuid: string = "";

      if (SocketActiveConnections.instance.isExistent(uuid)) {
        SocketActiveConnections.instance.add();
      }
    });

    return this.socket.bind(portNumber, callback);
  }

  public sendPeriodically() {
    // schedule('*/5, * * * * *', () => {
    //   SocketActiveConnections.instance.connections.forEach(connection => {
    //     const message = Buffer.from("hello");
    //     const targetPort = 3001;
    //     const targetAddress = connection.client.address;
    //     connection.client.send(message, 0, message.length, targetPort, targetAddress);
    //   })
    // })
    schedule('*/10 * * * * *', () => {
      //const connection = dgram.createSocket('udp4');
      if (this.rinfoaddress !== undefined) {
        const message = Buffer.from("hello");
        const targetPort = 30000;
        const targetAddress = this.rinfoaddress;
        this.socket.send(message, 0, message.length, targetPort, targetAddress);
        console.log("send");
      }
    });
  }
}