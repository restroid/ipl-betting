import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from '../match/match.entity';
import { Team } from '../team/team.entity';
import { Bet } from './bet.entity';
import { Transaction } from '../transaction/transaction.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([Match])
    , TypeOrmModule.forFeature([Bet])
    , TypeOrmModule.forFeature([Transaction])
    , TypeOrmModule.forFeature([Team])],
  controllers: [BetController],
  providers: [BetService]
})
export class BetModule { }
