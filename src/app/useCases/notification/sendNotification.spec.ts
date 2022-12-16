import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { SendNotificationUseCase } from "./SendNotificationUseCase"

describe('send notification', () => {
  it('SHould be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotificationUseCase = new SendNotificationUseCase(notificationsRepository)

    const { notification } = await sendNotificationUseCase.execute({
      category: 'slider',
      content: 'Content of notification',
      recipientId: 'example-of-id'
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0] === notification)
  })
})