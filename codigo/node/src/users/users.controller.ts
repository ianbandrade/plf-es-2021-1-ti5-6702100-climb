import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(@Inject() private usersService: UsersService) {}

    @Get()
    getAll() {
        return this.usersService.getAll();
    }
}
