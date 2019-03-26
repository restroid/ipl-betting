import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBettorDto } from './dto/create-bettor-dto';
import { Bettor } from './bettors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class BettorsService {
    static users: string[] = ["Ritesh", "Anuj"];

    constructor(
        @InjectRepository(Bettor)
        private readonly bettorRepository: Repository<Bettor>,
    ) { }

    findOneByToken(token: string): any {
        return token + "Ritesh"
    }

    async findAll(): Promise<Bettor[]> {
        return await this.bettorRepository.find();
    }

    validateUser(bettor: CreateBettorDto) {
        if (bettor.name.length != bettor.validationCode) {
            throw new UnauthorizedException("Invalid validation Code");
        }
    }

    adduser(bettor: Bettor) {
        this.bettorRepository.save(bettor);
    }
}
