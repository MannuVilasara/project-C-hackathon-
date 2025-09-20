# SecureBot 🔒

**Automated Security Analysis & Fixing Tool with GitHub App Integration**

SecureBot is an integrated application that combines GitHub App authentication with automated security scanning and AI-powered code fixing capabilities. It scans repositories for security vulnerabilities, automatically fixes them using AI, and creates pull requests with the fixes.

## 🚀 Features

- **GitHub App Integration**: Secure authentication and repository access
- **Automated Security Scanning**: Detects common security vulnerabilities
- **AI-Powered Fixing**: Uses Google's Generative AI to automatically fix issues
- **Pull Request Automation**: Creates pull requests with detailed fix information
- **Repository Management**: Clone and manage repositories programmatically
- **Comprehensive Logging**: Detailed logging for monitoring and debugging

## 🔍 Security Issues Detected

- **Critical Issues**:
  - `eval()` usage (code injection vulnerabilities)
  - Hardcoded secrets and credentials
- **High Severity**:
  - SQL injection risks
- **Medium Severity**:
  - Insecure HTTP requests
  - Weak cryptographic hashes (MD5, SHA1)
  - Missing input validation

## 📋 Prerequisites

1. **GitHub App**: Create a GitHub App with the following permissions:

   - Repository permissions: Contents (Read & Write), Pull requests (Write), Metadata (Read)
   - Account permissions: None required

2. **Google AI API Key**: Get an API key for Google's Generative AI service

3. **Node.js**: Version 18 or higher

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
cd securebot
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3000

# GitHub App Configuration
GITHUB_APP_ID=your_github_app_id
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
your_private_key_content_here
-----END RSA PRIVATE KEY-----"

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key

# GitHub App Installation URL (optional)
GITHUB_APP_INSTALL_URL=https://github.com/apps/your-app-name/installations/new
```

### 3. GitHub App Setup

1. Go to GitHub Settings > Developer settings > GitHub Apps
2. Click "New GitHub App"
3. Fill in the required information:
   - **App name**: `your-securebot-app`
   - **Homepage URL**: `http://localhost:3000`
   - **Webhook URL**: `http://localhost:3000/webhooks` (optional)
4. Set permissions:
   - Repository permissions:
     - Contents: Read & Write
     - Pull requests: Write
     - Metadata: Read
5. Generate a private key and save it
6. Note down the App ID

### 4. Install the GitHub App

1. Go to your GitHub App's public page
2. Click "Install App"
3. Select the repositories you want SecureBot to access

### 5. Get Google AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key to your `.env` file

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### 1. Health Check

```http
GET /api/health
```

### 2. Check Installation Status

```http
GET /api/installation/status?username=<github_username>
```

### 3. Scan Repository

```http
POST /api/scan
Content-Type: application/json

{
  "repoId": 123456789,
  "username": "your-github-username"
}
```

### 4. Fix Issues and Create PR

```http
POST /api/fix
Content-Type: application/json

{
  "repoId": 123456789,
  "username": "your-github-username"
}
```

### 5. List Cloned Repositories

```http
GET /api/repositories/cloned
```

## 🔄 Complete Workflow

### 1. Check App Installation

First, verify that the GitHub App is installed:

```bash
curl "http://localhost:3000/api/installation/status?username=your-username"
```

If not installed, the response will include an installation URL.

### 2. Scan Repository

Scan a repository for security issues:

```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{
    "repoId": 123456789,
    "username": "your-username"
  }'
```

### 3. Fix and Create PR

Apply fixes and create a pull request:

```bash
curl -X POST http://localhost:3000/api/fix \
  -H "Content-Type: application/json" \
  -d '{
    "repoId": 123456789,
    "username": "your-username"
  }'
```

## 📊 Response Format

### Successful Fix Response

```json
{
  "success": true,
  "message": "Security fixes applied and pull request created successfully",
  "repository": {
    "id": 123456789,
    "name": "example-repo",
    "full_name": "username/example-repo"
  },
  "scan_results": {
    "summary": {
      "critical": 2,
      "high": 1,
      "medium": 3,
      "total": 6,
      "riskLevel": "HIGH_RISK"
    },
    "issues": [...]
  },
  "fix_results": {
    "summary": {
      "totalIssues": 6,
      "successful": 5,
      "failed": 1,
      "skipped": 0,
      "successRate": "83%"
    }
  },
  "pull_request": {
    "id": 987654321,
    "number": 42,
    "title": "🔒 SecureBot: Automated Security Fixes",
    "html_url": "https://github.com/username/repo/pull/42"
  }
}
```

## 🛠️ Architecture

```
securebot/
├── src/
│   ├── controllers/        # Request handlers
│   │   └── secureBotController.js
│   ├── middleware/        # Custom middleware
│   │   └── checkAppInstallation.js
│   ├── routes/           # API routes
│   │   └── secureBotRoutes.js
│   ├── services/         # Business logic
│   │   ├── githubAppService.js
│   │   ├── repositoryService.js
│   │   └── securityService.js
│   └── index.js          # Main application
├── repos/                # Cloned repositories
├── package.json
├── .env.example
└── README.md
```

## 🔧 Components

- **GitHubAppService**: Handles GitHub App authentication and API calls
- **RepositoryService**: Manages repository cloning, branching, and PR creation
- **SecurityService**: Scans for vulnerabilities and applies AI-powered fixes
- **SecureBotController**: Orchestrates the complete workflow

## 🛡️ Security Considerations

1. **Environment Variables**: Never commit your `.env` file
2. **Private Key**: Store GitHub App private key securely
3. **API Keys**: Rotate Google AI API keys regularly
4. **Repository Access**: Only grant necessary permissions
5. **Input Validation**: All inputs are validated before processing

## 🐛 Troubleshooting

### Common Issues

1. **GitHub App Not Found**

   - Verify `GITHUB_APP_ID` is correct
   - Ensure the private key is properly formatted

2. **Permission Denied**

   - Check if the GitHub App is installed on the repository
   - Verify repository permissions

3. **AI Service Errors**

   - Validate `GOOGLE_AI_API_KEY` is correct
   - Check API quota limits

4. **Network Timeouts**
   - Large repositories may take longer to process
   - Consider increasing timeout values

## 📝 Example Usage

```javascript
// Check if app is installed
const installationStatus = await fetch(
  "http://localhost:3000/api/installation/status?username=myusername"
);

// Scan and fix repository
const fixResult = await fetch("http://localhost:3000/api/fix", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    repoId: 123456789,
    username: "myusername",
  }),
});

const result = await fixResult.json();
console.log("Pull Request created:", result.pull_request.html_url);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:

1. Check the troubleshooting section
2. Review the GitHub App permissions
3. Verify environment variables
4. Check server logs for detailed error messages

---

**SecureBot** - Keeping your code secure, one repository at a time! 🔒✨
