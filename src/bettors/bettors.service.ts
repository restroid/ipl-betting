import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBettorDto } from './dto/create-bettor-dto';


@Injectable()
export class BettorsService {
    static users: string[] = ["Ritesh", "Anuj"];

    findOneByToken(token: string): any {
        return token+"Ritesh"
    }

    getAllUsers() {
        return BettorsService.users;
    }

    validateUser(bettor: CreateBettorDto) {
        if (bettor.name.length != bettor.validationCode) {
            throw new UnauthorizedException("Invalid validation Code");
        }
    }

    adduser(bettor: string) {
        BettorsService.users.push(bettor);
    }
}
