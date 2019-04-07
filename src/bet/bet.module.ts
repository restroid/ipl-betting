import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/match/match.entity';
import { Team } from 'src/team/team.entity';
import { Bet } from './bet.entity';
import { Transaction } from 'src/transaction/transaction.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Match])
  ,TypeOrmModule.forFeature([Bet])
  ,TypeOrmModule.forFeature([Transaction])
  ,TypeOrmModule.forFeature([Team])],
  controllers: [BetController],
  providers: [BetService]
})
export class BetModule {}
