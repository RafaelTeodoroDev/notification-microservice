import { Injectable } from "@nestjs/common";
import { Notification } from "src/app/entities/notification/notification";
import { NotificationRepository } from "src/app/repositories/notificationRepositories";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository{
  constructor(private prismaService: PrismaService){}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt
      }
    })
  }

}