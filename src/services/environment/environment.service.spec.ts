import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentService],
    }).compile();

    service = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the value of the environment variable', () => {
    const key = 'TWILIO_FROM_PHONE';
    const value = 'test';
    process.env[key] = value;
    expect(service.twilioFromPhone()).toBe(value);
  });
});
