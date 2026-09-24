import { MailService } from "../mail.service.js";

export class MailServiceImpl implements MailService {
  public async sendMail(emailAddress: string, content: String): Promise<void> {
    return;
  }
}
