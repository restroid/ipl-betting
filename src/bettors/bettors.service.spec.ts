import { Test, TestingModule } from '@nestjs/testing';
import { BettorsService } from './bettors.service';

describe('BettorsService', () => {
  let service: BettorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BettorsService],
    }).compile();

    service = module.get<BettorsService>(BettorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
