import express from "express";
import { UDPSocket } from "./udpSocket/udp";
import { connectionRouter } from "./tcpHttp/routers/connectionRouter";
import { schedule } from "node-cron";
import { SimpleDatabase } from "./database/simpleDatabase";

class Server {
  private app: express.Application;

  private readonly httpPort = Number(process.env.HTTP_PORT) || 8080;
  private readonly socketPort = Number(process.env.SOCKET_PORT) || 3000

  private readonly udpSocket = new UDPSocket();

  constructor() {
    this.app = express();
    this.middleware();
    this.startServer();
  }

  private middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private async startServer(): Promise<void> {
    this.startUDPSocket();
    this.startTCPHTTP();
    this.schedulePeriodicTasks();
  }

  private startUDPSocket() {
    this.udpSocket.listen(this.socketPort, () => {
      console.log(`UDP socket connection port is ${this.socketPort}`);
    });
  }

  private startTCPHTTP() {
    this.app.use("/connection", connectionRouter);

    this.app.listen(this.httpPort, () => {
      console.log(`HTTP connection port is ${this.httpPort}`);
    }).setTimeout(10 * 1000);
  }

  private schedulePeriodicTasks() {
    schedule('* */1 * * * *', () => {
      SimpleDatabase.getInstance().CheckDeactivatedUser();
    });

    schedule('* */1 * * * *', () => {
      if (SimpleDatabase.getInstance().getActiveUsersClone().length === 0) {
        this.udpSocket.stopSendingDatagram();
      };
    });
  }
}

const server = new Server();
