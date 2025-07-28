import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [UsersModule, ConfigModule],
    providers: [TelegramBotService],
    exports: [TelegramBotService],
})
export class TelegramBotModule { }