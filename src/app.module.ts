import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BettorsController } from './bettors/bettors.controller';
import { BettorsService } from './bettors/bettors.service';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';

@Module({
  imports: [],
  controllers: [AppController, BettorsController, MatchController],
  providers: [AppService,BettorsService, MatchService],
})
export class AppModule {}
