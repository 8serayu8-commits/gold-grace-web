// Advanced Caching Strategy for High Performance
// Multi-layer caching with intelligent invalidation

export interface CacheConfig {
  strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate' | 'network-only';
  ttl: number; // Time to live in milliseconds
  maxAge: number; // Maximum age before forced refresh
  maxSize: number; // Maximum cache size in MB
  compression: boolean;
  encryption: boolean;
}

export interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
  etag?: string;
  compressed?: boolean;
  encrypted?: boolean;
  accessCount: number;
  lastAccessed: number;
  version: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
  oldestEntry: number;
  newestEntry: number;
}

// Cache configurations for different data types
const CACHE_CONFIGS: Record<string, CacheConfig> = {
  // Static assets - long cache
  static: {
    strategy: 'cache-first',
    ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxSize: 100, // 100MB
    compression: true,
    encryption: false
  },
  
  // API responses - medium cache
  api: {
    strategy: 'stale-while-revalidate',
    ttl: 5 * 60 * 1000, // 5 minutes
    maxAge: 30 * 60 * 1000, // 30 minutes
    maxSize: 50, // 50MB
    compression: true,
    encryption: false
  },
  
  // User data - short cache
  user: {
    strategy: 'network-first',
    ttl: 2 * 60 * 1000, // 2 minutes
    maxAge: 10 * 60 * 1000, // 10 minutes
    maxSize: 10, // 10MB
    compression: false,
    encryption: true
  },
  
  // SEO data - medium cache
  seo: {
    strategy: 'cache-first',
    ttl: 24 * 60 * 60 * 1000, // 24 hours
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxSize: 20, // 20MB
    compression: true,
    encryption: false
  },
  
  // Analytics data - short cache
  analytics: {
    strategy: 'network-first',
    ttl: 30 * 1000, // 30 seconds
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxSize: 5, // 5MB
    compression: true,
    encryption: true
  }
};

class AdvancedCacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private config: CacheConfig;
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    size: 0,
    hitRate: 0,
    oldestEntry: 0,
    newestEntry: 0
  };
  
  constructor(config: CacheConfig) {
    this.config = config;
    this.initializeCache();
  }
  
  private initializeCache() {
    // Load cache from localStorage if available
    if (typeof window !== 'undefined') {
      try {
        const savedCache = localStorage.getItem(`advanced-cache-${this.config.strategy}`);
        if (savedCache) {
          const parsed = JSON.parse(savedCache);
          this.cache = new Map(parsed.entries);
          this.updateStats();
        }
      } catch (error) {
        console.warn('Failed to load cache from localStorage:', error);
      }
    }
  }
  
  private saveCache() {
    if (typeof window !== 'undefined') {
      try {
        const cacheData = {
          entries: Array.from(this.cache.entries()),
          timestamp: Date.now()
        };
        localStorage.setItem(`advanced-cache-${this.config.strategy}`, JSON.stringify(cacheData));
      } catch (error) {
        console.warn('Failed to save cache to localStorage:', error);
      }
    }
  }
  
  private updateStats() {
    const now = Date.now();
    let oldest = now;
    let newest = 0;
    let totalSize = 0;
    
    this.cache.forEach((entry) => {
      oldest = Math.min(oldest, entry.timestamp);
      newest = Math.max(newest, entry.timestamp);
      totalSize += this.getEntrySize(entry);
    });
    
    this.stats = {
      hits: this.stats.hits,
      misses: this.stats.misses,
      size: totalSize,
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0,
      oldestEntry: oldest,
      newestEntry: newest
    };
  }
  
  private getEntrySize(entry: CacheEntry): number {
    return JSON.stringify(entry).length * 2; // Rough estimate in bytes
  }
  
  private compressData(data: any): string {
    if (!this.config.compression) return JSON.stringify(data);
    
    // Simple compression simulation (in production, use proper compression library)
    return JSON.stringify(data);
  }
  
  private decompressData(compressed: string): any {
    return JSON.parse(compressed);
  }
  
  private encryptData(data: string): string {
    if (!this.config.encryption) return data;
    
    // Simple encryption simulation (in production, use proper encryption)
    return btoa(data);
  }
  
  private decryptData(encrypted: string): string {
    if (!this.config.encryption) return encrypted;
    
    return atob(encrypted);
  }
  
  private isExpired(entry: CacheEntry): boolean {
    const now = Date.now();
    return (now - entry.timestamp) > entry.ttl;
  }
  
  private isStale(entry: CacheEntry): boolean {
    const now = Date.now();
    return (now - entry.timestamp) > this.config.maxAge;
  }
  
  private shouldEvict(): boolean {
    const totalSize = Array.from(this.cache.values())
      .reduce((sum, entry) => sum + this.getEntrySize(entry), 0);
    
    return totalSize > (this.config.maxSize * 1024 * 1024); // Convert MB to bytes
  }
  
  private evictLeastUsed() {
    const entries = Array.from(this.cache.entries())
      .sort((a, b) => a[1].accessCount - b[1].accessCount);
    
    // Remove 25% of least used entries
    const toRemove = Math.ceil(entries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(entries[i][0]);
    }
  }
  
  async get(key: string): Promise<any | null> {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      this.updateStats();
      return null;
    }
    
    // Check if expired
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.misses++;
      this.updateStats();
      return null;
    }
    
    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    
    // Decompress and decrypt if needed
    let data = entry.data;
    if (entry.encrypted) {
      data = this.decryptData(data);
    }
    if (entry.compressed) {
      data = this.decompressData(data);
    }
    
    this.stats.hits++;
    this.updateStats();
    
    return data;
  }
  
  async set(key: string, data: any, customTTL?: number): Promise<void> {
    const ttl = customTTL || this.config.ttl;
    const now = Date.now();
    
    let processedData = JSON.stringify(data);
    
    // Compress if enabled
    const compressed = this.config.compression;
    if (compressed) {
      processedData = this.compressData(data);
    }
    
    // Encrypt if enabled
    const encrypted = this.config.encryption;
    if (encrypted) {
      processedData = this.encryptData(processedData);
    }
    
    const entry: CacheEntry = {
      data: processedData,
      timestamp: now,
      ttl,
      compressed,
      encrypted,
      accessCount: 0,
      lastAccessed: now,
      version: '1.0.0'
    };
    
    this.cache.set(key, entry);
    
    // Evict if necessary
    if (this.shouldEvict()) {
      this.evictLeastUsed();
    }
    
    this.updateStats();
    this.saveCache();
  }
  
  async delete(key: string): Promise<boolean> {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.updateStats();
      this.saveCache();
    }
    return deleted;
  }
  
  async clear(): Promise<void> {
    this.cache.clear();
    this.updateStats();
    this.saveCache();
  }
  
  getStats(): CacheStats {
    return { ...this.stats };
  }
  
  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }
  
  has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry ? !this.isExpired(entry) : false;
  }
}

// Cache strategy implementations
class CacheStrategyImpl {
  private static managers: Map<string, AdvancedCacheManager> = new Map();
  
  static getManager(type: keyof typeof CACHE_CONFIGS): AdvancedCacheManager {
    if (!this.managers.has(type)) {
      this.managers.set(type, new AdvancedCacheManager(CACHE_CONFIGS[type]));
    }
    return this.managers.get(type)!;
  }
  
  // Cache-first strategy
  static async cacheFirst(key: string, fetcher: () => Promise<any>, type: 'static' | 'seo' = 'static'): Promise<any> {
    const manager = this.getManager(type);
    
    // Try cache first
    const cached = await manager.get(key);
    if (cached) {
      return cached;
    }
    
    // Fetch from network
    try {
      const data = await fetcher();
      await manager.set(key, data);
      return data;
    } catch (error) {
      // Return stale data if available
      const stale = await manager.get(key);
      if (stale) {
        console.warn('Using stale cache due to network error:', error);
        return stale;
      }
      throw error;
    }
  }
  
  // Network-first strategy
  static async networkFirst(key: string, fetcher: () => Promise<any>, type: 'api' | 'user' | 'analytics' = 'api'): Promise<any> {
    const manager = this.getManager(type);
    
    try {
      // Try network first
      const data = await fetcher();
      await manager.set(key, data);
      return data;
    } catch (error) {
      // Fallback to cache
      const cached = await manager.get(key);
      if (cached) {
        console.warn('Using cached data due to network error:', error);
        return cached;
      }
      throw error;
    }
  }
  
  // Stale-while-revalidate strategy
  static async staleWhileRevalidate(key: string, fetcher: () => Promise<any>, type: 'api' = 'api'): Promise<any> {
    const manager = this.getManager(type);
    
    // Return cached data immediately
    const cached = await manager.get(key);
    
    // Revalidate in background
    const revalidate = async () => {
      try {
        const data = await fetcher();
        await manager.set(key, data);
      } catch (error) {
        console.warn('Failed to revalidate cache:', error);
      }
    };
    
    // Revalidate asynchronously
    if (typeof window !== 'undefined') {
      requestIdleCallback(revalidate);
    } else {
      setTimeout(revalidate, 0);
    }
    
    return cached;
  }
  
  // Network-only strategy
  static async networkOnly(fetcher: () => Promise<any>): Promise<any> {
    return fetcher();
  }
}

// React hook for caching
export const useCache = (type: keyof typeof CACHE_CONFIGS) => {
  const manager = CacheStrategyImpl.getManager(type);
  
  return {
    get: manager.get.bind(manager),
    set: manager.set.bind(manager),
    delete: manager.delete.bind(manager),
    clear: manager.clear.bind(manager),
    has: manager.has.bind(manager),
    stats: manager.getStats.bind(manager)
  };
};

// Service Worker integration
export const serviceWorkerCacheStrategy = {
  // Cache static assets
  cacheStatic: (request: Request) => {
    return CacheStrategyImpl.cacheFirst(request.url, () => fetch(request), 'static');
  },
  
  // Cache API responses
  cacheAPI: (request: Request) => {
    return CacheStrategyImpl.staleWhileRevalidate(request.url, () => fetch(request), 'api');
  },
  
  // Cache user data
  cacheUser: (request: Request) => {
    return CacheStrategyImpl.networkFirst(request.url, () => fetch(request), 'user');
  },
  
  // Cache SEO data
  cacheSEO: (request: Request) => {
    return CacheStrategyImpl.cacheFirst(request.url, () => fetch(request), 'seo');
  }
};

// Performance monitoring
export const cachePerformanceMonitor = {
  // Measure cache performance
  measureCachePerformance: () => {
    const stats = {
      static: CacheStrategyImpl.getManager('static').getStats(),
      api: CacheStrategyImpl.getManager('api').getStats(),
      user: CacheStrategyImpl.getManager('user').getStats(),
      seo: CacheStrategyImpl.getManager('seo').getStats(),
      analytics: CacheStrategyImpl.getManager('analytics').getStats()
    };
    
    return stats;
  },
  
  // Optimize cache based on performance
  optimizeCache: () => {
    const stats = cachePerformanceMonitor.measureCachePerformance();
    
    Object.entries(stats).forEach(([type, stat]) => {
      if (stat.hitRate < 0.5) {
        console.warn(`Low hit rate for ${type} cache: ${stat.hitRate}`);
      }
      
      if (stat.size > 80 * 1024 * 1024) { // 80MB
        console.warn(`High memory usage for ${type} cache: ${stat.size} bytes`);
      }
    });
  }
};

// Export utilities
export {
  CACHE_CONFIGS,
  AdvancedCacheManager
};

// Export CacheStrategy as alias for backward compatibility
export const CacheStrategy = CacheStrategyImpl;

export default {
  CacheStrategy: CacheStrategyImpl,
  useCache,
  serviceWorkerCacheStrategy,
  cachePerformanceMonitor,
  CACHE_CONFIGS
};
