import { IsString, IsNotEmpty } from 'class-validator';

export class LoginTelegramDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name?: string;

    @IsString()
    username?: string;

    @IsString()
    photo_url?: string;

    @IsString()
    phone?: string;

    @IsNotEmpty()
    @IsString()
    hash: string;

    @IsNotEmpty()
    @IsString()
    auth_date: string;
}