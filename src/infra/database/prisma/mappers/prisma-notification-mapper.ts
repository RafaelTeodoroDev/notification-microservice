import { Notification } from "@app/entities/notification/notification";
import { Content } from "@app/entities/notification/notification-content";
import { Notification as RawNotification } from '@prisma/client'
export class PrismaNotificationMapper{
  static toPrisma(notification: Notification){
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt
    }
  }

  static toDomain(raw: RawNotification): Notification{
    return new Notification({
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt
    }, raw.id)
  }
}