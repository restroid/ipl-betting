import { CreateBettorDto } from "./dto/create-bettor-dto";

describe('BettorsEntity', () => {
  it('testing', () => {
    var x = new CreateBettorDto();
    var y = x.toDbModel();
    return expect(x.name).toEqual(y.name);
  });
});