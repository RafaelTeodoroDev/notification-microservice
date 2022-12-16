import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../../repositories/notificationRepositories";
import { NotificationNotFound } from "../errors/notification-not-found";

interface NotificationRequest{
  recipientId: string
}

interface CountRecipientNotificationsResponse{
  count: number;
}

@Injectable()
export class CountRecipientNotificationsUseCase{
  constructor(private notificationsRepository: NotificationRepository){}

  async execute(request: NotificationRequest): Promise<CountRecipientNotificationsResponse>{
    const { recipientId } = request

    const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

    return {
      count
    }
  }

}