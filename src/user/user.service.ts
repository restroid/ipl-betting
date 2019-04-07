import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }

    findOneByToken(token: string): any {
        return token;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    adduser(user: User) {
        user.role="member";
        this.userRepository.save(user);
    }
}
