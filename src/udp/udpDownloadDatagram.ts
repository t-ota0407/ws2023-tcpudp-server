import { User } from "../database/entities/user";

export class UDPDownloadDatagram {
  public users: UDPDownloadUser[];

  public constructor() {
    this.users = [];
  }

  public static fromUserList(users: User[]): UDPDownloadUser[] {
    return users.map((user: User) => {
      return {
        uuid: user.uuid,
        username: user.username,
        positionX: user.positionX,
        positionY: user.positionY,
        positionZ: user.positionZ,
      };
    })
  }
}

type UDPDownloadUser = {
  uuid: string,
  username: string,
  positionX: number,
  positionY: number,
  positionZ: number,
}
