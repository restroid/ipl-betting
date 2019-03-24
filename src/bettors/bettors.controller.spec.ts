import { Test, TestingModule } from '@nestjs/testing';
import { BettorsController } from './bettors.controller';
import { BettorsService } from './bettors.service';

describe('Bettors Controller', () => {
  let controller: BettorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BettorsController],
      providers:[BettorsService]
    }).compile();

    controller = module.get<BettorsController>(BettorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
