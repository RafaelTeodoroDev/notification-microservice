import { Notification } from "@app/entities/notification/notification";
import { NotificationRepository } from "@app/repositories/notificationRepositories";

export class InMemoryNotificationsRepository implements NotificationRepository{
  public notifications: Notification[] = []

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(item => item.recipientId === recipientId)
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(notification => notification.recipientId === recipientId).length
  }
  
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.notifications.find(item => item.id === notificationId)

    if(!notification){
      return null
    }

    return notification
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(item => item.id === notification.id)

    if(notificationIndex >= 0){
      this.notifications[notificationIndex] = notification
    }
  }

  async create(notification: Notification){
    this.notifications.push(notification)
  }

}