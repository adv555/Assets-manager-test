import { Injectable } from '@nestjs/common';

@Injectable()
export class sendMail {
  async sendActivationMail(email: string, link: string) {}
}
