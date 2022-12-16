import { Notification, NotificationProps } from "@app/entities/notification/notification";
import { Content } from "@app/entities/notification/notification-content";

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}){
  return new Notification({
    category: 'social',
    content: new Content('Conteudo da notification 2'),
    recipientId: 'id-example',
    ...override
  })
}