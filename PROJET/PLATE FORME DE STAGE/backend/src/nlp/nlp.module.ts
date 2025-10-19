import { Module } from '@nestjs/common';
import { NlpController } from './nlp.controller';
import { NlpService } from './nlp.service';
import { ExtractionService } from './extraction/extraction.service';
import { MatchingService } from './matching/matching.service';
import { RecommendationService } from './recommendation/recommendation.service';

@Module({
  controllers: [NlpController],
  providers: [NlpService, ExtractionService, MatchingService, RecommendationService]
})
export class NlpModule {}
