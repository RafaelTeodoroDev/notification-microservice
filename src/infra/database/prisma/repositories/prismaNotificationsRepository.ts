import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification/notification";
import { NotificationRepository } from "@app/repositories/notificationRepositories";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { NotificationNotFound } from "@app/useCases/errors/notification-not-found";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository{
  constructor(private prisma: PrismaService){}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    })

    if(!notification){
      return null
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId
      }
    })

    return notifications.map((notification) => PrismaNotificationMapper.toDomain(notification))
  }
  
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId
      }
    })

    return count
  }

  async create(notification: Notification): Promise<void> {
    const mappedNotification = PrismaNotificationMapper.toPrisma(notification)
    
    await this.prisma.notification.create({
      data: mappedNotification
    })
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    const response = await this.prisma.notification.update({
      where: {
        id: raw.id
      },

      data: raw
    })
  }

}