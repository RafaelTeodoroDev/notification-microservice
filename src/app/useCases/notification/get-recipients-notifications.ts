import { Notification } from "@app/entities/notification/notification";
import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../../repositories/notificationRepositories";

interface NotificationRequest{
  recipientId: string
}

interface GetRecipientsNotificationResponse{
  notifications: Notification[]
}

@Injectable()
export class GetRecipientsNotificationUseCase{
  constructor(private notificationsRepository: NotificationRepository){}

  async execute(request: NotificationRequest): Promise<GetRecipientsNotificationResponse>{
    const { recipientId } = request

    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

    return {
      notifications
    }
  }

}