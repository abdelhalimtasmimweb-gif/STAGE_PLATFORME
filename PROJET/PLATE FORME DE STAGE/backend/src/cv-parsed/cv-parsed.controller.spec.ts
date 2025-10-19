import { Test, TestingModule } from '@nestjs/testing';
import { CvParsedController } from './cv-parsed.controller';

describe('CvParsedController', () => {
  let controller: CvParsedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvParsedController],
    }).compile();

    controller = module.get<CvParsedController>(CvParsedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
