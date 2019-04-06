import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'dist/match/match.entity';
import { Team } from 'dist/src/team/team.entity';
import { Bet } from './bet.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Match])
  ,TypeOrmModule.forFeature([Bet])
  ,TypeOrmModule.forFeature([Team])],
  controllers: [BetController],
  providers: [BetService]
})
export class BetModule {}