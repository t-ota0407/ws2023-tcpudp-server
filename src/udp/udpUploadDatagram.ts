export class UDPUploadDatagram {
  public readonly uuid: string;
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  public constructor(uuid: string, x: number, y: number, z: number) {
    this.uuid = uuid;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  public static fromJson(jsonString: string): UDPUploadDatagram | undefined {
    const parsedObject: object = JSON.parse(jsonString);

    if (!("uuid" in parsedObject) || typeof parsedObject.uuid !== "string") {
      return undefined;
    }

    if (!("x" in parsedObject) || isNaN(Number(parsedObject.x))) {
      return undefined;
    }

    if (!("y" in parsedObject) || isNaN(Number(parsedObject.y))) {
      return undefined;
    }

    if (!("z" in parsedObject) || isNaN(Number(parsedObject.z))) {
      return undefined;
    }

    return new UDPUploadDatagram(parsedObject.uuid, Number(parsedObject.x), Number(parsedObject.y), Number(parsedObject.z));
  }
}
