import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule,TypeOrmModule.forFeature([Match])],
    providers: [MatchService],
    controllers: [MatchController]
  })
export class MatchModule {
    
}
