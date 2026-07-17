import { Test, TestingModule } from '@nestjs/testing';
import { RaceEventsService } from './race-events.service';
import { RaceEventPersistence } from './race-events.persistence';
import { WeatherService } from '../weather/weather.service';
import { RaceEventSearchService } from './helpers/race-event-search.service';

describe('RaceEventsService', () => {
  let service: RaceEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RaceEventsService,
        {
          provide: RaceEventPersistence,
          useValue: {
            findAvailableYears: jest.fn(),
            findEventById: jest.fn(),
            findAllEventsFiltered: jest.fn(),
            findFutureRaces: jest.fn(),
            findMinimalEvents: jest.fn(),
            findYearStats: jest.fn(),
          },
        },
        {
          provide: WeatherService,
          useValue: {
            getWeatherForCircuit: jest.fn(),
          },
        },
        {
          provide: RaceEventSearchService,
          useValue: {
            applySearch: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RaceEventsService>(RaceEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
