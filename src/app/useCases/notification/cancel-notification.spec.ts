
import { Notification } from "@app/entities/notification/notification"
import { Content } from "@app/entities/notification/notification-content"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "../errors/notification-not-found"
import { CancelNotificationUseCase } from "./cancel-notification"

describe('cancel notification', () => {
  it('SHould be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotificationUseCase = new CancelNotificationUseCase(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await cancelNotificationUseCase.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    )
  }),

  it('Should not be able to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotificationUseCase = new CancelNotificationUseCase(notificationsRepository)

    expect(() => {
      return cancelNotificationUseCase.execute({
        notificationId: 'id-example'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})