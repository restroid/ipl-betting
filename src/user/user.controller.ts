import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import {  UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
 // @UseGuards(AuthGuard())
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('auth')
 // @UseGuards(AuthGuard(), RolesGuard)
  //@Roles('admin')
  async testAuth(@Request() req: any): Promise<User[]> {
    return await this.userService.findAll();
  }

  //@UsePipes(ValidationPipe)
  @Post('register')
  async create(@Body() user: User) {
    return this.userService.adduser(user);
  }
}
