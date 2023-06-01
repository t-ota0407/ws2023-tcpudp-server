
export class User{
  public readonly uuid: string;
  public readonly username: string;
  public readonly startedAt: Date;

  private positionX: number;
  private positionY: number;
  private positionZ: number;
  
  private ipAddress: string | undefined;

  public constructor(uuid: string, username: string) {
    this.uuid = uuid;
    this.username = username;
    this.startedAt = new Date();

    this.positionX = 0;
    this.positionY = 0;
    this.positionZ = 0;
    this.ipAddress = undefined;
  }

  public setPosition(x: number, y: number, z: number) {
    this.positionX = x;
    this.positionY = y;
    this.positionZ = z;
  }

  public setIpAddress(ipAddress: string) {
    this.ipAddress = ipAddress;
  }

  public getIpAddress(): string | undefined {
    return this.ipAddress;
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
