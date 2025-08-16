# Chat Palace - AI Assistant

## Project Overview

**Chat Palace** is a modern AI chat interface built with React, TypeScript, and Tailwind CSS. It provides a seamless chat experience with your AI assistant through a beautiful and responsive UI.

## How can I edit this code?

You can work with this project using your preferred IDE or development tools.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## API Integration

This chat application is integrated with a backend API. To configure the API endpoint:

1. Create a `.env` file in the root directory
2. Add the following environment variable:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
3. Replace the URL with your actual API endpoint

The application expects the API to have the following endpoints:
- `POST /api/chat` - Send a chat message and receive a response
- `GET /api/chat/history/:conversationId` - Get conversation history (optional)

API Request Format:
```json
{
  "message": "User's message",
  "conversationId": "optional-conversation-id"
}
```

API Response Format:
```json
{
  "message": "AI response message",
  "conversationId": "conversation-id",
  "error": "error message if any"
}
```

## How can I deploy this project?

You can deploy this project using any of these methods:

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop your build folder or connect your repo
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Any static hosting service**: Build with `npm run build` and upload the `dist` folder

## Development

This project uses modern web technologies and can be easily customized and extended.
