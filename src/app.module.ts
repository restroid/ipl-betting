import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BettorsModule } from './bettors/bettors.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';
import { BetModule } from './bet/bet.module';

@Module({
  imports: [AuthModule, BettorsModule, TypeOrmModule.forRoot(), TeamModule, MatchModule, BetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
