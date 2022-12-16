import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification/notification";
import { NotificationRepository } from "@app/repositories/notificationRepositories";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository{
  constructor(private prismaService: PrismaService){}
  
  countManyByRecipientId(recipientId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  
  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error("Method not implemented.");
  }

  async create(notification: Notification): Promise<void> {
    const mappedNotification = PrismaNotificationMapper.toPrisma(notification)
    
    await this.prismaService.notification.create({
      data: mappedNotification
    })
  }

  async save(notification: Notification): Promise<void> {
    throw new Error("Method not implemented.");
  }

}