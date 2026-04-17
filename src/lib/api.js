// src/lib/api.js
import { supabase } from './supabase';

// API utility functions for common operations
export const api = {
  // Articles API
  articles: {
    // Get all articles
    getAll: async (options = {}) => {
      const { limit = 50, offset = 0, status = null, search = null } = options;
      
      let query = supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`);
      }

      const { data, error } = await query;
      return { data, error };
    },

    // Get article by ID
    getById: async (id) => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      return { data, error };
    },

    // Get article by slug
    getBySlug: async (slug) => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      return { data, error };
    },

    // Create new article
    create: async (articleData) => {
      const { data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single();

      return { data, error };
    },

    // Update article
    update: async (id, articleData) => {
      const { data, error } = await supabase
        .from('articles')
        .update({ ...articleData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      return { data, error };
    },

    // Delete article
    delete: async (id) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      return { error };
    },

    // Get published articles for public display
    getPublished: async (limit = 10) => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      return { data, error };
    },

    // Get featured articles
    getFeatured: async (limit = 5) => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      return { data, error };
    },

    // Increment view count
    incrementViews: async (id) => {
      const { error } = await supabase.rpc('increment_view_count', { article_uuid: id });
      return { error };
    }
  },

  // Contact Submissions API
  contacts: {
    // Get all contact submissions
    getAll: async (options = {}) => {
      const { limit = 50, offset = 0, status = null } = options;
      
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      return { data, error };
    },

    // Create new contact submission
    create: async (contactData) => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert(contactData)
        .select()
        .single();

      return { data, error };
    },

    // Update contact status
    updateStatus: async (id, status) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      return { error };
    },

    // Delete contact submission
    delete: async (id) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      return { error };
    }
  },

  // Tax Calculator API
  taxCalculator: {
    // Get all calculations
    getAll: async (options = {}) => {
      const { limit = 50, offset = 0 } = options;
      
      const { data, error } = await supabase
        .from('tax_calculator_history')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      return { data, error };
    },

    // Create new calculation record
    create: async (calculationData) => {
      const { data, error } = await supabase
        .from('tax_calculator_history')
        .insert(calculationData)
        .select()
        .single();

      return { data, error };
    },

    // Delete calculation record
    delete: async (id) => {
      const { error } = await supabase
        .from('tax_calculator_history')
        .delete()
        .eq('id', id);

      return { error };
    }
  },

  // Storage API for file uploads
  storage: {
    // Upload file to storage
    upload: async (bucket, path, file) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file);

      return { data, error };
    },

    // Get public URL for file
    getPublicUrl: async (bucket, path) => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      return { data };
    },

    // Delete file from storage
    delete: async (bucket, path) => {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      return { error };
    },

    // Upload article image
    uploadArticleImage: async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `article-images/${fileName}`;

      // Upload file
      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (error) return { data: null, error };

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      return { data: { publicUrl, path: filePath }, error: null };
    }
  },

  // Authentication API
  auth: {
    // Sign in with email and password
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { data, error };
    },

    // Sign out
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error };
    },

    // Get current session
    getCurrentSession: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      return { session, error };
    },

    // Get current user
    getCurrentUser: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error };
    },

    // Listen to auth state changes
    onAuthStateChange: (callback) => {
      return supabase.auth.onAuthStateChange(callback);
    }
  },

  // Utility functions
  utils: {
    // Generate slug from title
    generateSlug: (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    },

    // Calculate reading time
    calculateReadTime: (content) => {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      return Math.ceil(wordCount / wordsPerMinute);
    },

    // Format date
    formatDate: (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    // Handle API errors
    handleError: (error) => {
      console.error('API Error:', error);
      if (error?.message) {
        return error.message;
      }
      return 'An unexpected error occurred';
    },

    // Check if response is successful
    isSuccess: (response) => {
      return !response.error && response.data;
    }
  }
};

// Export default for convenience
export default api;
