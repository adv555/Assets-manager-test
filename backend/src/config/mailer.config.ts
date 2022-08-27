import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  return {
    transport: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || '587',
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'fitechmate@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'fintech123',
      },
    },
  };
};
