import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    // constructor(private readonly usersService: UsersService) { }
    // @HttpCode(HttpStatus.OK)
    // @Get('profile')
    // public async findProfile(userId: string) {
    //     return this.usersService.findById(userId)
    // }
}
