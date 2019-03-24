import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { BettorsService } from './bettors.service';
import { CreateBettorDto } from './dto/create-bettor-dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('bettors')
export class BettorsController {
  constructor(private readonly bettorsService: BettorsService) { }

  @Get('all')
  @UseGuards(AuthGuard())
  getAllUsers(): string[] {
    return this.bettorsService.getAllUsers();
  }

  @Get('auth')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  testAuth(@Request() req: any): string[] {
    return this.bettorsService.getAllUsers();
  }

  @UsePipes(ValidationPipe)
  @Post('register')
  async create(@Body() user: CreateBettorDto) {
    this.bettorsService.validateUser(user);
    return this.bettorsService.adduser(user.name);
  }
}
