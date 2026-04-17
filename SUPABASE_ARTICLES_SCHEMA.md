# Supabase Articles Schema - JADTRA Consulting

## **Database Schema for Articles Management**

---

## **Articles Table**

### **SQL Schema:**
```sql
-- Create articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER DEFAULT 5, -- in minutes
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_author_id ON articles(author_id);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at 
  BEFORE UPDATE ON articles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## **Storage Bucket for Images**

### **Create Storage Bucket:**
```sql
-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload article images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'article-images' AND 
  auth.role() = 'authenticated'
);

-- Allow authenticated users to read images
CREATE POLICY "Anyone can view article images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'article-images'
);

-- Allow authenticated users to update their own images
CREATE POLICY "Authenticated users can update their article images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'article-images' AND 
  auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own images
CREATE POLICY "Authenticated users can delete their article images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'article-images' AND 
  auth.role() = 'authenticated'
);
```

---

## **Row Level Security (RLS)**

### **Enable RLS:**
```sql
-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow authenticated users to read published articles
CREATE POLICY "Anyone can read published articles" ON articles
FOR SELECT USING (
  status = 'published'
);

-- Allow authenticated users to read all articles
CREATE POLICY "Authenticated users can read all articles" ON articles
FOR SELECT USING (
  auth.role() = 'authenticated'
);

-- Allow authenticated users to insert articles
CREATE POLICY "Authenticated users can create articles" ON articles
FOR INSERT WITH CHECK (
  auth.role() = 'authenticated'
);

-- Allow article authors to update their own articles
CREATE POLICY "Authors can update their own articles" ON articles
FOR UPDATE USING (
  auth.uid() = author_id
);

-- Allow article authors to delete their own articles
CREATE POLICY "Authors can delete their own articles" ON articles
FOR DELETE USING (
  auth.uid() = author_id
);

-- Allow super admins to manage all articles
CREATE POLICY "Super admins can manage all articles" ON articles
ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'super_admin'
  )
);
```

---

## **Article Categories (Optional)**

### **Categories Table:**
```sql
-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create junction table for article-category relationships
CREATE TABLE article_categories (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- Enable RLS for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Anyone can read categories" ON categories
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage categories" ON categories
ALL USING (auth.role() = 'authenticated');

-- Article categories policies
CREATE POLICY "Anyone can read article categories" ON article_categories
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage article categories" ON article_categories
ALL USING (auth.role() = 'authenticated');
```

---

## **Article Views Tracking**

### **Views Table:**
```sql
-- Create article views table
CREATE TABLE article_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;

-- Views policies
CREATE POLICY "Anyone can track article views" ON article_views
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read article views" ON article_views
FOR SELECT USING (true);

-- Create index for performance
CREATE INDEX idx_article_views_article_id ON article_views(article_id);
CREATE INDEX idx_article_views_viewed_at ON article_views(viewed_at);
```

---

## **Sample Data**

### **Insert Sample Articles:**
```sql
-- Insert sample categories
INSERT INTO categories (name, slug, description, color) VALUES
('Tax Advisory', 'tax-advisory', 'Articles about tax regulations and advisory', '#10b981'),
('Business Consulting', 'business-consulting', 'Business strategy and consulting articles', '#3b82f6'),
('Digital Transformation', 'digital-transformation', 'Digital transformation and technology articles', '#8b5cf6');

-- Insert sample articles
INSERT INTO articles (title, slug, content, excerpt, status, published_at, read_time, tags) VALUES
(
  'Understanding PPh 21 Tax Regulations 2024',
  'understanding-pph-21-tax-regulations-2024',
  '# Comprehensive Guide to PPh 21

The Indonesian PPh 21 tax regulations have undergone significant changes in 2024. This comprehensive guide covers everything you need to know about the latest updates...

## Key Changes in 2024

### 1. Tax Rate Adjustments
- New tax brackets for 2024
- Updated deduction limits
- Changes in non-taxable income

### 2. Compliance Requirements
- New reporting deadlines
- Updated documentation requirements
- Digital submission processes

## Implementation Guide

### For Employers
- Updated tax calculation methods
- New reporting formats
- Compliance timelines

### For Employees
- Understanding tax deductions
- Filing procedures
- Tax planning strategies

## Conclusion

Stay informed about the latest PPh 21 regulations to ensure compliance and optimize your tax position.',
  'Comprehensive guide to PPh 21 tax regulations for 2024, including new tax brackets, compliance requirements, and implementation strategies for both employers and employees.',
  'published',
  '2024-01-15T10:00:00Z',
  8,
  ARRAY['PPh 21', 'Tax', '2024', 'Regulations']
),
(
  'Digital Transformation Strategies for Small Businesses',
  'digital-transformation-strategies-small-businesses',
  '# Digital Transformation for Small Businesses

In today''s rapidly evolving digital landscape, small businesses must embrace digital transformation to remain competitive...

## Why Digital Transformation Matters

### Market Competitiveness
- Customer expectations
- Operational efficiency
- Business agility

### Technology Adoption
- Cloud computing
- Automation tools
- Data analytics

## Implementation Strategies

### Phase 1: Assessment
- Current state analysis
- Technology gap identification
- Resource evaluation

### Phase 2: Planning
- Roadmap development
- Budget allocation
- Team training

### Phase 3: Execution
- Technology implementation
- Process optimization
- Change management

## Success Stories

Learn from other small businesses that have successfully transformed their operations...

## Conclusion

Digital transformation is not just about technology; it''s about reimagining your business for the digital age.',
  'Learn how small businesses can successfully implement digital transformation strategies to improve competitiveness and operational efficiency.',
  'published',
  '2024-01-20T14:00:00Z',
  10,
  ARRAY['Digital Transformation', 'Small Business', 'Strategy', 'Technology']
);
```

---

## **API Functions**

### **Database Functions:**
```sql
-- Function to generate unique slugs
CREATE OR REPLACE FUNCTION generate_unique_slug(base_title TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  counter INTEGER := 1;
  final_slug TEXT;
BEGIN
  -- Generate base slug
  base_slug := lower(regexp_replace(base_title, '[^a-zA-Z0-9\s-]', '', 'g'));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  base_slug := trim(base_slug, '-');
  
  -- Check if slug exists and make unique
  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM articles WHERE slug = final_slug) LOOP
    final_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Function to update view count
CREATE OR REPLACE FUNCTION increment_view_count(article_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles 
  SET view_count = view_count + 1 
  WHERE id = article_uuid;
END;
$$ LANGUAGE plpgsql;
```

---

## **Setup Instructions**

### **1. Run SQL Scripts:**
```bash
# Connect to your Supabase project
# Go to SQL Editor
# Run each script in order:
# 1. Articles table creation
# 2. Storage bucket setup
# 3. RLS policies
# 4. Optional categories
# 5. Views tracking
# 6. Sample data
```

### **2. Configure Storage:**
```bash
# In Supabase Dashboard:
# 1. Go to Storage
# 2. Create bucket: article-images
# 3. Set up CORS policy
# 4. Configure bucket policies
```

### **3. Test Setup:**
```bash
# Test table creation
SELECT * FROM articles LIMIT 1;

# Test RLS policies
SELECT * FROM articles WHERE status = 'published';

# Test storage policies
SELECT * FROM storage.objects WHERE bucket_id = 'article-images';
```

---

## **Next Steps**

### **Frontend Integration:**
- Connect AdminArticles component to Supabase
- Implement CRUD operations
- Add image upload functionality
- Test full workflow

### **Security Considerations:**
- Review RLS policies
- Test user permissions
- Validate input data
- Implement rate limiting

**Articles database schema ready for implementation!**
