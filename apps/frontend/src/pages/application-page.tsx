import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";

export const ApplicationPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-mesh min-h-screen text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 blur-[150px] -z-10 rounded-full" />

      {/* Navbar */}
      <nav className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">AuthModule</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <UserIcon className="h-4 w-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-200">{user?.name}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="text-zinc-400 hover:text-white hover:bg-white/5"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Welcome to the application.
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              You've successfully authenticated. This is your personal dashboard, built with React 19, Tailwind v4, and premium aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Profile Security", desc: "Your account is protected with JWT and secure storage.", icon: "🔒" },
              { title: "Real-time Sync", desc: "Data is synced across all your devices instantly.", icon: "⚡" },
              { title: "Cloud Integration", desc: "Connect with your favorite tools seamlessly.", icon: "☁️" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all cursor-default"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-12 border border-white/5 flex flex-col items-center text-center space-y-6"
          >
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <UserIcon className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Logged in as {user?.name}</h2>
              <p className="text-zinc-500">{user?.email}</p>
            </div>
            <div className="flex gap-4">
              <Button className="rounded-full px-8 py-6 text-lg font-semibold bg-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                Get Started
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold border-white/10 hover:bg-white/5 hover:text-white">
                Learn More
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};
