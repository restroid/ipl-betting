import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { BettorsService } from './bettors.service';
import { CreateBettorDto } from './dto/create-bettor-dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Bettor } from 'dist/bettors/bettors.entity';

@Controller('bettors')
export class BettorsController {
  constructor(private readonly bettorsService: BettorsService) { }

  @Get('all')
  @UseGuards(AuthGuard())
  async getAllUsers(): Promise<Bettor[]> {
    return await this.bettorsService.findAll();
  }

  @Get('auth')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async testAuth(@Request() req: any): Promise<Bettor[]> {
    return await this.bettorsService.findAll();
  }

  @UsePipes(ValidationPipe)
  @Post('register')
  async create(@Body() user: CreateBettorDto) {
    this.bettorsService.validateUser(user);
    return this.bettorsService.adduser(user.ToDbModel());
  }
}
