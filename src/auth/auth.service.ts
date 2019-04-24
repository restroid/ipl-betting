import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
    private readonly userService: UserService) { }

  async createToken(userEmail: string) {
    var userModel = await this.userService.getUserByEmail(userEmail);
    if(userModel)
    {
      const user: JwtPayload = { name: userModel.name };
      const accessToken = this.jwtService.sign(user);
      return {
        user: userModel,
        expiresIn: 3600,
        accessToken,
      };
    }
  throw new UnauthorizedException();
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    var user = await this.userService.getUserByEmail(payload.name);
    return { id: user.id, roles: JSON.parse(user.role) };
  }
}
