import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from './match.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Match])],
    providers: [MatchService],
    controllers: [MatchController]
  })
export class MatchModule {
    
}
