"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { businessConfig } from "@/config/business";
import { Eye, EyeOff, AlertCircle, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "motion/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    // Development bypass
    if (email === "admin@lifecare.com" && password === "admin123") {
      document.cookie = "admin_bypass=true; path=/";
      router.push("/admin");
      return;
    }
    
    // Simulate real delay for UX if bypass fails
    setTimeout(() => {
      setError("Unable to sign you in. Please check your details and try again.");
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column: Brand/Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-surface-blue items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/admin_login_bg.jpg"
            alt="Professional administrative setting"
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-brand-primary-dark/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/90 via-brand-primary-dark/40 to-brand-primary-dark/10" />
        </div>
        
        <div className="relative z-10 w-full max-w-lg mt-auto text-white mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold mb-8 shadow-xl">
              <ShieldCheck className="w-4 h-4 text-brand-muted" />
              Secure Administrative Access
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 text-balance leading-tight">
              Streamline your care operations.
            </h1>
            <p className="text-lg text-brand-surface-blue opacity-90 text-balance leading-relaxed max-w-md">
              Securely manage enquiries, participant referrals, and daily operations for {businessConfig.companyName}.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Authentication Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-32 relative py-12">
        <Link 
          href="/" 
          className="absolute top-8 left-4 sm:left-12 lg:left-24 inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </Link>

        <motion.div 
          className="w-full max-w-sm mx-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="mb-10 text-center lg:text-left mt-8 lg:mt-0">
            <h2 className="text-3xl font-bold font-heading text-text-primary">
              Welcome back
            </h2>
            <p className="mt-2 text-text-secondary">
              Sign in to your admin account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin} noValidate>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-100 text-red-600" 
                role="alert"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-text-primary placeholder-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-focus/20 focus:outline-none transition-all sm:text-sm bg-white"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1.5 relative">
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-text-primary placeholder-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-focus/20 focus:outline-none transition-all sm:text-sm bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:text-brand-primary transition-colors rounded-r-lg"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-focus disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleGoogleLogin}
                type="button"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-focus disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
