import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../../repositories/notificationRepositories";
import { NotificationNotFound } from "../errors/notification-not-found";

interface NotificationRequest{
  notificationId: string
}

type UnReadNotificationResponse = void

@Injectable()
export class UnReadNotificationUseCase{
  constructor(private notificationsRepository: NotificationRepository){}

  async execute(request: NotificationRequest): Promise<UnReadNotificationResponse>{
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(notificationId)

    if(!notification){
      throw new NotificationNotFound()
    }

    notification.unRead()

    await this.notificationsRepository.save(notification)
  }
}