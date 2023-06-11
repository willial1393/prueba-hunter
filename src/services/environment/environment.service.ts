import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EnvironmentService {
  twilioAccountSid = (): string => this.get('TWILIO_ACCOUNT_SID');

  twilioAuthToken = (): string => this.get('TWILIO_AUTH_TOKEN');

  twilioFromPhone = (): string => this.get('TWILIO_FROM_PHONE');

  twilioWebhookUrl = (): string =>
    this.get('TWILIO_WEBHOOK_URL') + '/messages/webhook';

  firebaseServiceAccount = (): any =>
    JSON.parse(this.get('FIREBASE_SERVICE_ACCOUNT'));

  private get(key: string): string {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable ${key}`);
    }
    return process.env[key];
  }
}
