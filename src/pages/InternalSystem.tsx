import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { 
  LayoutDashboard, Users, FolderOpen, FileText, LogOut, Info, Settings, Shield, UserPlus, 
  AlertCircle, CheckCircle, Crown, Briefcase, User
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole, MenuItem } from "@/types/auth";
import UserManagement from "./UserManagement";

const clients = [
  { name: "PT Maju Bersama", project: "Tax Advisory", status: "Active" },
  { name: "CV Sentosa Abadi", project: "Business Consulting", status: "Active" },
  { name: "PT Digital Nusantara", project: "System Development", status: "Pending" },
  { name: "Yayasan Harapan Bangsa", project: "Digital Transformation", status: "Completed" },
];

const LoginView = ({ onLogin, error }: { onLogin: (email: string, password: string) => Promise<void>; error: string | null }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(formData.email, formData.password);
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'superadmin@jadtra.com', role: 'Super Admin', icon: Crown },
    { email: 'admin@jadtra.com', role: 'Admin', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="border-primary/20">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="font-heading text-2xl text-foreground">{t("internal.title")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("internal.staffOnly")}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("contact.form.email")}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="staff@jadtra.com" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("internal.password")}</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  disabled={loading}
                  required
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm text-destructive">{error}</span>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                disabled={loading}
              >
                {loading ? 'Signing in...' : t("internal.login")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">Demo Accounts</CardTitle>
            <p className="text-sm text-muted-foreground">Click to auto-fill login credentials</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => setFormData({ email: account.email, password: 'password' })}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-left"
              >
                <account.icon className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{account.role}</p>
                  <p className="text-xs text-muted-foreground">{account.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">Click to fill</span>
              </button>
            ))}
            <p className="text-xs text-muted-foreground text-center pt-2">
              Password: <code className="bg-muted px-1 py-0.5 rounded">password</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DashboardView = ({ onLogout }: { onLogout: () => void }) => {
  const { t } = useLanguage();
  const { user, hasPermission, hasRole } = useAuth();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const sidebarItems: MenuItem[] = [
    { label: t("internal.dashboard"), icon: LayoutDashboard, key: "Dashboard" },
    { label: t("internal.clients"), icon: Users, key: "Clients", requiredRole: 'admin' },
    { label: t("internal.projects"), icon: FolderOpen, key: "Projects", requiredRole: 'admin' },
    { label: t("internal.documents"), icon: FileText, key: "Documents", requiredRole: 'admin' },
    { label: "User Management", icon: UserPlus, key: "Users", requiredRole: 'super_admin' },
    { label: "Settings", icon: Settings, key: "Settings", requiredRole: 'admin' },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = sidebarItems.filter(item => {
    if (!item.requiredRole) return true;
    return hasMinRole(user?.role || 'admin', item.requiredRole);
  });

  const hasMinRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
    const roleHierarchy = { admin: 1, super_admin: 2 };
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };

  const summaryCards = [
    { title: t("internal.totalClients"), value: "128", icon: Users },
    { title: t("internal.activeProjects"), value: "34", icon: FolderOpen },
    { title: t("internal.documents"), value: "512", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex bg-secondary">
      <aside className="w-60 bg-background text-foreground flex flex-col shrink-0">
        <div className="p-6 border-b border-primary/20">
          <h2 className="font-heading text-lg text-primary">JADTRA</h2>
          <p className="text-xs text-muted-foreground">{t("internal.title")}</p>
        </div>
        <nav className="flex-1 py-4">
          {filteredMenuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveMenu(item.key)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeMenu === item.key
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-6 py-4 text-sm text-muted-foreground hover:text-foreground border-t border-primary/20 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {t("internal.logout")}
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl text-foreground">{t("internal.dashboard")}</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                {user?.role === 'super_admin' && <Crown className="h-4 w-4 text-primary" />}
                {user?.role === 'admin' && <Shield className="h-4 w-4 text-primary" />}
                <span className="text-sm font-medium text-primary capitalize">
                  {user?.role?.replace('_', ' ')}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {user?.name}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {summaryCards.map((card) => (
              <Card key={card.title} className="border-primary/10">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-semibold text-foreground">{card.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dynamic Content Based on Active Menu */}
          {activeMenu === "Dashboard" && (
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-heading text-lg">{t("internal.recentClients")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("internal.clientName")}</TableHead>
                      <TableHead>{t("internal.project")}</TableHead>
                      <TableHead>{t("internal.status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.name}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.project}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              client.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : client.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {client.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeMenu === "Users" && <UserManagement />}

          {activeMenu === "Clients" && (
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Client Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Client management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeMenu === "Projects" && (
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Project Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Project management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeMenu === "Documents" && (
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Document Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Document management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeMenu === "Settings" && (
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="font-heading text-lg">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Settings features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <Info className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">{t("internal.phaseNote")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const InternalSystem = () => {
  const { isAuthenticated, login, logout, loading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoginError(null);
    try {
      await login({ email, password });
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <DashboardView onLogout={logout} />
  ) : (
    <LoginView onLogin={handleLogin} error={loginError} />
  );
};

export default InternalSystem;
