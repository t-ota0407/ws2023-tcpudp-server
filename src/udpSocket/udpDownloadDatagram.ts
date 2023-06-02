import { User } from "../database/entities/user";

export class UDPDownloadDatagram {
  public users: {
    uuid: string,
    username: string,
    positionX: number,
    positionY: number,
    positionZ: number,
  }[];

  public constructor() {
    this.users = [];
  }

  public static fromUserList(users: User[]) {
    return users.map((user: User) => {
      return {
        uuid: user.uuid,
        username: user.username,
        positionX: user.getPositionX(),
        positionY: user.getPositionY(),
        positionZ: user.getPositionZ(),
      };
    })
  }
}
