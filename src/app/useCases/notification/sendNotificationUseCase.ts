import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../../repositories/notificationRepositories";
import { Notification } from "../../entities/notification/notification";
import { Content } from "../../entities/notification/notification-content";

interface NotificationRequest{
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse{
  notification: Notification
}

@Injectable()
export class SendNotificationUseCase{
  constructor(private notificationsRepository: NotificationRepository){}

  async execute(request: NotificationRequest): Promise<SendNotificationResponse>{
    const { category, content, recipientId } = request

    const notification = new Notification({
      category,
      recipientId,
      content: new Content(content),
    })

    await this.notificationsRepository.create(notification)

    return {
      notification
    }
  }

}