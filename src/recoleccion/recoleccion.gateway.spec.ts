import { Test, TestingModule } from '@nestjs/testing';
import { RecoleccionGateway } from './recoleccion.gateway';

describe('RecoleccionGateway', () => {
  let gateway: RecoleccionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecoleccionGateway],
    }).compile();

    gateway = module.get<RecoleccionGateway>(RecoleccionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
