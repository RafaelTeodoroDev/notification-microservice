import { Notification } from "@app/entities/notification/notification"
import { Content } from "@app/entities/notification/notification-content"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CountRecipientNotificationsUseCase } from "./count-notifications"

describe('count recipients notification', () => {
  it('Should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotificationsUseCase = new CountRecipientNotificationsUseCase(notificationsRepository)

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

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: 'id-example'
    })

    expect(count).toEqual(2);
  })
})