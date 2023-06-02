export class User{
  public readonly uuid: string;
  public readonly username: string;
  private readonly startedAt: Date;
  
  private _updatedAt: Date;

  private _positionX: number;
  private _positionY: number;
  private _positionZ: number;
  
  private ipAddress: string | undefined;
  private portNumber: number | undefined

  public constructor(uuid: string, username: string) {
    this.uuid = uuid;
    this.username = username;
    this.startedAt = new Date();
    this._updatedAt = this.startedAt;

    this._positionX = 0;
    this._positionY = 0;
    this._positionZ = 0;
    this.ipAddress = undefined;
    this.portNumber = undefined;
  }

  public setPosition(x: number, y: number, z: number) {
    this._positionX = x;
    this._positionY = y;
    this._positionZ = z;
    this._updatedAt = new Date();
  }

  public setRemoteInfo(ipAddress: string, portNumber: number) {
    this.ipAddress = ipAddress;
    this.portNumber = portNumber;
    this._updatedAt = new Date();
  }

  public getIpAddress(): string | undefined {
    return this.ipAddress;
  }

  public getPortNumber(): number | undefined {
    return this.portNumber;
  }

  get positionX() {
    return this._positionX;
  }

  get positionY() {
    return this._positionY;
  }

  get positionZ() {
    return this._positionZ;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
