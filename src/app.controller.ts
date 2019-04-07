import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("admin")
  async listTeams(@Res() res) {
    res.sendFile(join(__dirname, '..', 'views', "admin.html"));
  }
}
