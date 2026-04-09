import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutDashboard, Users, FolderOpen, FileText, LogOut, Info } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Clients", icon: Users },
  { label: "Projects", icon: FolderOpen },
  { label: "Documents", icon: FileText },
];

const summaryCards = [
  { title: "Total Clients", value: "128", icon: Users },
  { title: "Active Projects", value: "34", icon: FolderOpen },
  { title: "Documents", value: "512", icon: FileText },
];

const clients = [
  { name: "PT Maju Bersama", project: "Tax Advisory", status: "Active" },
  { name: "CV Sentosa Abadi", project: "Business Consulting", status: "Active" },
  { name: "PT Digital Nusantara", project: "System Development", status: "Pending" },
  { name: "Yayasan Harapan Bangsa", project: "Digital Transformation", status: "Completed" },
];

const LoginView = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
    <Card className="w-full max-w-md border-primary/20">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="font-playfair text-2xl text-foreground">
          JADTRA Internal System
        </CardTitle>
        <p className="text-sm text-muted-foreground">Staff access only</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="staff@jadtra.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button
          onClick={onLogin}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Login
        </Button>
      </CardContent>
    </Card>
  </div>
);

const DashboardView = ({ onLogout }: { onLogout: () => void }) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside className="w-60 bg-foreground text-background flex flex-col shrink-0">
        <div className="p-6 border-b border-primary/20">
          <h2 className="font-playfair text-lg text-primary">JADTRA</h2>
          <p className="text-xs text-muted-foreground">Internal System</p>
        </div>
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeMenu === item.label
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
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="font-playfair text-2xl text-foreground">Dashboard</h1>

          {/* Summary Cards */}
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

          {/* Client Table */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="font-playfair text-lg">Recent Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
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

          {/* Phase Note */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <Info className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">
              Internal system will be developed in the next phase.
            </p>
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
