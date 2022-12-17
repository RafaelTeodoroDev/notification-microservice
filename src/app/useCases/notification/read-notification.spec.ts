
import { Notification } from "@app/entities/notification/notification"
import { Content } from "@app/entities/notification/notification-content"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "../errors/notification-not-found"
import { CancelNotificationUseCase } from "./cancel-notification"
import { ReadNotificationUseCase } from "./read-notification"

describe('read notification', () => {
  it('SHould be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotificationUseCase = new ReadNotificationUseCase(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await readNotificationUseCase.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    )
  }),

  it('Should not be able to read a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotificationUseCase = new ReadNotificationUseCase(notificationsRepository)

    expect(() => {
      return readNotificationUseCase.execute({
        notificationId: 'id-example'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})