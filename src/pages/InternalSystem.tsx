import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { LayoutDashboard, Users, FolderOpen, FileText, LogOut, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const clients = [
  { name: "PT Maju Bersama", project: "Tax Advisory", status: "Active" },
  { name: "CV Sentosa Abadi", project: "Business Consulting", status: "Active" },
  { name: "PT Digital Nusantara", project: "System Development", status: "Pending" },
  { name: "Yayasan Harapan Bangsa", project: "Digital Transformation", status: "Completed" },
];

const LoginView = ({ onLogin }: { onLogin: () => void }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="font-heading text-2xl text-foreground">{t("internal.title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("internal.staffOnly")}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("contact.form.email")}</Label>
            <Input id="email" type="email" placeholder="staff@jadtra.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("internal.password")}</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button onClick={onLogin} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {t("internal.login")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const DashboardView = ({ onLogout }: { onLogout: () => void }) => {
  const { t } = useLanguage();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const sidebarItems = [
    { label: t("internal.dashboard"), icon: LayoutDashboard, key: "Dashboard" },
    { label: t("internal.clients"), icon: Users, key: "Clients" },
    { label: t("internal.projects"), icon: FolderOpen, key: "Projects" },
    { label: t("internal.documents"), icon: FileText, key: "Documents" },
  ];

  const summaryCards = [
    { title: t("internal.totalClients"), value: "128", icon: Users },
    { title: t("internal.activeProjects"), value: "34", icon: FolderOpen },
    { title: t("internal.documents"), value: "512", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex bg-secondary">
      <aside className="w-60 bg-foreground text-background flex flex-col shrink-0">
        <div className="p-6 border-b border-primary/20">
          <h2 className="font-heading text-lg text-primary">JADTRA</h2>
          <p className="text-xs text-muted-foreground">{t("internal.title")}</p>
        </div>
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveMenu(item.key)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeMenu === item.key
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-background hover:bg-background/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-6 py-4 text-sm text-muted-foreground hover:text-background border-t border-primary/20 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {t("internal.logout")}
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="font-heading text-2xl text-foreground">{t("internal.dashboard")}</h1>
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
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? (
    <DashboardView onLogout={() => setLoggedIn(false)} />
  ) : (
    <LoginView onLogin={() => setLoggedIn(true)} />
  );
};

export default InternalSystem;
