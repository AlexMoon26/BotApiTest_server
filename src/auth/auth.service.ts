import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { LoginTelegramDto } from './dto/login-telegram.dtol';
import { TelegramBotService } from '@/telegram-bot/telegram-bot.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly telegramBotService: TelegramBotService,
    ) { }

    async validateTelegramUser(payload: LoginTelegramDto) {
        const { id } = payload;


        let user = await this.usersService.findByTelegramId(id);

        if (!user) {
            user = await this.usersService.createUser(
                payload
            );
            await this.telegramBotService.requestPhoneVerification(user.telegramId);
            return user
        }

        if (!user.isPhoneVerified) {
            await this.telegramBotService.requestPhoneVerification(user.telegramId);

            return user;
        }
        return user
    }

}