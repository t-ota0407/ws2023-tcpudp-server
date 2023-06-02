import { User } from "./entities/user";

export class SimpleDatabase {
  private static instance: SimpleDatabase;

  private constructor() { }

  public static getInstance(): SimpleDatabase {
    if (!SimpleDatabase.instance) {
      SimpleDatabase.instance = new SimpleDatabase();
    }

    return SimpleDatabase.instance;
  }

  private activeUsers: User[] = [];
  private readonly deactivationWaitingTime = 30000;

  public FindUser(uuid: string): User | undefined {
    const user = this.activeUsers.find((user) => user.uuid === uuid);
    return user;
  }

  public AddActiveUser(user: User) {
    this.activeUsers.push(user);
  }

  public DeleteActiveUser(uuid: string) {
    this.activeUsers = this.activeUsers.filter(user => user.uuid !== uuid);
  }

  public CheckDeactivatedUser() {
    const now = new Date();
    this.activeUsers = this.activeUsers.filter((user: User) => {
      const timeDifference  = Math.abs(user.updatedAt.getTime() - now.getTime());
      return timeDifference < this.deactivationWaitingTime;
    });
  }

  public getActiveUsersClone() {
    return [...this.activeUsers];
  }
}