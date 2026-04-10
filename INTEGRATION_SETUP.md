# Integrasi RMail dan Google Drive Setup Guide

## Overview

Website JADTRA Consulting telah diintegrasikan dengan:
- **RMail/SMTP** untuk pengiriman email melalui contact form
- **Google Drive API** untuk upload dan management file

## Struktur Project

```
gold-grace-web/
frontend/
  src/
    services/api.ts          # API client untuk backend
    hooks/useEmail.ts        # Email functionality hook
    hooks/useDrive.ts        # Google Drive hook
    pages/Contact.tsx        # Contact form dengan integrasi
backend/
  src/
    index.ts                 # Main server file
    routes/email.ts          # Email endpoints
    routes/drive.ts          # Google Drive endpoints
  package.json              # Backend dependencies
  tsconfig.json             # TypeScript config
  .env.example              # Environment variables
```

## Setup Instructions

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan API endpoint
```

### 2. Backend Setup

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan konfigurasi RMail dan Google Drive
```

### 3. Google Drive Configuration

1. **Create Google Cloud Project**
   - Buka [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project atau pilih existing project

2. **Enable Google Drive API**
   - Go to "APIs & Services" > "Library"
   - Search "Google Drive API"
   - Click "Enable"

3. **Create Service Account**
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Fill details:
     - Name: `jadtra-drive-service`
     - Description: `Service account for JADTRA website file uploads`

4. **Generate Service Account Key**
   - Click on created service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Download and save as `service-account.json` in server folder

5. **Create and Share Drive Folder**
   - Create folder di Google Drive: "JADTRA Client Files"
   - Right-click folder > "Share"
   - Add service account email (from JSON file)
   - Give "Editor" permissions

### 4. RMail/SMTP Configuration

Update `.env` file di server folder:

```env
# RMail Configuration
RMAIL_HOST=smtp.rmail.com
RMAIL_PORT=587
RMAIL_USER=your-rmail-username
RMAIL_PASS=your-rmail-password
RMAIL_FROM=noreply@jadtraconsulting.com
CONTACT_EMAIL=info@jadtraconsulting.com
```

### 5. Running the Application

**Start Backend Server:**
```bash
cd server
npm run dev
```
Server akan running di `http://localhost:3001`

**Start Frontend:**
```bash
# Di root folder
npm run dev
```
Frontend akan running di `http://localhost:5173`

## Features Implementation

### Contact Form dengan Email Integration

Contact form sekarang memiliki:
- **Field tambahan**: Phone, Company
- **File upload**: Multiple files dengan drag & drop
- **Real-time validation**: Input validation dengan error handling
- **Auto-reply**: Email otomatis ke pengirim
- **File attachments**: Files diupload ke Google Drive dan link dikirim via email

### File Upload Features

- **Supported formats**: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
- **Maximum size**: 10MB per file
- **Multiple files**: Upload multiple files sekaligus
- **Progress indication**: Loading states dan error handling
- **Google Drive integration**: Files otomatis diupload ke shared folder

### Email Features

- **HTML email templates**: Professional email formatting
- **Contact form processing**: Structured data ke admin email
- **Auto-reply**: Confirmation email ke customer
- **Error handling**: Comprehensive error logging
- **Rate limiting**: Protection dari spam

## API Endpoints

### Email Service

- `POST /api/email/send` - Send custom email
- `POST /api/email/contact` - Process contact form

### Google Drive Service

- `POST /api/drive/upload` - Upload file ke Drive
- `GET /api/drive/files` - List files dari folder
- `DELETE /api/drive/files/:id` - Delete file
- `GET /api/drive/files/:id` - Get file info

## Security Features

- **Rate limiting**: 100 requests per 15 minutes per IP
- **CORS protection**: Cross-origin request security
- **Input validation**: Joi validation untuk semua inputs
- **File type restrictions**: Hanya file types yang diizinkan
- **File size limits**: Maximum 10MB per file
- **Helmet security**: HTTP security headers

## Testing

### Test Email Integration

1. Submit contact form di website
2. Check email di `info@jadtraconsulting.com`
3. Verify auto-reply ke pengirim email

### Test Google Drive Integration

1. Upload files melalui contact form
2. Check files di Google Drive folder
3. Verify file links di email notification

### Health Check

```bash
curl http://localhost:3001/api/health
```

## Troubleshooting

### Common Issues

1. **Email tidak terkirim**
   - Check RMail credentials di `.env`
   - Verify SMTP connection
   - Check server logs

2. **File upload gagal**
   - Verify Google Drive service account permissions
   - Check `service-account.json` path
   - Ensure folder is shared dengan service account

3. **CORS errors**
   - Check `FRONTEND_URL` di backend `.env`
   - Verify frontend URL matches

4. **TypeScript errors**
   - Run `npm install` di frontend dan backend
   - Check TypeScript versions compatibility

## Production Deployment

### Environment Variables

```env
# Production
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com

# Use secure SMTP
RMAIL_HOST=smtp.gmail.com
RMAIL_PORT=587
```

### Process Management

Gunakan PM2 untuk production:

```bash
npm install -g pm2
cd server
pm2 start npm --name "jadtra-api" -- run start
```

### SSL Configuration

Setup SSL certificate untuk production:
- Use Let's Encrypt untuk free SSL
- Configure Nginx sebagai reverse proxy
- Update CORS settings untuk HTTPS

## Maintenance

### Regular Tasks

- Monitor email delivery rates
- Check Google Drive storage usage
- Review error logs
- Update dependencies
- Backup service account keys

### Monitoring

- Check server health: `/api/health`
- Monitor API response times
- Track email delivery success rates
- Monitor file upload success rates

## Support

Untuk technical support:
1. Check server logs: `logs/` folder
2. Verify environment variables
3. Test API endpoints individually
4. Check Google Drive permissions
5. Verify RMail/SMTP connectivity
