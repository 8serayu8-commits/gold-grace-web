import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsletterSignup = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    setStatus('idle');
    
    try {
      // Simulate newsletter signup API call
      // In production, this would call your newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage("Terima kasih! Anda telah berhasil berlangganan newsletter kami.");
      setEmail("");
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage("");
      }, 5000);
      
    } catch (error) {
      setStatus('error');
      setMessage("Maaf, terjadi kesalahan. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="email"
            placeholder="Email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || status === 'success'}
          className="bg-background text-foreground hover:bg-background/90 border border-border px-6"
        >
          {isSubmitting ? (
            <div className="animate-spin h-5 w-5 border-2 border-foreground border-t-transparent rounded-full" />
          ) : status === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
      
      {message && (
        <div className={`mt-3 text-sm flex items-center gap-2 ${
          status === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {status === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default NewsletterSignup;
