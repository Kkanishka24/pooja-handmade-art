"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm_password: z.string(),
}).refine((d) => d.password === d.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const {
    register: regRegister,
    handleSubmit: regHandleSubmit,
    formState: { errors: regErrors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onLogin = async (data: LoginForm) => {
    setLoading(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(authError.message === "Invalid login credentials"
        ? "Incorrect email or password. Please try again."
        : authError.message);
      setLoading(false);
      return;
    }

    setSuccessMessage("Welcome back!");
    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push(redirectTo), 1200);
  };

  const onRegister = async (data: RegisterForm) => {
    setLoading(true);
    setError("");
    const { error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccessMessage("Account created! Check your email to confirm your account.");
    setSuccess(true);
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });
    // Browser will redirect — no need to reset loading
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-16">
      {/* Decorative elements */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png?v=2"
        alt=""
        className="absolute top-20 left-10 w-16 h-16 rounded-full object-cover opacity-20 animate-float"
      />
      <div className="absolute bottom-20 right-10 text-4xl opacity-20 animate-bounce-soft">✨</div>
      <div className="absolute top-1/3 right-1/4 text-3xl opacity-10 animate-float animation-delay-400">🌸</div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-pink flex items-center justify-center shadow-pink mx-auto mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png?v=2"
              alt="Pooja Handmade Art"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <h1 className="font-display font-bold text-2xl text-brand-brown">
            Pooja Handmade Art
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            {mode === "login" ? "Welcome back! Sign in to continue" : "Create your account"}
          </p>
        </div>

        <div className="bg-white rounded-4xl shadow-card-hover p-8">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-brand-green-light flex items-center justify-center mx-auto mb-4 border border-brand-green/30 shadow-soft">
                <Sparkles className="w-8 h-8 text-brand-green-dark" />
              </div>
              <h2 className="font-display font-bold text-2xl text-brand-brown mb-2">
                {mode === "login" ? "Welcome back!" : "Account created!"}
              </h2>
              <p className="text-brand-muted mb-6">{successMessage}</p>
              {mode === "login" && (
                <Link href={redirectTo} className="btn-primary">
                  Continue Shopping <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex bg-brand-cream rounded-2xl p-1 mb-6">
                <button
                  id="login-tab"
                  onClick={() => { setMode("login"); setError(""); }}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                    mode === "login"
                      ? "bg-white text-brand-brown shadow-soft"
                      : "text-brand-muted hover:text-brand-brown"
                  )}
                >
                  Sign In
                </button>
                <button
                  id="register-tab"
                  onClick={() => { setMode("register"); setError(""); }}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                    mode === "register"
                      ? "bg-white text-brand-brown shadow-soft"
                      : "text-brand-muted hover:text-brand-brown"
                  )}
                >
                  Register
                </button>
              </div>

              {/* Global Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Google OAuth */}
              <button
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border-2 border-brand-beige hover:border-brand-pink hover:bg-brand-pink-light transition-all duration-200 mb-4 disabled:opacity-60"
              >
                {googleLoading ? (
                  <div className="w-4 h-4 border-2 border-brand-brown/30 border-t-brand-brown rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                <span className="text-brand-brown font-medium text-sm">
                  {googleLoading ? "Redirecting..." : "Continue with Google"}
                </span>
              </button>

              <div className="divider-brand my-4">
                <span className="text-brand-muted text-xs px-3">or</span>
              </div>

              {/* Login Form */}
              {mode === "login" && (
                <form onSubmit={loginHandleSubmit(onLogin)} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        {...loginRegister("email")}
                        type="email"
                        placeholder="you@example.com"
                        id="login-email"
                        className="input-brand pl-10"
                      />
                    </div>
                    {loginErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        {...loginRegister("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        id="login-password"
                        className="input-brand pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-brown"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button type="button" className="text-brand-pink text-xs hover:underline">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    id="login-submit"
                    className="btn-primary w-full justify-center py-3.5"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-brand-brown/30 border-t-brand-brown rounded-full animate-spin" />
                    ) : (
                      <>Sign In <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}

              {/* Register Form */}
              {mode === "register" && (
                <form onSubmit={regHandleSubmit(onRegister)} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        {...regRegister("full_name")}
                        placeholder="Priya Sharma"
                        id="register-name"
                        className="input-brand pl-10"
                      />
                    </div>
                    {regErrors.full_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {regErrors.full_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        {...regRegister("email")}
                        type="email"
                        placeholder="you@example.com"
                        id="register-email"
                        className="input-brand pl-10"
                      />
                    </div>
                    {regErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {regErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        {...regRegister("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        id="register-password"
                        className="input-brand pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-brown"
                        aria-label="Toggle password"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {regErrors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {regErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        {...regRegister("confirm_password")}
                        type="password"
                        placeholder="Repeat password"
                        id="register-confirm-password"
                        className="input-brand pl-10"
                      />
                    </div>
                    {regErrors.confirm_password && (
                      <p className="text-red-500 text-xs mt-1">
                        {regErrors.confirm_password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    id="register-submit"
                    className="btn-primary w-full justify-center py-3.5"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-brand-brown/30 border-t-brand-brown rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Create Account
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-brand-muted">
                    By registering, you agree to our{" "}
                    <Link href="/terms" className="text-brand-pink hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-brand-pink hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
