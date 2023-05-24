import express from "express";
import { UDPSocket } from "./udpSocket/udp";
import { connectionRouter } from "./tcpHttp/routers/connectionRouter";
import { DataSource, DataSourceOptions } from "typeorm";

class Server {
  private app: express.Application;

  private readonly httpPort = Number(process.env.HTTP_PORT) || 8080;
  private readonly socketPort = Number(process.env.SOCKET_PORT) || 3000

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
    // await this.connectToDBServer();
    this.startUDPSocket();
    this.startTCPHTTP();
  }

  private async connectToDBServer(): Promise<void> {
    const ormconfig: DataSourceOptions = {
      "type": "postgres",
      "host": process.env.DB_HOST,
      "port": 3306,
      "username": process.env.DB_USER,
      "password": process.env.DB_PASS,
      "database": process.env.DB_NAME,
      "synchronize": true,
      "logging": false,
      "entities": [
        "dist/src/entities/**/*.js"
      ],
      "migrations": [
        "dist/src/migration/**/*.js"
      ],
      "subscribers": [
        "dist/src/subscriber/**/*.js"
      ],
    };

    const dataSource = new DataSource(ormconfig);
  
    await dataSource.initialize();
  }

  private startUDPSocket() {
    const udpSocket = new UDPSocket();
    udpSocket.listen(this.socketPort, () => {
      console.log(`UDP socket connection port is ${this.socketPort}`);
    });
    udpSocket.sendPeriodically();
  }

  private startTCPHTTP() {
    this.app.use("/connection", connectionRouter);

    this.app.listen(this.httpPort, () => {
      console.log(`HTTP connection port is ${this.httpPort}`);
    }).setTimeout(10 * 1000);
  }
}

const server = new Server();
