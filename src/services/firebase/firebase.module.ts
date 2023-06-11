import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { EnvironmentService } from '../environment/environment.service';

@Module({
  providers: [FirebaseService, EnvironmentService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
