# JADTRA Consulting Backend API

Backend server for JADTRA Consulting website with email and Google Drive integration.

## Features

- **Email Service**: Send emails via RMail/S SMTP with contact form processing
- **Google Drive Integration**: Upload, list, and delete files from Google Drive
- **Security**: Rate limiting, CORS, helmet security headers
- **Validation**: Input validation using Joi
- **Error Handling**: Comprehensive error handling and logging

## Setup

### Prerequisites

- Node.js 18+
- Google Cloud Service Account with Drive API access
- RMail account or SMTP service

### Installation

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Install dependencies:
```bash
npm install
```

3. Configure Google Drive:
   - Create a Google Cloud project
   - Enable Google Drive API
   - Create a service account
   - Download service account key file
   - Share a Drive folder with the service account email

4. Configure RMail/SMTP:
   - Update `.env` with your email service credentials

### Environment Variables

```env
# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# RMail/SMTP
RMAIL_HOST=smtp.rmail.com
RMAIL_PORT=587
RMAIL_USER=your-username
RMAIL_PASS=your-password
RMAIL_FROM=noreply@jadtraconsulting.com
CONTACT_EMAIL=info@jadtraconsulting.com

# Google Drive
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./service-account.json
GOOGLE_DRIVE_FOLDER_ID=your-folder-id
```

## API Endpoints

### Email Service

#### POST `/api/email/send`
Send a custom email.

**Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "body": "Email content",
  "replyTo": "sender@example.com"
}
```

#### POST `/api/email/contact`
Process contact form submission with auto-reply.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62 21 0000 0000",
  "company": "Company Name",
  "message": "Your message here",
  "attachments": "Optional attachment info"
}
```

### Google Drive Service

#### POST `/api/drive/upload`
Upload file to Google Drive.

**Form Data:**
- `file`: File to upload (multipart/form-data)
- `folderId`: Optional target folder ID

#### GET `/api/drive/files`
List files from Google Drive.

**Query Parameters:**
- `folderId`: Optional folder ID to filter files

#### DELETE `/api/drive/files/:fileId`
Delete file from Google Drive.

#### GET `/api/drive/files/:fileId`
Get file information.

## Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Test
```bash
npm test
```

## Security Features

- Rate limiting (100 requests per 15 minutes per IP)
- CORS protection
- Helmet security headers
- Input validation
- File type restrictions
- File size limits (10MB)

## File Upload Support

Supported file types:
- PDF
- DOC, DOCX
- XLS, XLSX
- JPG, PNG

Maximum file size: 10MB

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Validation errors
- `404` - Resource not found
- `429` - Rate limit exceeded
- `500` - Internal server error

## Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Start the server: `npm start`

For production deployment, consider using:
- PM2 for process management
- Nginx as reverse proxy
- SSL certificates
- Environment variable management

## Monitoring

Health check endpoint: `GET /api/health`

Returns server status and timestamp.
