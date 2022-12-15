import { randomUUID } from "node:crypto"
import { Notification } from "./notification"
import { Content } from "./notification-content"

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      category: 'category',
      content: new Content('nova solicitação'),
      recipientId: randomUUID(),
    })
  
    expect(notification).toBeTruthy()
  })
})

