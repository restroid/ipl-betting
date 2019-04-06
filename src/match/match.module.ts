import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from 'dist/src/match/match.controller';
import { MatchService } from 'dist/src/match/match.service';
import { Match } from './match.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Match])],
    providers: [MatchService],
    controllers: [MatchController]
  })
export class MatchModule {
    
}