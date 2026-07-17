import { Test, TestingModule } from '@nestjs/testing';
import { RaceEventsController } from './race-events.controller';
import { RaceEventsService } from './race-events.service';

describe('RaceEventsController', () => {
  let controller: RaceEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaceEventsController],
      providers: [
        {
          provide: RaceEventsService,
          useValue: {
            findAll: jest.fn(),
            findByYear: jest.fn(),
            getAvailableYears: jest.fn(),
            getCalendarMetadata: jest.fn(),
            getMinimal: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RaceEventsController>(RaceEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
