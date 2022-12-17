import { CancelNotificationUseCase } from "@app/useCases/notification/cancel-notification";
import { CountRecipientNotificationsUseCase } from "@app/useCases/notification/count-notifications";
import { GetRecipientsNotificationUseCase } from "@app/useCases/notification/get-recipients-notifications";
import { ReadNotificationUseCase } from "@app/useCases/notification/read-notification";
import { UnReadNotificationUseCase } from "@app/useCases/notification/unred-notification";
import { Module } from "@nestjs/common";
import { SendNotificationUseCase } from "src/app/useCases/notification/sendNotificationUseCase";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientsNotificationUseCase,
    ReadNotificationUseCase,
    UnReadNotificationUseCase
  ]
})

export class HttpModule{}