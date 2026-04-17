# Supabase Integration Guide - JADTRA Consulting

## **Setup Instructions**

---

## **Step 1: Create Supabase Project**

### **1. Sign Up/Login to Supabase**
- Go to: https://supabase.com
- Sign up atau login dengan GitHub/Google
- Create new project

### **2. Create Project**
- **Project Name**: `jadtra-consulting`
- **Database Password**: Generate secure password
- **Region**: Pilih region terdekat (Singapore/Asia Southeast)
- **Click**: "Create new project"

---

## **Step 2: Get Configuration**

### **1. Get Project URL**
```javascript
// Dashboard > Settings > API
// Copy Project URL
const SUPABASE_URL = "https://your-project-id.supabase.co"
```

### **2. Get Anon Key**
```javascript
// Dashboard > Settings > API
// Copy anon/public key
const SUPABASE_ANON_KEY = "your-anon-key-here"
```

---

## **Step 3: Configure Environment**

### **1. Create .env.local**
```bash
# Di root project
cp .env.example .env.local
```

### **2. Update .env.local**
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## **Step 4: Database Setup**

### **1. Create Tables**
```sql
-- Contact Form Submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded'))
);

-- Tax Calculator History
CREATE TABLE tax_calculator_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  monthly_salary DECIMAL(12,2) NOT NULL,
  tax_allowance DECIMAL(12,2) NOT NULL,
  ptkp_status TEXT NOT NULL,
  monthly_tax DECIMAL(12,2) NOT NULL,
  annual_tax DECIMAL(12,2) NOT NULL,
  take_home_pay DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);
```

### **2. Enable Row Level Security (RLS)**
```sql
-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_calculator_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert tax calculator history" ON tax_calculator_history
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert newsletter subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);
```

---

## **Step 5: Integration Examples**

### **1. Contact Form Integration**
```tsx
// src/components/ContactForm.tsx
import { supabase } from '@/lib/supabase'

export const ContactForm = () => {
  const handleSubmit = async (formData: FormData) => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message')
        });
      
      if (error) throw error;
      
      // Success handling
      alert('Message sent successfully!');
    } catch (error) {
      // Error handling
      alert('Error sending message. Please try again.');
    }
  };
  
  return (
    // Form JSX
  );
};
```

### **2. Tax Calculator Integration**
```tsx
// src/components/TaxCalculator.tsx
import { supabase } from '@/lib/supabase'

export const TaxCalculator = () => {
  const saveCalculation = async (calculationData: any) => {
    try {
      const { data, error } = await supabase
        .from('tax_calculator_history')
        .insert(calculationData);
      
      if (error) throw error;
      
      // Success handling
    } catch (error) {
      // Error handling
    }
  };
  
  return (
    // Calculator JSX
  );
};
```

---

## **Step 6: Testing**

### **1. Test Connection**
```tsx
// src/lib/test-supabase.ts
import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('count')
      .single();
    
    console.log('Supabase connection test:', { data, error });
    return !error;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};
```

### **2. Test Data Insert**
```tsx
// Test data insertion
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+628123456789',
  message: 'Test message'
};

const { data, error } = await supabase
  .from('contact_submissions')
  .insert(testData);

console.log('Test insert result:', { data, error });
```

---

## **Step 7: Production Deployment**

### **1. Environment Variables in Vercel**
```bash
# Add to Vercel Environment Variables
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### **2. Security Best Practices**
- **Never expose service role key** in frontend
- **Use Row Level Security (RLS)** for data protection
- **Implement proper error handling**
- **Validate all input data**

---

## **Step 8: Advanced Features**

### **1. Real-time Subscriptions**
```tsx
// Real-time contact form updates
const subscription = supabase
  .channel('contact_submissions')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'contact_submissions' },
    (payload) => {
      console.log('New contact submission:', payload);
      // Handle real-time updates
    }
  )
  .subscribe();
```

### **2. File Upload**
```tsx
// Upload files to Supabase Storage
const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(`public/${file.name}`, file);
  
  return { data, error };
};
```

---

## **Troubleshooting**

### **Common Issues:**

#### **1. CORS Error**
```sql
-- Enable CORS in Supabase
-- Dashboard > Settings > API > CORS
-- Add your domain: https://jadtraconsulting.com
```

#### **2. RLS Policy Issues**
```sql
-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'contact_submissions';
```

#### **3. Connection Issues**
```bash
# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

---

## **Next Steps**

### **Integration Roadmap:**
1. **Contact Form** - Save submissions to database
2. **Tax Calculator** - Save calculation history
3. **Newsletter** - Manage subscriber list
4. **Admin Dashboard** - View and manage submissions
5. **Analytics** - Track form submissions and usage

---

## **Support**

### **Resources:**
- **Supabase Docs**: https://supabase.com/docs
- **React Integration**: https://supabase.com/docs/guides/getting-started/quickstarts/react
- **Database Guide**: https://supabase.com/docs/guides/database

**Supabase integration ready for JADTRA Consulting!**
