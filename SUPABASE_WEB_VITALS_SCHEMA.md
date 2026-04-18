# Supabase Web Vitals Schema

## Table: web_vitals

```sql
-- Create web_vitals table
CREATE TABLE IF NOT EXISTS public.web_vitals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  delta NUMERIC NOT NULL,
  url TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  user_agent TEXT,
  device TEXT,
  connection TEXT,
  memory BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_web_vitals_url ON public.web_vitals(url);
CREATE INDEX IF NOT EXISTS idx_web_vitals_name ON public.web_vitals(name);
CREATE INDEX IF NOT EXISTS idx_web_vitals_created_at ON public.web_vitals(created_at);
CREATE INDEX IF NOT EXISTS idx_web_vitals_timestamp ON public.web_vitals(timestamp);

-- Add RLS policies
ALTER TABLE public.web_vitals ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert web vitals (for public tracking)
CREATE POLICY "Allow anonymous insert" ON public.web_vitals
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read web vitals (for admin dashboard)
CREATE POLICY "Allow authenticated read" ON public.web_vitals
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete web vitals (for cleanup)
CREATE POLICY "Allow authenticated delete" ON public.web_vitals
  FOR DELETE USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.web_vitals TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, DELETE ON public.web_vitals TO authenticated;
```

## Web Vitals Metrics

The system tracks the following Web Vitals:

- **LCP (Largest Contentful Paint)**: Loading performance
- **FID (First Input Delay)**: Interactivity
- **CLS (Cumulative Layout Shift)**: Visual stability
- **FCP (First Contentful Paint)**: Initial loading
- **TTFB (Time to First Byte)**: Server response time
- **INP (Interaction to Next Paint)**: Responsiveness (replaces FID)

## Data Structure

```typescript
interface WebVitalsData {
  id: string;           // Unique identifier for the measurement
  name: string;         // Metric name (e.g., 'LCP', 'FID', 'CLS')
  value: number;        // Metric value in milliseconds or score
  delta: number;        // Difference from previous measurement
  url: string;          // Page URL where measured
  timestamp: number;    // Unix timestamp of measurement
  userAgent?: string;   // Browser user agent
  device?: string;      // Device type (mobile, tablet, desktop)
  connection?: string;  // Network connection type
  memory?: number;      // Device memory in bytes
}
```

## Usage Examples

### Client-side tracking:
```javascript
import { postWebVitals } from '@/api/analytics/web-vitals';

// Track web vitals
const vitals = {
  id: 'unique-id',
  name: 'LCP',
  value: 2500,
  delta: 100,
  url: window.location.href,
  timestamp: Date.now()
};

await postWebVitals(vitals);
```

### Server-side analytics:
```javascript
import { getWebVitals } from '@/api/analytics/web-vitals';

// Get analytics data
const analytics = await getWebVitals({
  url: '/homepage',
  limit: 100
});

console.log(analytics.stats);
```

## Performance Considerations

- Data is automatically cleaned up after 90 days
- Use indexes for efficient querying
- Batch inserts for better performance
- Consider using edge functions for global tracking
