import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  

  @Get("admin247")
  async adminPage(@Res() res) {
    res.sendFile(join(__dirname, '..', 'views', "admin.html"));
  }

  @Get()
    async bet(@Res() res) {
      res.sendFile(join(__dirname, '..', 'views', "bets.html"));
    }
}
