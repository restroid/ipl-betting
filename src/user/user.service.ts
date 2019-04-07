import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }

    async getUserByEmail(email: string): Promise<User> {
        var users = await this.userRepository.find();
        return users.find((u) => u.name == email);
    }
    findOneByToken(token: string): any {
        return token;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    adduser(user: User) {
        user.role = "member";
        this.userRepository.save(user);
    }
}
