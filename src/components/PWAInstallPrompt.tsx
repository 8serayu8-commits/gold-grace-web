import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, X, Smartphone, Zap } from "lucide-react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    checkInstalled();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
      } else {
        console.log('PWA installation dismissed');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('PWA installation error:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal in localStorage to not show again for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  useEffect(() => {
    // Check if user has dismissed the prompt recently
    const dismissedTime = localStorage.getItem('pwa-install-dismissed');
    if (dismissedTime) {
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      if (parseInt(dismissedTime) > sevenDaysAgo) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  if (!showInstallPrompt || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-2">
      <Card className="border-primary/20 bg-background/95 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              Install JADTRA App
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Install our app for quick access to tax calculators, business insights, and expert consulting services.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              <span>Offline access</span>
              <span className="text-primary">·</span>
              <span>Fast loading</span>
              <span className="text-primary">·</span>
              <span>Push notifications</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="flex-1 text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Install
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDismiss}
                className="text-xs"
              >
                Maybe later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;
