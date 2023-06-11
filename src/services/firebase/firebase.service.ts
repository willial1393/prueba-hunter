import { Injectable, Scope } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { EnvironmentService } from '../environment/environment.service';
import { Message } from '../../whatsapp/entities/message.entity';
import { PhoneUtils } from '../../utils/phone.utils';

@Injectable({ scope: Scope.DEFAULT })
export class FirebaseService {
  private readonly app: admin.app.App;

  constructor(private readonly environmentService: EnvironmentService) {
    if (this.app) return;
    this.app = admin.initializeApp({
      credential: admin.credential.cert(
        environmentService.firebaseServiceAccount(),
      ),
    });
  }

  async insertMessage(message: Message): Promise<void> {
    await this.app
      .firestore()
      .collection(PhoneUtils.normalize(message.to))
      .doc(message.id)
      .set(message);
    await this.app
      .firestore()
      .collection(PhoneUtils.normalize(message.from))
      .doc(message.id)
      .set(message);
  }

  async getMessages(
    phone: string,
    limit: number,
    page: number,
  ): Promise<Message[]> {
    const messages = await this.app
      .firestore()
      .collection(PhoneUtils.normalize(phone))
      .orderBy('dateCreated', 'desc')
      .offset(page * limit)
      .limit(limit)
      .get();
    return messages.docs.map((doc) => doc.data() as Message);
  }
}
