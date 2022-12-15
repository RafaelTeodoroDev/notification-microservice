import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/useCases/notification/sendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase){}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotificationUseCase.execute({
      content,
      category,
      recipientId
    })

    return { notification }
  }
}
