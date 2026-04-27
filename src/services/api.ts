import axios from 'axios';

// Vercel-first API routing. You can override with VITE_API_URL for local Express.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Email service types
export interface EmailData {
  to: string;
  subject: string;
  body: string;
  from?: string;
  replyTo?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  subject?: string;
  attachments?: string;
}

// Google Drive service types
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime: string;
  webViewLink?: string;
}

export interface UploadResult {
  fileId: string;
  fileName: string;
  webViewLink: string;
}

// Email API functions
export const sendEmail = async (data: EmailData): Promise<void> => {
  try {
    const response = await api.post('/email/send', data);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    await api.post('/contact', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      subject: formData.subject || `New Contact Form Submission from ${formData.name}`,
      message: formData.message,
      attachments: formData.attachments,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Google Drive API functions
export const uploadToDrive = async (file: File, folderId?: string): Promise<UploadResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) {
      formData.append('folderId', folderId);
    }

    const response = await api.post('/drive/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading to Drive:', error);
    throw error;
  }
};

export const listDriveFiles = async (folderId?: string): Promise<DriveFile[]> => {
  try {
    const params = folderId ? { folderId } : {};
    const response = await api.get('/drive/files', { params });
    return response.data;
  } catch (error) {
    console.error('Error listing Drive files:', error);
    throw error;
  }
};

export const deleteDriveFile = async (fileId: string): Promise<void> => {
  try {
    await api.delete(`/drive/files/${fileId}`);
  } catch (error) {
    console.error('Error deleting Drive file:', error);
    throw error;
  }
};

export default api;
