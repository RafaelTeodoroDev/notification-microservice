import { Notification } from "src/app/entities/notification/notification";
import { NotificationRepository } from "src/app/repositories/notificationRepositories";

export class InMemoryNotificationsRepository implements NotificationRepository{
  public notifications: Notification[] = []

  async create(notification: Notification){
    this.notifications.push(notification)
  }

}