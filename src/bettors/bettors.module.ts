import { Module } from '@nestjs/common';
import { BettorsController } from "./bettors.controller";
import { BettorsService } from "./bettors.service";
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bettor } from './bettors.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Bettor])],
  providers: [BettorsService],
  controllers: [BettorsController]
})
export class BettorsModule { }
