import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import {  UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from './user.entity';

@UseGuards(AuthGuard(),RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  @Roles('Admin')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }
  
  @Get('auth')
  @Roles('Admin')
  async testAuth(@Request() req: any): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('register')
  @Roles('Admin')
  async create(@Body() user: User) {
    return this.userService.adduser(user);
  }
}
