// This is a demonstration file showing how the API integration works
// In a real project, you would use a testing framework like Jest or Vitest

import { ChatAPI, ChatRequest } from './api';

// Example usage of the ChatAPI
export const testAPI = async () => {
  try {
    const request: ChatRequest = {
      message: "Hello, how are you?",
      conversationId: undefined
    };

    console.log('Sending request:', request);
    
    const response = await ChatAPI.sendMessage(request);
    
    console.log('Received response:', response);
    
    return response;
  } catch (error) {
    console.error('API test failed:', error);
    throw error;
  }
};

// Example of how to handle different response scenarios
export const handleAPIResponse = (response: any) => {
  if (response.error) {
    console.error('API returned an error:', response.error);
    return { success: false, error: response.error };
  }
  
  if (response.message) {
    console.log('AI Response:', response.message);
    return { success: true, message: response.message };
  }
  
  return { success: false, error: 'Invalid response format' };
};

