import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

    },
    ),
    PrismaModule,
    UsersModule,
    AuthModule,
    TelegramBotModule
  ],
})
export class AppModule { }
