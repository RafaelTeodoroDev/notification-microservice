import { Module } from "@nestjs/common";
import { NotificationRepository } from "src/app/repositories/notificationRepositories";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationsRepository } from "./prisma/repositories/prismaNotificationsRepository";

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository
    }
  ],
  exports: [
    NotificationRepository
  ]
})
export class DatabaseModule{}