import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../../repositories/notificationRepositories";
import { Notification } from "../../entities/notification/notification";
import { Content } from "../../entities/notification/notification-content";
import { NotificationNotFound } from "../errors/notification-not-found";

interface NotificationRequest{
  notificationId: string
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotificationUseCase{
  constructor(private notificationsRepository: NotificationRepository){}

  async execute(request: NotificationRequest): Promise<ReadNotificationResponse>{
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(notificationId)

    if(!notification){
      throw new NotificationNotFound()
    }

    notification.read()

    await this.notificationsRepository.save(notification)
  }
}