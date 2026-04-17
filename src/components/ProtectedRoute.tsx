import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Shield, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  redirectTo = '/admin/login' 
}: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        setError('');

        // Check current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setAuthenticated(false);
          setLoading(false);
          return;
        }

        if (!session) {
          setAuthenticated(false);
          setLoading(false);
          return;
        }

        // Additional validation - check if user is active
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }

      } catch (err) {
        console.error('Auth check error:', err);
        setError('Authentication check failed');
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setAuthenticated(false);
        } else if (event === 'SIGNED_IN' && session) {
          setAuthenticated(true);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Authentication Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!authenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
