export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 30000, // 30 seconds
  },
  chat: {
    maxRetries: 3,
    retryDelay: 1000, // 1 second
  },
};

