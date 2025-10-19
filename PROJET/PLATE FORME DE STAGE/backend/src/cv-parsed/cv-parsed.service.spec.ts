import { Test, TestingModule } from '@nestjs/testing';
import { CvParsedService } from './cv-parsed.service';

describe('CvParsedService', () => {
  let service: CvParsedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvParsedService],
    }).compile();

    service = module.get<CvParsedService>(CvParsedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
