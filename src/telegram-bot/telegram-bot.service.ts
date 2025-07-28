import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramBotService {
    private readonly logger = new Logger(TelegramBotService.name);
    private bot: Telegraf;
    private pendingVerifications = new Set<string>();

    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) {
        const token = this.configService.get('TELEGRAM_BOT_TOKEN');

        this.bot = new Telegraf(token);
        this.setupGlobalHandlers();
    }


    private setupGlobalHandlers() {
        this.bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
        // Глобальный обработчик контактов
        this.bot.on(message('contact'), async (ctx) => {
            const telegramId = ctx.from.id.toString();

            const phone = ctx.message.contact.phone_number;

            try {
                if (!phone?.startsWith('+')) {
                    await ctx.reply('❌ Используйте международный формат (+7...)');
                    return;
                }

                await this.usersService.verifyPhone(telegramId, phone);
                await ctx.reply('✅ Номер подтвержден!');
                this.pendingVerifications.delete(telegramId);

            } catch (error) {
                this.logger.error(`Ошибка верификации для ${telegramId}: ${error.message}`);
                await ctx.reply('❌ Ошибка подтверждения номера');
            }
        });
        this.bot.launch()

        // Обработчик ошибок
        this.bot.catch((err, ctx) => {
            this.logger.error(`Bot error: ${err}`);
            ctx.reply('⚠️ Произошла ошибка, попробуйте позже');
        });
    }
    async requestPhoneVerification(telegramId: string) {
        if (this.pendingVerifications.has(telegramId)) {
            this.logger.log(`Повторный запрос для ${telegramId}`);

        }

        this.pendingVerifications.add(telegramId);

        try {
            await this.bot.telegram.sendMessage(
                telegramId,
                'Подтвердите Ваш номер телефона:',
                {
                    reply_markup: {
                        keyboard: [[{
                            text: '📞 Отправить мой номер',
                            request_contact: true
                        }]],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }
            );
        } catch (error) {
            this.pendingVerifications.delete(telegramId);
            this.logger.error(`Ошибка отправки запроса: ${error.message}`);
            throw error;
        }
    }
}