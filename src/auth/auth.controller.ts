import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginTelegramDto } from './dto/login-telegram.dtol';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) { }

    @Post('telegram-auth')
    async telegramAuth(@Body() dto: LoginTelegramDto) {
        let user = await this.authService.validateTelegramUser(dto);


        return {
            access_token: this.jwtService.sign({ sub: user.id }),
            user: user
        };
    }
}
