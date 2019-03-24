import { Controller, Get,  Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('token/:name')
  async createToken(@Param('name') name: string): Promise<any> {
    return await this.authService.createToken(name);
  }
}
