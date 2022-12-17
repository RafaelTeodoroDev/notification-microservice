import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "../errors/notification-not-found"
import { UnReadNotificationUseCase } from "./unred-notification"

describe('unread notification', () => {
  it('SHould be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unReadNotificationUseCase = new UnReadNotificationUseCase(notificationsRepository)

    const notification = makeNotification({ readAt: new Date() })

    await notificationsRepository.create(notification)

    await unReadNotificationUseCase.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].readAt).toBeNull()
  }),

  it('Should not be able to unread a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unReadNotificationUseCase = new UnReadNotificationUseCase(notificationsRepository)

    expect(() => {
      return unReadNotificationUseCase.execute({
        notificationId: 'id-example'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})