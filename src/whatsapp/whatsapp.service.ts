import { Injectable, Logger } from '@nestjs/common';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { Twilio } from 'twilio';
import { GetAllWhatsappDto } from './dto/get-all-whatsapp.dto';
import { TwilioMap } from './maps/twilio.map';
import { EnvironmentService } from '../services/environment/environment.service';
import { Message } from './entities/message.entity';
import { TwilioMessage } from './entities/twilio-message';
import { FirebaseService } from '../services/firebase/firebase.service';

@Injectable()
export class WhatsappService {
  private client: Twilio;

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly firebaseService: FirebaseService,
  ) {
    this.client = new Twilio(
      environmentService.twilioAccountSid(),
      environmentService.twilioAuthToken(),
    );
  }

  async create(createWhatsappDto: CreateWhatsappDto): Promise<Message[]> {
    const res = await Promise.all(
      createWhatsappDto.to.map((to) => {
        return this.client.messages.create({
          body: createWhatsappDto.body,
          from: `whatsapp:${this.environmentService.twilioFromPhone()}`,
          to: `whatsapp:${to}`,
          mediaUrl: createWhatsappDto.mediaUrl,
          statusCallback: this.environmentService.twilioWebhookUrl(),
        });
      }),
    );
    const messages: Message[] = res.map((message) =>
      TwilioMap.toMessageEntity(message),
    );
    for (const message of messages) {
      await this.firebaseService.insertMessage(message);
    }
    return messages;
  }

  findAll(params: GetAllWhatsappDto): Promise<Message[]> {
    return this.firebaseService.getMessages(
      params.phone,
      params.limit,
      params.page,
    );
  }

  async receive(message: TwilioMessage): Promise<string> {
    const res = this.client.messages.get(message.MessageSid);
    const msg = await res.fetch();
    Logger.log({ msg });
    await this.firebaseService.insertMessage(TwilioMap.toMessageEntity(msg));
    return 'OK';
  }
}
