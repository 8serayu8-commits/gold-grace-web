// src/api/analytics/web-vitals.js
import { supabase } from '@/lib/supabase';

// Web Vitals interface
const WebVitalsData = {
  id: '',
  name: '',
  value: 0,
  delta: 0,
  url: '',
  timestamp: 0,
  userAgent: '',
  device: '',
  connection: '',
  memory: 0
};

// POST /api/analytics/web-vitals
export const postWebVitals = async (webVitalsData) => {
  try {
    // Validate required fields
    const { id, name, value, delta, url, timestamp } = webVitalsData;
    
    if (!id || !name || value === undefined || !url || !timestamp) {
      return {
        success: false,
        error: 'Missing required fields: id, name, value, url, timestamp',
        status: 400
      };
    }

    // Get additional context
    const userAgent = navigator.userAgent;
    const device = getDeviceType();
    const connection = getConnectionType();
    const memory = getMemoryInfo();

    // Prepare data for Supabase
    const webVitalsRecord = {
      id,
      name,
      value,
      delta,
      url,
      timestamp: new Date(timestamp).toISOString(),
      user_agent: userAgent,
      device,
      connection,
      memory,
      created_at: new Date().toISOString()
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('web_vitals')
      .insert([webVitalsRecord])
      .select();

    if (error) {
      console.error('Error inserting web vitals:', error);
      return {
        success: false,
        error: 'Failed to store web vitals data',
        status: 500
      };
    }

    return {
      success: true,
      data: data[0],
      message: 'Web vitals recorded successfully'
    };

  } catch (error) {
    console.error('Web vitals API error:', error);
    return {
      success: false,
      error: 'Internal server error',
      status: 500
    };
  }
};

// GET /api/analytics/web-vitals
export const getWebVitals = async (filters = {}) => {
  try {
    const { url, name, limit = 100, offset = 0 } = filters;

    let query = supabase
      .from('web_vitals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    // Apply filters
    if (url) {
      query = query.eq('url', url);
    }
    if (name) {
      query = query.eq('name', name);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching web vitals:', error);
      return {
        success: false,
        error: 'Failed to fetch web vitals data',
        status: 500
      };
    }

    // Calculate statistics
    const stats = data.reduce((acc, record) => {
      if (!acc[record.name]) {
        acc[record.name] = {
          count: 0,
          avg: 0,
          min: Infinity,
          max: -Infinity,
          latest: 0
        };
      }
      
      const stat = acc[record.name];
      stat.count++;
      stat.avg = (stat.avg * (stat.count - 1) + record.value) / stat.count;
      stat.min = Math.min(stat.min, record.value);
      stat.max = Math.max(stat.max, record.value);
      
      if (record.timestamp > stat.latest) {
        stat.latest = record.value;
      }
      
      return acc;
    }, {});

    return {
      success: true,
      data,
      stats,
      total: data.length
    };

  } catch (error) {
    console.error('Web vitals GET error:', error);
    return {
      success: false,
      error: 'Internal server error',
      status: 500
    };
  }
};

// DELETE /api/analytics/web-vitals
export const deleteWebVitals = async (filters = {}) => {
  try {
    const { olderThan, url } = filters;

    let query = supabase.from('web_vitals').delete();

    if (olderThan) {
      query = query.lt('created_at', olderThan);
    }
    if (url) {
      query = query.eq('url', url);
    }

    const { error } = await query;

    if (error) {
      console.error('Error deleting web vitals:', error);
      return {
        success: false,
        error: 'Failed to delete web vitals data',
        status: 500
      };
    }

    return {
      success: true,
      message: 'Web vitals data deleted successfully'
    };

  } catch (error) {
    console.error('Web vitals DELETE error:', error);
    return {
      success: false,
      error: 'Internal server error',
      status: 500
    };
  }
};

// Utility functions
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
};

const getConnectionType = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection ? connection.effectiveType : 'unknown';
  }
  return 'unknown';
};

const getMemoryInfo = () => {
  if ('deviceMemory' in navigator) {
    return navigator.deviceMemory * 1024 * 1024 * 1024; // Convert GB to bytes
  }
  return null;
};

// Export default object
export default {
  postWebVitals,
  getWebVitals,
  deleteWebVitals
};
