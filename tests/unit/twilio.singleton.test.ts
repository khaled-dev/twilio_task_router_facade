import TwilioClient from '../../src/services/twilio.singleton'; // Adjust the import path as necessary
import { Twilio } from 'twilio';

jest.mock('twilio', () => {
  const originalModule = jest.requireActual('twilio');

  return {
    __esModule: true,
    ...originalModule,
    Twilio: jest.fn(),
  };
});

describe('TwilioClient', () => {
  beforeEach(() => {
    process.env.TWILIO_ACCOUNT_SID = 'test_sid';
    process.env.TWILIO_AUTH_TOKEN = 'test_auth_token';
  });

  afterAll(() => {
    delete process.env.TWILIO_ACCOUNT_SID;
    delete process.env.TWILIO_AUTH_TOKEN;
    jest.clearAllMocks();
  });

  it('should create a single instance of TwilioClient', () => {
    const instance1 = TwilioClient.getInstance();
    const instance2 = TwilioClient.getInstance();

    expect(instance1).toBe(instance2);
  });

  it('should throw an error if environment variables are not set', () => {
    delete process.env.TWILIO_ACCOUNT_SID;
    delete process.env.TWILIO_AUTH_TOKEN;

    expect(() => new TwilioClient()).toThrow("Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN");
  });

  it('should return the Twilio client instance', () => {
    const twilioClientInstance = TwilioClient.getInstance();
    const client = twilioClientInstance.getClient();

    expect(client).toBeDefined();
    expect(Twilio).toHaveBeenCalledWith(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  });
});