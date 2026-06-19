import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className="bg-mesh relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-purple-500/20 blur-[120px]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
