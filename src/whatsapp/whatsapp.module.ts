import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { EnvironmentService } from '../services/environment/environment.service';
import { FirebaseModule } from '../services/firebase/firebase.module';

@Module({
  controllers: [WhatsappController],
  providers: [WhatsappService, EnvironmentService],
  imports: [FirebaseModule],
})
export class WhatsappModule {}
