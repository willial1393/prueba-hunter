import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import { Message } from '../entities/message.entity';

export class TwilioMap {
  static toMessageEntity(message: MessageInstance): Message {
    return {
      id: message.sid,
      body: message.body,
      to: message.to.replace('whatsapp:', ''),
      from: message.from.replace('whatsapp:', ''),
      status: message.status,
      dateSent: message.dateSent,
      dateCreated: message.dateCreated,
      apiVersion: message.apiVersion,
      subresourceUris: message.subresourceUris,
    };
  }
}
