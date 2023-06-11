import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { EnvironmentService } from './services/environment/environment.service';
import { FirebaseModule } from './services/firebase/firebase.module';

@Module({
  imports: [AppModule, WhatsappModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService, EnvironmentService],
})
export class AppModule {}
