import express from "express";
import { UDP } from "./udp/udp";
import { connectionRouter } from "./http/routers/connectionRouter";
import { schedule } from "node-cron";
import { SimpleDatabase } from "./database/simpleDatabase";

class Server {
  private app: express.Application;

  private readonly tcpPort = Number(process.env.TCP_PORT) || 8080;
  private readonly udpPort = Number(process.env.UDP_PORT) || 55000;

  private readonly udp = new UDP();

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
    this.udp.listen(this.udpPort, () => {
      console.log(`UDP connection port is ${this.udpPort}`);
    });
  }

  private startTCPHTTP() {
    this.app.use("/connection", connectionRouter);

    this.app.listen(this.tcpPort, () => {
      console.log(`HTTP connection port is ${this.tcpPort}`);
    }).setTimeout(10 * 1000);
  }

  private schedulePeriodicTasks() {
    schedule('* */1 * * * *', () => {
      SimpleDatabase.getInstance().CheckDeactivatedUser();
    });

    schedule('* */1 * * * *', () => {
      if (SimpleDatabase.getInstance().getActiveUsersClone().length === 0) {
        this.udp.stopSendingDatagram();
      }
    });
  }
}

const server = new Server();
