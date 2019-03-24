import { Controller, Get, Post, Body } from '@nestjs/common';
import { BettorsService } from './bettors.service';

@Controller('bettors')
export class BettorsController {
  constructor(private readonly bettorsService: BettorsService) { }

  @Get('all')
  getAllUsers(): string[] {
    return this.bettorsService.getAllUsers();
  }

  @Post()
  async create(@Body() name: string) {
    return this.bettorsService.adduser(name);
  }
}
