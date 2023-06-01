
export class User{
  public readonly uuid: string;
  public readonly username: string;
  public readonly startedAt: Date;
  
  public updatedAt: Date;

  private positionX: number;
  private positionY: number;
  private positionZ: number;
  
  private ipAddress: string | undefined;
  private portNumber: number | undefined

  public constructor(uuid: string, username: string) {
    this.uuid = uuid;
    this.username = username;
    this.startedAt = new Date();
    this.updatedAt = this.startedAt;

    this.positionX = 0;
    this.positionY = 0;
    this.positionZ = 0;
    this.ipAddress = undefined;
    this.portNumber = undefined;
  }

  public setPosition(x: number, y: number, z: number) {
    this.positionX = x;
    this.positionY = y;
    this.positionZ = z;
  }

  public setRemoteInfo(ipAddress: string, portNumber: number) {
    this.ipAddress = ipAddress;
    this.portNumber = portNumber;
  }

  public getIpAddress(): string | undefined {
    return this.ipAddress;
  }

  public getPortNumber(): number | undefined {
    return this.portNumber;
  }

  public getPositionX() {
    return this.positionX;
  }

  public getPositionY() {
    return this.positionY;
  }

  public getPositionZ() {
    return this.positionZ;
  }
}
