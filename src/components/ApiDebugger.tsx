import React, { useState } from 'react';
import { ChatAPI, ChatRequest } from '@/lib/api';
import { config } from '@/lib/config';

export const ApiDebugger: React.FC = () => {
  const [testMessage, setTestMessage] = useState('Hello, this is a test message');
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResult('');
    
    try {
      console.log('🔍 Testing API connection...');
      console.log('📍 API Base URL:', config.api.baseUrl);
      
      // Test 1: Check if API endpoint is reachable
      const healthCheck = await ChatAPI.testConnection();
      console.log('🏥 Health Check Result:', healthCheck);
      
      if (!healthCheck) {
        setTestResult('❌ API endpoint not reachable. Check if your backend is running at http://localhost:3000');
        return;
      }
      
      // Test 2: Try to send a message
      const request: ChatRequest = {
        messages: [
          {
            role: 'user',
            content: testMessage
          }
        ]
      };
      
      console.log('📤 Sending test message:', request);
      const response = await ChatAPI.sendMessage(testMessage);
      console.log('📥 Received response:', response);
      
      setTestResult(`✅ API test successful!\n\nRequest: ${JSON.stringify(request, null, 2)}\n\nResponse: ${JSON.stringify(response, null, 2)}`);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('💥 API test failed:', error);
      setTestResult(`❌ API test failed:\n\n${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">🔧 API Debugger</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Test Message:
          </label>
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a test message"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={testApiConnection}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Testing...' : 'Test API Connection'}
          </button>
          
          <button
            onClick={() => setTestResult('')}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Clear Results
          </button>
        </div>
        
        {testResult && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Results:
            </label>
            <pre className="bg-white border border-gray-300 rounded-md p-3 text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
              {testResult}
            </pre>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p><strong>Current API URL:</strong> {config.api.baseUrl}</p>
          <p><strong>Expected Endpoint:</strong> POST {config.api.baseUrl}/chat</p>
        </div>
      </div>
    </div>
  );
};
