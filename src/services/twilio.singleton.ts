import { Twilio } from "twilio";

class TwilioClient {
  private static instance: TwilioClient | null = null;
  private readonly client: Twilio;

  private constructor() {
    const accountSid: string = process.env.TWILIO_ACCOUNT_SID;
    const authToken: string = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error("Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN");
    }

    this.client = new Twilio(accountSid, authToken);
  }

  public static getInstance(): TwilioClient {
    if (!this.instance) {
      this.instance = new TwilioClient();
    }
    return this.instance;
  }

  public getClient(): Twilio {
    return this.client;
  }
}

export default TwilioClient;
