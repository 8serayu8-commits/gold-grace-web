// src/api/analytics/web-vitals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Web Vitals interface
interface WebVitalsData {
  id: string;
  name: string;
  value: number;
  delta: number;
  id: string;
  url: string;
  timestamp: number;
  userAgent?: string;
  device?: string;
  connection?: string;
  memory?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { id, name, value, delta, url, timestamp } = body;
    
    if (!id || !name || value === undefined || !url || !timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: id, name, value, url, timestamp' },
        { status: 400 }
      );
    }

    // Get additional context from request
    const userAgent = request.headers.get('user-agent') || undefined;
    const device = request.headers.get('x-device') || undefined;
    const connection = request.headers.get('x-connection') || undefined;
    const memory = request.headers.get('x-memory') ? 
      parseInt(request.headers.get('x-memory')!) : undefined;

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
      return NextResponse.json(
        { error: 'Failed to store web vitals data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      message: 'Web vitals recorded successfully'
    });

  } catch (error) {
    console.error('Web vitals API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const name = searchParams.get('name');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

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
      return NextResponse.json(
        { error: 'Failed to fetch web vitals data' },
        { status: 500 }
      );
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

    return NextResponse.json({
      success: true,
      data,
      stats,
      total: data.length
    });

  } catch (error) {
    console.error('Web vitals GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const olderThan = searchParams.get('olderThan'); // ISO date string
    const url = searchParams.get('url');

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
      return NextResponse.json(
        { error: 'Failed to delete web vitals data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Web vitals data deleted successfully'
    });

  } catch (error) {
    console.error('Web vitals DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
