export interface MailService {
  sendMail(emailAddress: string, content: String): Promise<void>;
}
