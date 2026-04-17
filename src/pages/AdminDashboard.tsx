import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calculator, 
  LogOut, 
  Settings,
  TrendingUp,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalCalculations: 0,
    recentContacts: [],
    recentCalculations: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Get current session (ProtectedRoute ensures user is authenticated)
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        loadDashboardData();
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

  const loadDashboardData = async () => {
    try {
      // Load recent contacts
      const { data: contacts, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Load recent calculations
      const { data: calculations, error: calculationsError } = await supabase
        .from('tax_calculator_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!contactsError && contacts) {
        setStats(prev => ({
          ...prev,
          totalContacts: contacts.length,
          recentContacts: contacts
        }));
      }

      if (!calculationsError && calculations) {
        setStats(prev => ({
          ...prev,
          totalCalculations: calculations.length,
          recentCalculations: calculations
        }));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
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
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Contact Forms</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.totalContacts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Tax Calculations</h3>
                <p className="text-2xl font-bold text-green-600">{stats.totalCalculations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Total Users</h3>
                <p className="text-2xl font-bold text-purple-600">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Growth Rate</h3>
                <p className="text-2xl font-bold text-orange-600">+0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Contact Submissions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-foreground">Recent Contact Submissions</h2>
            </div>
            <div className="p-6">
              {stats.recentContacts.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No contact submissions yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentContacts.map((contact) => (
                    <div key={contact.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {contact.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {contact.status === 'new' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            New
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Read
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Tax Calculations */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-foreground">Recent Tax Calculations</h2>
            </div>
            <div className="p-6">
              {stats.recentCalculations.length === 0 ? (
                <div className="text-center py-8">
                  <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No tax calculations yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentCalculations.map((calc) => (
                    <div key={calc.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Calculator className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          Monthly: Rp {calc.monthly_salary?.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Tax: Rp {calc.monthly_tax?.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(calc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/"
                className="flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Website
              </Link>
              <button className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
