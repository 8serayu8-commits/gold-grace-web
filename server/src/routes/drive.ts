import { Router } from 'express';
import { google } from 'googleapis';
import multer from 'multer';
import Joi from 'joi';
import fs from 'fs';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, JPG, PNG are allowed.'));
    }
  },
});

// Google Drive authentication
const getDriveClient = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  return google.drive({ version: 'v3', auth });
};

// Upload validation schema
const uploadSchema = Joi.object({
  folderId: Joi.string().optional(),
});

// Upload file to Google Drive
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { error, value } = uploadSchema.validate(req.body);
    
    if (error) {
      // Clean up uploaded file if validation fails
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details[0].message 
      });
    }

    const drive = getDriveClient();
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    const fileMetadata = {
      name: fileName,
      parents: value.folderId ? [value.folderId] : undefined,
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,name,webViewLink,size,createdTime',
    });

    // Make file publicly readable (optional)
    await drive.permissions.create({
      fileId: response.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Clean up temporary file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      webViewLink: response.data.webViewLink,
      size: response.data.size,
      createdTime: response.data.createdTime,
    });

  } catch (error: any) {
    console.error('Drive upload error:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: 'Failed to upload file to Google Drive',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

// List files from Google Drive
router.get('/files', async (req, res) => {
  try {
    const { folderId } = req.query;
    
    const drive = getDriveClient();
    
    let query = "trashed=false";
    if (folderId && typeof folderId === 'string') {
      query += ` and '${folderId}' in parents`;
    }

    const response = await drive.files.list({
      q: query,
      fields: 'files(id,name,mimeType,size,createdTime,webViewLink)',
      orderBy: 'createdTime desc',
      pageSize: 50,
    });

    const files = response.data.files?.map(file => ({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
      size: file.size || undefined,
      createdTime: file.createdTime!,
      webViewLink: file.webViewLink || undefined,
    })) || [];

    res.json(files);

  } catch (error: any) {
    console.error('Drive list error:', error);
    res.status(500).json({ 
      error: 'Failed to list files from Google Drive',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

// Delete file from Google Drive
router.delete('/files/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    
    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }

    const drive = getDriveClient();
    
    await drive.files.delete({
      fileId: fileId,
    });

    res.json({ 
      success: true, 
      message: 'File deleted successfully' 
    });

  } catch (error: any) {
    console.error('Drive delete error:', error);
    res.status(500).json({ 
      error: 'Failed to delete file from Google Drive',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

// Get file info
router.get('/files/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    
    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }

    const drive = getDriveClient();
    
    const response = await drive.files.get({
      fileId: fileId,
      fields: 'id,name,mimeType,size,createdTime,webViewLink',
    });

    const file = {
      id: response.data.id!,
      name: response.data.name!,
      mimeType: response.data.mimeType!,
      size: response.data.size || undefined,
      createdTime: response.data.createdTime!,
      webViewLink: response.data.webViewLink || undefined,
    };

    res.json(file);

  } catch (error: any) {
    console.error('Drive get file error:', error);
    res.status(500).json({ 
      error: 'Failed to get file info from Google Drive',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

export { router as driveRoutes };
