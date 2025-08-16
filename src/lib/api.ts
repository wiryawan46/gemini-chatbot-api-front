import { config } from './config';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ApiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ApiChatMessage[];
}

export interface ChatResponse {
  response: string;  // Changed from 'message' to 'response' to match backend
  conversationId?: string;
  error?: string;
}

const API_BASE_URL = 'http://localhost:3000/api';

export class ChatAPI {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${config.api.baseUrl}${endpoint}`;
    
    console.log('🌐 API Request:', {
      url,
      method: options.method || 'GET',
      headers: options.headers,
      body: options.body
    });
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      console.log('📡 API Response Status:', response.status, response.statusText);
      console.log('📡 API Response Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('✅ API Success Response:', responseData);
      return responseData;
    } catch (error) {
      console.error('💥 API request failed:', error);
      throw error;
    }
  }

  static async sendMessage(message: string, conversationId?: string): Promise<ChatResponse> {
    const request: ChatRequest = {
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    };
    
    return this.makeRequest<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  static async getConversationHistory(conversationId: string): Promise<ChatMessage[]> {
    return this.makeRequest<ChatMessage[]>(`/chat/history/${conversationId}`);
  }

  // Test method to check if API is reachable
  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${config.api.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.log('🔍 API Health Check Failed:', error);
      return false;
    }
  }
}
