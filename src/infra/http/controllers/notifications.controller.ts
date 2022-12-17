import { CancelNotificationUseCase } from '@app/useCases/notification/cancel-notification';
import { CountRecipientNotificationsUseCase } from '@app/useCases/notification/count-notifications';
import { GetRecipientsNotificationUseCase } from '@app/useCases/notification/get-recipients-notifications';
import { ReadNotificationUseCase } from '@app/useCases/notification/read-notification';
import { UnReadNotificationUseCase } from '@app/useCases/notification/unred-notification';
import { Body, Controller, Post, Patch, Get, Delete, Param } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/app/useCases/notification/sendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnReadNotificationUseCase,
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private getRecipientNotificationsById: GetRecipientsNotificationUseCase
  ){}

  @Patch('/:id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({
      notificationId: id
    })
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({
      notificationId: id
    })
  }
  
  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise<{count: number}> {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId
    })

    return {
      count
    }
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotificationsById.execute({
      recipientId
    })

    return {
      notifications: notifications.map(notification => NotificationViewModel.toHTTP(notification))
    }
  }


  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotificationUseCase.execute({
      content,
      category,
      recipientId
    })

    return NotificationViewModel.toHTTP(notification)
  }
}
