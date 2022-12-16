import { Notification } from "@app/entities/notification/notification"
import { Content } from "@app/entities/notification/notification-content"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CountRecipientNotificationsUseCase } from "./count-notifications"
import { GetRecipientsNotificationUseCase } from "./get-recipients-notifications"

describe('get recipients notification', () => {
  it('Should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getRecipientsNotificationUseCase = new GetRecipientsNotificationUseCase(notificationsRepository)

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'id-example'
      })
    )

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'id-example'
      })
    )

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'id-example-2'
      })
    )

    const { notifications } = await getRecipientsNotificationUseCase.execute({
      recipientId: 'id-example'
    })

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'id-example' }),
      expect.objectContaining({ recipientId: 'id-example' })
    ]))
  })
})