import { useState } from 'react';
import { uploadToDrive, listDriveFiles, deleteDriveFile, DriveFile, UploadResult } from '@/services/api';

export const useDrive = () => {
  const driveUploadEnabled = import.meta.env.VITE_ENABLE_DRIVE_UPLOAD === 'true';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);

  const uploadFile = async (file: File, folderId?: string): Promise<UploadResult | null> => {
    if (!driveUploadEnabled) {
      setError('File upload is temporarily disabled in this environment.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await uploadToDrive(file, folderId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async (folderId?: string) => {
    if (!driveUploadEnabled) {
      setError('File browser is temporarily disabled in this environment.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fileList = await listDriveFiles(folderId);
      setFiles(fileList);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch files';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId: string) => {
    if (!driveUploadEnabled) {
      setError('File deletion is temporarily disabled in this environment.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteDriveFile(fileId);
      setFiles(prev => prev.filter(file => file.id !== fileId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete file';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setFiles([]);
  };

  return {
    uploadFile,
    fetchFiles,
    deleteFile,
    loading,
    error,
    files,
    reset,
  };
};
