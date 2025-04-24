import { Test, TestingModule } from '@nestjs/testing';
import { SonicGateway } from './sonic.gateway';

describe('SonicGateway', () => {
  let gateway: SonicGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SonicGateway],
    }).compile();

    gateway = module.get<SonicGateway>(SonicGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
