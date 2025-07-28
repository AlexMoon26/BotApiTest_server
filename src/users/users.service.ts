import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async findByTelegramId(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: { telegramId: id.toString() },
        });

        if (!user) {
            return false
        }

        return user;
    }

    async createUser(data) {
        return this.prismaService.user.create({
            data: {
                telegramId: data.id.toString(),
                firstName: data.first_name,
                lastName: data.last_name,
                nickName: data.username,
                picture: data.photo_url,
                isPhoneVerified: false
            }
        });
    }
    async verifyPhone(telegramId: string, phone: string) {
        return this.prismaService.user.update({
            where: { telegramId },
            data: {
                phone,
                isPhoneVerified: true
            }
        });
    }
}
