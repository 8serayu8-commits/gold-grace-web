import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  LogOut,
  Settings,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  created_at: string;
  updated_at: string;
  read_time: number;
  tags: string[];
}

const AdminArticles = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Get current session (ProtectedRoute ensures user is authenticated)
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        loadArticles();
      }
    };

    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        // ProtectedRoute will handle redirect
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadArticles = async () => {
    try {
      // For now, we'll use mock data since we haven't created the articles table yet
      const mockArticles: Article[] = [
        {
          id: '1',
          title: 'Understanding PPh 21 Tax Regulations',
          slug: 'understanding-pph-21-tax-regulations',
          content: 'Comprehensive guide to PPh 21 tax regulations...',
          excerpt: 'Learn about the latest PPh 21 tax regulations and how they affect your business.',
          author: 'Admin',
          status: 'published',
          published_at: '2024-01-15T10:00:00Z',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z',
          read_time: 5,
          tags: ['Tax', 'PPh 21', 'Regulations']
        },
        {
          id: '2',
          title: 'Digital Transformation for Small Businesses',
          slug: 'digital-transformation-small-businesses',
          content: 'How small businesses can leverage digital transformation...',
          excerpt: 'Discover strategies for successful digital transformation in small businesses.',
          author: 'Admin',
          status: 'draft',
          published_at: '2024-01-20T14:00:00Z',
          created_at: '2024-01-20T14:00:00Z',
          updated_at: '2024-01-20T14:00:00Z',
          read_time: 8,
          tags: ['Digital', 'Transformation', 'Small Business']
        },
        {
          id: '3',
          title: 'Year-End Tax Planning Tips',
          slug: 'year-end-tax-planning-tips',
          content: 'Essential tax planning strategies for year-end...',
          excerpt: 'Maximize your tax savings with these year-end planning tips.',
          author: 'Admin',
          status: 'published',
          published_at: '2024-01-25T09:00:00Z',
          created_at: '2024-01-25T09:00:00Z',
          updated_at: '2024-01-25T09:00:00Z',
          read_time: 6,
          tags: ['Tax Planning', 'Year-End', 'Savings']
        }
      ];

      setArticles(mockArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'draft':
        return <Clock className="w-4 h-4" />;
      case 'archived':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">Articles Management</h1>
              <span className="ml-4 text-sm text-muted-foreground">JADTRA Consulting</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Status: {statusFilter === 'all' ? 'All' : statusFilter}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showFilters && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => { setStatusFilter('all'); setShowFilters(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      All
                    </button>
                    <button
                      onClick={() => { setStatusFilter('published'); setShowFilters(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      Published
                    </button>
                    <button
                      onClick={() => { setStatusFilter('draft'); setShowFilters(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      Draft
                    </button>
                    <button
                      onClick={() => { setStatusFilter('archived'); setShowFilters(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      Archived
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Add New Article */}
            <Link
              to="/admin/articles/new"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Article
            </Link>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Read Time
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredArticles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No articles found</p>
                      <Link
                        to="/admin/articles/new"
                        className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Create your first article
                      </Link>
                    </td>
                  </tr>
                ) : (
                  filteredArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {article.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {article.excerpt}
                          </div>
                          <div className="flex gap-2 mt-1">
                            {article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{article.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                          {getStatusIcon(article.status)}
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.published_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{article.read_time} min</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/admin/dashboard"
                className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Dashboard
              </Link>
              <button className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <Link
                to="/"
                className="flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Website
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminArticles;
