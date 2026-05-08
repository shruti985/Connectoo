import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_ROOT =
  window.location.hostname === "localhost"
    ? "https://connectoo-hhu6.onrender.com/api"
    : "https://connectoo-hhu6.onrender.com/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Backend ko request bhejna
      const response = await axios.post(`${API_ROOT}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Token save
      localStorage.setItem("token", token);

      // Username save (optional)
      localStorage.setItem("username", user.username);

      // ⭐ MOST IMPORTANT — user object save
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Saved User:", user);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      navigate("/"); // Dashboard par bhejna
    } catch (error) {
      // 3. Error handle karna (jaise wrong password)
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(187 100% 50% / 0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], x: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(270 60% 50% / 0.2) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.2, 1, 1.2], x: [20, -20, 20] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <motion.span
                className="text-3xl font-display font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
              >
                Connecto
              </motion.span>
            </Link>
            <h1 className="text-2xl font-display font-semibold mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full btn-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

  
          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
