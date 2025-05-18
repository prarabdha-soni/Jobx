import { config } from '../config';

interface WhatsAppMessage {
  messaging_product: string;
  to: string;
  type: string;
  text?: {
    body: string;
  };
  template?: {
    name: string;
    language: {
      code: string;
    };
    components?: Array<{
      type: string;
      parameters: Array<{
        type: string;
        text: string;
      }>;
    }>;
  };
}

class WhatsAppService {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = `https://graph.facebook.com/${config.whatsapp.apiVersion}`;
    this.headers = {
      'Authorization': `Bearer ${config.whatsapp.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  async sendMessage(phoneNumber: string, message: string): Promise<void> {
    const payload: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'text',
      text: {
        body: message
      }
    };

    try {
      const response = await fetch(
        `${this.baseUrl}/${config.whatsapp.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`WhatsApp API error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  async sendTemplateMessage(
    phoneNumber: string,
    templateName: string,
    parameters: Array<{ type: string; text: string }>
  ): Promise<void> {
    const payload: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: 'en'
        },
        components: [
          {
            type: 'body',
            parameters
          }
        ]
      }
    };

    try {
      const response = await fetch(
        `${this.baseUrl}/${config.whatsapp.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`WhatsApp API error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error sending WhatsApp template message:', error);
      throw error;
    }
  }

  async verifyWebhook(mode: string, token: string, challenge: string): Promise<string | null> {
    if (mode === 'subscribe' && token === config.whatsapp.verifyToken) {
      return challenge;
    }
    return null;
  }
}

export const whatsappService = new WhatsAppService(); 