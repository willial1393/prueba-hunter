import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';
import { EnvironmentService } from '../environment/environment.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseService, EnvironmentService],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('insert message', () => {
    expect(
      service.insertMessage({
        id: Date.now().toString(),
        from: '+571234567890',
        to: '+570987654321',
        body: 'Hello World',
        status: 'sent',
        dateSent: new Date(),
        dateCreated: new Date(),
        apiVersion: 'v1',
        subresourceUris: {},
      }),
    ).resolves.not.toThrow();
  });

  it('get messages', function () {
    expect(service.getMessages('+570987654321', 10, 0)).resolves.toEqual([]);
  });
});
